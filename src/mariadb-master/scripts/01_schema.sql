-- ======================================
-- Script de criação do esquema da base de dados
-- para a aplicação de Food Delivery

-- ======================================

-- Garante que o root pode conectar de qualquer IP
CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED BY 'root_password';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

-- Remove base de dados existente e cria nova
DROP DATABASE IF EXISTS food_delivery;
CREATE DATABASE IF NOT EXISTS food_delivery;
USE food_delivery;

-- ======================================
-- TABELAS NOVAS (CBD)
-- ======================================

-- TABELA: codpostal
DROP TABLE IF EXISTS codpostal;
CREATE TABLE codpostal (
    codpostal CHAR(8) PRIMARY KEY,
    localidade VARCHAR(50) NOT NULL,
    cidade VARCHAR(30) NOT NULL
);

-- TABELA: categorias_pratos
DROP TABLE IF EXISTS categorias_pratos;
CREATE TABLE categorias_pratos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA: entregadores 
DROP TABLE IF EXISTS entregadores;
CREATE TABLE entregadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    telefone CHAR(9) NOT NULL,
    codpostal CHAR(8),
    estado ENUM('disponivel', 'ocupado', 'indisponivel') DEFAULT 'disponivel',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (codpostal) REFERENCES codpostal(codpostal)
);

-- ======================================
-- TABELA: clientes
-- ======================================
DROP TABLE IF EXISTS clientes;
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(512) NOT NULL,
    email VARCHAR(512) NOT NULL,
    telefone VARCHAR(512) NOT NULL,
    morada VARCHAR(512) NOT NULL,
    codpostal CHAR(8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (codpostal) REFERENCES codpostal(codpostal)
);

-- ======================================
-- TABELA: restaurantes
-- ======================================
DROP TABLE IF EXISTS restaurantes;
CREATE TABLE restaurantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(512) NOT NULL,
    morada VARCHAR(512) NOT NULL,
    codpostal CHAR(8) NOT NULL,
    email VARCHAR(512) NOT NULL,
    telefone VARCHAR(512)  NOT NULL,
    especialidade_id INT NOT NULL,
    hora_abertura VARCHAR(512),
    hora_fecho VARCHAR(512),
    estado ENUM('aberto', 'fechado') DEFAULT 'fechado' NOT NULL,
    descricao VARCHAR(512),
    taxa_entrega FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (especialidade_id) REFERENCES categorias_pratos(id),
    FOREIGN KEY (codpostal) REFERENCES codpostal(codpostal)
);

-- ======================================
-- TABELA: ingredientes
-- ======================================
DROP TABLE IF EXISTS ingredientes;
CREATE TABLE ingredientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(512) UNIQUE NOT NULL,
    tipo VARCHAR(512) NOT NULL,
    alergeno TINYINT(1) DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ======================================
-- TABELA: pratos
-- ======================================
DROP TABLE IF EXISTS pratos;
CREATE TABLE pratos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    restaurante_id INT NOT NULL,
    categoria_id INT,
    nome VARCHAR(512) NOT NULL,
    preco FLOAT NOT NULL,
    descricao VARCHAR(512),
    disponivel TINYINT(1) DEFAULT TRUE NOT NULL, -- BOOLEAN is an alias (a synonym) for TINYINT(1)
    vegetariano TINYINT(1) DEFAULT FALSE NOT NULL,
    vegan TINYINT(1) DEFAULT FALSE NOT NULL,
    sem_gluten TINYINT(1) DEFAULT  FALSE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id) ON DELETE CASCADE, 
    FOREIGN KEY (categoria_id) REFERENCES categorias_pratos(id)
);

-- ======================================
-- TABELA: pratos_ingredientes
-- ======================================
DROP TABLE IF EXISTS pratos_ingredientes;
CREATE TABLE pratos_ingredientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prato_id INT NOT NULL,
    ingrediente_id INT NOT NULL,
    quantidade VARCHAR(512),
    obrigatorio TINYINT(1) DEFAULT TRUE,
    unidade VARCHAR(20),
    FOREIGN KEY (prato_id) REFERENCES pratos(id) ON DELETE CASCADE,
    FOREIGN KEY (ingrediente_id) REFERENCES ingredientes(id)
);

-- ======================================
-- TABELA: pedidos
-- ======================================
DROP TABLE IF EXISTS pedidos;
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    restaurante_id INT NOT NULL,
    metodo_pagamento ENUM('cartao', 'dinheiro', 'mbway', 'multibanco', 'paypal') DEFAULT 'dinheiro',
    hora_pedido DATETIME,
    total FLOAT DEFAULT 10.00 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id)
);

-- ======================================
-- TABELA: pedidos_pratos 
-- ======================================
DROP TABLE IF EXISTS pedidos_pratos;
CREATE TABLE pedidos_pratos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    prato_id INT NOT NULL,
    quantidade INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (prato_id) REFERENCES pratos(id)
);

-- ======================================
-- TABELA: entregas
-- ======================================
DROP TABLE IF EXISTS entregas;
CREATE TABLE entregas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT UNIQUE NOT NULL,
    entregador_id INT NOT NULL,
    restaurante_id INT NOT NULL,
    tempo_estimado_min INT DEFAULT 30,
    tempo_real_min INT DEFAULT 25,
    estado ENUM('pendente', 'a_caminho', 'entregue', 'cancelado') DEFAULT 'pendente',
    hora_entrega VARCHAR(512),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (entregador_id) REFERENCES entregadores(id),
    FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id)
);

-- ======================================
-- TRIGGERS
-- ======================================

DELIMITER $$

-- Trigger: Calcular total do pedido após inserir item
DROP TRIGGER IF EXISTS calcular_total_pedido$$
CREATE TRIGGER calcular_total_pedido
AFTER INSERT ON pedidos_pratos
FOR EACH ROW
BEGIN
    UPDATE pedidos p
    SET total = (
        SELECT COALESCE(SUM(pp.quantidade * pr.preco), 0)
        FROM pedidos_pratos pp
        JOIN pratos pr ON pp.prato_id = pr.id
        WHERE pp.pedido_id = NEW.pedido_id
    )
    WHERE p.id = NEW.pedido_id;
END$$

-- Trigger: Calcular total do pedido após remover item
DROP TRIGGER IF EXISTS calcular_total_pedido_delete$$
CREATE TRIGGER calcular_total_pedido_delete
AFTER DELETE ON pedidos_pratos
FOR EACH ROW
BEGIN
    UPDATE pedidos p
    SET total = (
        SELECT COALESCE(SUM(pp.quantidade * pr.preco), 0)
        FROM pedidos_pratos pp
        JOIN pratos pr ON pp.prato_id = pr.id
        WHERE pp.pedido_id = OLD.pedido_id
    )
    WHERE p.id = OLD.pedido_id;
END$$

-- Trigger: Calcular total do pedido após atualizar item
DROP TRIGGER IF EXISTS calcular_total_pedido_update$$
CREATE TRIGGER calcular_total_pedido_update
AFTER UPDATE ON pedidos_pratos
FOR EACH ROW
BEGIN
    UPDATE pedidos p
    SET total = (
        SELECT COALESCE(SUM(pp.quantidade * pr.preco), 0)
        FROM pedidos_pratos pp
        JOIN pratos pr ON pp.prato_id = pr.id
        WHERE pp.pedido_id = NEW.pedido_id
    )
    WHERE p.id = NEW.pedido_id;
END$$

-- Trigger: Atualizar estado do entregador quando atribuída entrega
DROP TRIGGER IF EXISTS atualizar_entregador_entrega$$
CREATE TRIGGER atualizar_entregador_entrega
AFTER INSERT ON entregas
FOR EACH ROW
BEGIN
    UPDATE entregadores SET estado = 'ocupado' WHERE id = NEW.entregador_id;
END$$

-- Trigger: Atualizar estado do entregador quando entrega é finalizada
DROP TRIGGER IF EXISTS atualizar_entregador_entrega_finalizada$$
CREATE TRIGGER atualizar_entregador_entrega_finalizada
AFTER UPDATE ON entregas
FOR EACH ROW
BEGIN
    IF (NEW.estado IN ('entregue', 'cancelado')) AND OLD.estado != NEW.estado THEN
        UPDATE entregadores SET estado = 'disponivel' WHERE id = NEW.entregador_id;
    END IF;
END$$

DELIMITER ;

-- ======================================
-- VIEWS
-- ======================================

-- View: Pedidos completos com todas as informações
DROP VIEW IF EXISTS view_pedidos_completos;
CREATE VIEW view_pedidos_completos AS
SELECT
    p.id,
    p.hora_pedido,
    p.total,
    p.metodo_pagamento,
    c.nome AS cliente_nome,
    c.telefone AS cliente_telefone,
    c.morada AS morada_entrega,
    CONCAT(cp_c.codpostal, ' ', cp_c.localidade, ', ', cp_c.cidade) AS localidade_entrega,
    r.nome AS restaurante_nome,
    r.telefone AS restaurante_telefone,
    r.morada AS morada_restaurante,
    CONCAT(cp_r.codpostal, ' ', cp_r.localidade, ', ', cp_r.cidade) AS localidade_restaurante,
    ent.hora_entrega,
    ent.tempo_estimado_min,
    ent.tempo_real_min,
    e.nome AS entregador_nome,
    e.telefone AS entregador_telefone
FROM
    pedidos p
    JOIN clientes c ON p.cliente_id = c.id
    LEFT JOIN codpostal cp_c ON c.codpostal = cp_c.codpostal
    JOIN restaurantes r ON p.restaurante_id = r.id
    LEFT JOIN codpostal cp_r ON r.codpostal = cp_r.codpostal
    LEFT JOIN entregas ent ON p.id = ent.pedido_id
    LEFT JOIN entregadores e ON ent.entregador_id = e.id;

-- View: Pratos com ingredientes alergénicos
DROP VIEW IF EXISTS view_pratos_alergenos;
CREATE VIEW view_pratos_alergenos AS
SELECT
    p.id AS prato_id,
    p.nome AS prato_nome,
    r.nome AS restaurante,
    GROUP_CONCAT(i.nome SEPARATOR ', ') AS alergenos
FROM
    pratos p
    JOIN restaurantes r ON p.restaurante_id = r.id
    JOIN pratos_ingredientes pi ON p.id = pi.prato_id
    JOIN ingredientes i ON pi.ingrediente_id = i.id
WHERE
    i.alergeno = TRUE
GROUP BY
    p.id, p.nome, r.nome;

-- View: Estatísticas de restaurantes
DROP VIEW IF EXISTS view_stats_restaurantes;
CREATE VIEW view_stats_restaurantes AS
SELECT
    r.id,
    r.nome,
    r.estado,
    COUNT(DISTINCT p.id) AS total_pratos,
    COUNT(DISTINCT ped.id) AS total_pedidos,
    COALESCE(SUM(ped.total), 0) AS total_vendas,
    AVG(ped.total) AS ticket_medio
FROM
    restaurantes r
    LEFT JOIN pratos p ON r.id = p.restaurante_id
    LEFT JOIN pedidos ped ON r.id = ped.restaurante_id
GROUP BY
    r.id, r.nome, r.estado;


------------------------
-- Criar usuário para a API (usado pelo MaxScale)
DROP USER IF EXISTS 'api_user'@'%';
CREATE USER 'api_user'@'%' IDENTIFIED BY 'api_password';
GRANT ALL PRIVILEGES ON food_delivery.* TO 'api_user'@'%';

------------------------
-- Criar usuário para replicação
DROP USER IF EXISTS 'repl'@'%';
CREATE USER 'repl'@'%' IDENTIFIED BY 'repl_password';
GRANT REPLICATION SLAVE ON *.* TO 'repl'@'%';
FLUSH PRIVILEGES;
