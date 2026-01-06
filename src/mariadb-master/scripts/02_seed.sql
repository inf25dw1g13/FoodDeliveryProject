-- ======================================
-- SEED DATA MELHORADA - Food Delivery
-- Dados de teste com maior variação e realismo
-- ======================================

USE food_delivery;

SET FOREIGN_KEY_CHECKS = 0;

-- Limpar dados existentes
DELETE FROM entregas;
DELETE FROM pedidos_pratos;
DELETE FROM pedidos;
DELETE FROM pratos_ingredientes;
DELETE FROM pratos;
DELETE FROM ingredientes;
DELETE FROM clientes;
DELETE FROM entregadores;
DELETE FROM restaurantes;
DELETE FROM categorias_pratos;
DELETE FROM codpostal;

-- Resetar AUTO_INCREMENT
ALTER TABLE categorias_pratos AUTO_INCREMENT = 1;
ALTER TABLE restaurantes AUTO_INCREMENT = 1;
ALTER TABLE ingredientes AUTO_INCREMENT = 1;
ALTER TABLE pratos AUTO_INCREMENT = 1;
ALTER TABLE clientes AUTO_INCREMENT = 1;
ALTER TABLE entregadores AUTO_INCREMENT = 1;
ALTER TABLE pedidos AUTO_INCREMENT = 1;
ALTER TABLE entregas AUTO_INCREMENT = 1;

-- ======================================
-- CÓDIGOS POSTAIS (50)
-- ======================================
INSERT INTO codpostal (codpostal, localidade, cidade) VALUES
-- Porto
('4000-001', 'Sé', 'Porto'),
('4000-056', 'Batalha', 'Porto'),
('4000-098', 'Cedofeita', 'Porto'),
('4000-123', 'Santo Ildefonso', 'Porto'),
('4000-245', 'Miragaia', 'Porto'),
('4050-001', 'Bonfim', 'Porto'),
('4050-345', 'Campanhã', 'Porto'),
('4050-567', 'Campanhã Sul', 'Porto'),
('4100-001', 'Paranhos', 'Porto'),
('4100-234', 'Paranhos Norte', 'Porto'),
('4150-001', 'Lordelo do Ouro', 'Porto'),
('4150-456', 'Foz Velha', 'Porto'),
('4200-001', 'Ramalde', 'Porto'),
('4200-345', 'Ramalde Centro', 'Porto'),
('4250-001', 'Foz do Douro', 'Porto'),
('4250-234', 'Foz Nova', 'Porto'),
-- Vila Nova de Gaia
('4400-001', 'Santa Marinha', 'Vila Nova de Gaia'),
('4400-087', 'Cais de Gaia', 'Vila Nova de Gaia'),
('4400-234', 'Centro Gaia', 'Vila Nova de Gaia'),
('4430-001', 'Canidelo', 'Vila Nova de Gaia'),
('4430-234', 'Praia Canidelo', 'Vila Nova de Gaia'),
('4410-001', 'Mafamude', 'Vila Nova de Gaia'),
('4420-001', 'Oliveira do Douro', 'Vila Nova de Gaia'),
-- Matosinhos
('4450-001', 'Matosinhos Sul', 'Matosinhos'),
('4450-208', 'Leça da Palmeira', 'Matosinhos'),
('4450-345', 'Praia Matosinhos', 'Matosinhos'),
('4460-001', 'Senhora da Hora', 'Matosinhos'),
('4465-001', 'São Mamede de Infesta', 'Matosinhos'),
-- Maia
('4470-001', 'Maia', 'Maia'),
('4470-234', 'Maia Centro', 'Maia'),
('4475-001', 'Moreira', 'Maia'),
('4475-234', 'Águas Santas', 'Maia'),
-- Gondomar
('4435-001', 'Gondomar', 'Gondomar'),
('4435-234', 'Valbom', 'Gondomar'),
('4510-001', 'Fânzeres', 'Gondomar'),
('4515-001', 'Rio Tinto', 'Gondomar'),
-- Valongo
('4440-001', 'Valongo', 'Valongo'),
('4445-001', 'Ermesinde', 'Valongo'),
('4445-234', 'Alfena', 'Valongo'),
-- Outras cidades
('4780-001', 'Santo Tirso', 'Santo Tirso'),
('4785-001', 'Trofa', 'Trofa'),
('4480-001', 'Vila do Conde', 'Vila do Conde'),
('4485-001', 'Árvore', 'Vila do Conde'),
('4490-001', 'Póvoa de Varzim', 'Póvoa de Varzim'),
('4500-001', 'Espinho', 'Espinho'),
('4700-001', 'Braga Centro', 'Braga'),
('4710-001', 'Braga Norte', 'Braga'),
('4800-001', 'Guimarães', 'Guimarães'),
('4810-001', 'Guimarães Sul', 'Guimarães'),
('4520-001', 'Santa Maria da Feira', 'Santa Maria da Feira'),
('4560-001', 'Penafiel', 'Penafiel');



-- ======================================
-- CATEGORIAS DE PRATOS (20 categorias)
-- ======================================
-- Categorias criadas há 6 meses (base inicial do sistema)
INSERT INTO categorias_pratos (nome, created_at) VALUES
('Pizza', DATE_SUB(NOW(), INTERVAL 180 DAY)),
('Hambúrguer', DATE_SUB(NOW(), INTERVAL 180 DAY)),
('Sushi', DATE_SUB(NOW(), INTERVAL 179 DAY)),
('Italiana', DATE_SUB(NOW(), INTERVAL 179 DAY)),
('Portuguesa', DATE_SUB(NOW(), INTERVAL 178 DAY)),
('Chinesa', DATE_SUB(NOW(), INTERVAL 178 DAY)),
('Indiana', DATE_SUB(NOW(), INTERVAL 177 DAY)),
('Mexicana', DATE_SUB(NOW(), INTERVAL 177 DAY)),
('Vegetariana', DATE_SUB(NOW(), INTERVAL 176 DAY)),
('Saudável', DATE_SUB(NOW(), INTERVAL 176 DAY)),
('Sobremesas', DATE_SUB(NOW(), INTERVAL 175 DAY)),
('Fast Food', DATE_SUB(NOW(), INTERVAL 175 DAY)),
('Grelhados', DATE_SUB(NOW(), INTERVAL 174 DAY)),
('Petiscos', DATE_SUB(NOW(), INTERVAL 174 DAY)),
('Mariscos', DATE_SUB(NOW(), INTERVAL 173 DAY)),
('Massas', DATE_SUB(NOW(), INTERVAL 173 DAY)),
('Sopas', DATE_SUB(NOW(), INTERVAL 172 DAY)),
('Saladas', DATE_SUB(NOW(), INTERVAL 172 DAY)),
('Wraps', DATE_SUB(NOW(), INTERVAL 171 DAY)),
('Asiática', DATE_SUB(NOW(), INTERVAL 171 DAY));

-- ======================================
-- RESTAURANTES (35 restaurantes) 
-- ======================================
-- Restaurantes criados progressivamente ao longo de 5 meses
INSERT INTO restaurantes (nome, morada, codpostal, email, telefone, especialidade_id, hora_abertura, hora_fecho, estado, descricao, taxa_entrega, created_at, updated_at) VALUES
-- Porto Centro - Mix de estados (apenas 'aberto' ou 'fechado')
('Pizzaria Bella Napoli', 'Rua das Flores, 123', '4000-001', 'bella@napoli.pt', '223456789', 1, '12:00:00', '23:00:00', 'aberto', 'Pizzas napolitanas autênticas em forno a lenha', 2.99, DATE_SUB(NOW(), INTERVAL 150 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY)),
('Burger House Porto', 'Rua de Santa Catarina, 456', '4000-056', 'contact@burgerhouse.pt', '223456790', 2, '11:30:00', '23:30:00', 'aberto', 'Os melhores hambúrgueres artesanais do Porto', 2.99, DATE_SUB(NOW(), INTERVAL 148 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY)),
('Sushi Zen', 'Rua de Cedofeita, 789', '4000-098', 'info@sushizen.pt', '223456791', 3, '12:00:00', '22:30:00', 'fechado', 'Sushi fresco e criativo', 2.99, DATE_SUB(NOW(), INTERVAL 146 DAY), DATE_SUB(NOW(), INTERVAL 5 DAY)),
('Trattoria da Nonna', 'Rua do Bonjardim, 321', '4000-123', 'nonna@trattoria.pt', '223456792', 4, '12:00:00', '23:00:00', 'aberto', 'Cozinha italiana tradicional', 2.99, DATE_SUB(NOW(), INTERVAL 144 DAY), DATE_SUB(NOW(), INTERVAL 3 DAY)),
('Tasca do Porto', 'Rua do Heroísmo, 234', '4050-001', 'tasca@porto.pt', '223456793', 5, '11:00:00', '22:00:00', 'fechado', 'Pratos tradicionais portugueses', 2.99, DATE_SUB(NOW(), INTERVAL 142 DAY), DATE_SUB(NOW(), INTERVAL 10 DAY)),
('Wok Express', 'Rua da Boavista, 567', '4050-345', 'wok@express.pt', '223456794' , 6,  '12:00:00', '22:30:00', 'aberto', 'Cozinha chinesa rápida e saborosa', 2.99, DATE_SUB(NOW(), INTERVAL 140 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY)),
('Namaste Palace', 'Av. da República, 890', '4100-001', 'namaste@palace.pt', '223456795', 7, '12:00:00', '22:30:00', 'fechado', 'Autêntica comida indiana', 3.50, DATE_SUB(NOW(), INTERVAL 138 DAY), DATE_SUB(NOW(), INTERVAL 7 DAY)),
('El Sombrero', 'Rua de Lordelo, 432', '4150-001', 'hola@elsombrero.pt', '223456796', 8, '12:00:00', '23:00:00', 'aberto', 'Sabores mexicanos autênticos', 2.5, DATE_SUB(NOW(), INTERVAL 136 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY)),
('Green Garden', 'Rua de Ramalde, 654', '4200-001', 'hello@greengarden.pt', '223456797', 9, '11:00:00', '21:00:00', 'aberto' ,  'Comida vegetariana e vegana', 2.50, DATE_SUB(NOW(), INTERVAL 134 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY)),
('Fit & Fresh', 'Av. da Foz, 321', '4250-001', 'fit@fresh.pt', '223456798', 10, '10:00:00', '20:00:00', 'fechado', 'Comida saudável e equilibrada', 2.50, DATE_SUB(NOW(), INTERVAL 132 DAY), DATE_SUB(NOW(), INTERVAL 8 DAY)),

-- Vila Nova de Gaia
('Casa do Peixe', 'Cais de Gaia, 12', '4400-087', 'peixe@gaia.pt', '223456799', 15, '12:00:00', '22:00:00', 'aberto', 'Especialidade em mariscos frescos', 3.50, DATE_SUB(NOW(), INTERVAL 130 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY)),
('Pizza & Pasta', 'Rua Direita, 456', '4400-001', 'pizza@gaia.pt', '223456800', 1, '12:00:00', '23:00:00', 'fechado', 'Pizzas e massas italianas', 2.5, DATE_SUB(NOW(), INTERVAL 128 DAY), DATE_SUB(NOW(), INTERVAL 6 DAY)),
('Grill Master', 'Av. da República, 789', '4430-001', 'grill@master.pt', '223456801', 13, '12:00:00', '23:00:00', 'aberto', 'Carnes grelhadas na brasa', 2.99, DATE_SUB(NOW(), INTERVAL 126 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY)),
('Tascaria Típica', 'Rua do Ouro, 234', '4410-001', 'tascaria@tipica.pt', '223456802', 5, '11:00:00', '22:00:00', 'aberto', 'Petiscos e pratos portugueses', 1.99, DATE_SUB(NOW(), INTERVAL 124 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY)),
-- Matosinhos
('Mar à Vista', 'Rua Heróis de França, 567', '4450-001', 'mar@vista.pt', '223456803', 15, '12:00:00', '23:00:00', 'aberto', 'Restaurante de peixe fresco à beira-mar', 3.99, DATE_SUB(NOW(), INTERVAL 122 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY)),
('Burger Station', 'Av. General Norton, 890', '4450-208', 'station@burger.pt', '223456804', 2, '11:00:00', '00:00:00', 'fechado', 'Hambúrgueres gourmet', 2.50, DATE_SUB(NOW(), INTERVAL 120 DAY), DATE_SUB(NOW(), INTERVAL 9 DAY)),
('Sushi Factory', 'Rua Brito Capelo, 321', '4460-001', 'factory@sushi.pt', '223456805', 3, '12:00:00', '22:30:00', 'aberto', 'Sushi contemporâneo', 2.99, DATE_SUB(NOW(), INTERVAL 118 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY)),
('Sabor Oriental', 'Rua 5 de Outubro, 654', '4465-001', 'sabor@oriental.pt', '223456806', 6, '11:30:00', '23:00:00', 'aberto', 'Buffet chinês', 1.99, DATE_SUB(NOW(), INTERVAL 116 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY)),

-- Maia
('La Bella Vita', 'Av. Dom Manuel II, 432', '4470-001', 'bella@vita.pt', '223456807', 4, '12:00:00', '22:30:00', 'fechado', 'Restaurante italiano elegante', 3.50, DATE_SUB(NOW(), INTERVAL 114 DAY), DATE_SUB(NOW(), INTERVAL 12 DAY)),
('Fast Bites', 'Centro Comercial Maia, 123', '4475-001', 'fast@bites.pt', '223456808', 12, '10:00:00', '23:00:00', 'aberto', 'Fast food de qualidade', 1.5, DATE_SUB(NOW(), INTERVAL 112 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY)),

-- Gondomar
('Churrasqueira do Zé', 'Rua Principal, 567', '4435-001', 'ze@churrasco.pt', '223456809', 13, '11:00:00', '22:00:00', 'aberto', 'Frango e carnes grelhadas', 1.99, DATE_SUB(NOW(), INTERVAL 110 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY)),
('Casa Portuguesa', 'Av. Vasco da Gama, 890', '4510-001', 'casa@portuguesa.pt', '223456810', 5, '12:00:00', '22:00:00', 'fechado', 'Pratos tradicionais portugueses', 2.5, DATE_SUB(NOW(), INTERVAL 108 DAY), DATE_SUB(NOW(), INTERVAL 11 DAY)),

-- Valongo
('Pizza King', 'Rua do Comércio, 234', '4440-001', 'king@pizza.pt', '223456811', 1, '18:00:00', '23:00:00', 'aberto', 'Pizzas ao domicílio', 1.99, DATE_SUB(NOW(), INTERVAL 106 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY)),
('Healthy Bowl', 'Av. 5 de Outubro, 567', '4445-001', 'healthy@bowl.pt', '223456812', 10, '11:00:00', '21:00:00', 'aberto', 'Bowls saudáveis e personalizados', 2.50, DATE_SUB(NOW(), INTERVAL 104 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY)),
-- Santo Tirso
('Restaurante Minhoto', 'Praça do Município, 12', '4780-001', 'minhoto@resto.pt', '223456813', 5, '12:00:00', '22:00:00', 'aberto', 'Cozinha tradicional minhota', 2.99, DATE_SUB(NOW(), INTERVAL 102 DAY), DATE_SUB(NOW(), INTERVAL 3 DAY)),
-- Vila do Conde
('Marisqueira Atlantico', 'Av. Marquês Sá da Bandeira, 345', '4480-001', 'atlantico@marisco.pt', '223456814', 15, '12:00:00', '23:00:00', 'fechado', 'Marisco fresco do dia', 3.99, DATE_SUB(NOW(), INTERVAL 100 DAY), DATE_SUB(NOW(), INTERVAL 13 DAY)),
('Pizzeria Romana', 'Rua 25 de Abril, 678', '4485-001', 'romana@pizza.pt', '223456815', 1, '12:00:00', '23:00:00', 'aberto', 'Pizzas romanas finas e crocantes', 2.5, DATE_SUB(NOW(), INTERVAL 98 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY)),
-- Póvoa de Varzim
('Cantina Mexicana', 'Passeio Alegre, 234', '4490-001', 'cantina@mexicana.pt', '223456816', 8, '12:00:00', '23:00:00', 'fechado', 'Tacos, burritos e nachos', 2.99, DATE_SUB(NOW(), INTERVAL 96 DAY), DATE_SUB(NOW(), INTERVAL 14 DAY)),

-- Braga
('Tasquinha Bracarense', 'Rua do Souto, 456', '4700-001', 'tasquinha@braga.pt', '223456817', 5, '11:00:00', '22:00:00', 'aberto', 'Petiscos e vinhos portugueses', 2.5, DATE_SUB(NOW(), INTERVAL 94 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY)),
('Sushi Art', 'Av. da Liberdade, 789', '4710-001', 'art@sushi.pt', '223456818', 3, '12:00:00', '22:30:00', 'fechado', 'Sushi artístico', 3.50, DATE_SUB(NOW(), INTERVAL 92 DAY), DATE_SUB(NOW(), INTERVAL 15 DAY)),
-- Guimarães
('Grill & Chill', 'Largo do Toural, 123', '4800-001', 'grill@chill.pt', '223456819', 13, '12:00:00', '23:00:00', 'aberto', 'Grelhados e ambiente descontraído', 2.99, DATE_SUB(NOW(), INTERVAL 90 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY)),
('Dolce Vita', 'Rua de Santa Maria, 456', '4810-001', 'dolce@vita.pt', '223456820', 11, '10:00:00', '20:00:00', 'aberto', 'Pastelaria e sobremesas artesanais', 1.99, DATE_SUB(NOW(), INTERVAL 88 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY)),

-- Outros
('Burger & Co', 'Av. Fernando Magalhães, 789', '4520-001', 'burger@co.pt', '223456821', 2, '11:00:00', '23:30:00', 'aberto', 'Hambúrgueres artesanais premium', 2.5, DATE_SUB(NOW(), INTERVAL 86 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY)),
('Sabores da Índia', 'Rua do Mercado, 234', '4560-001', 'sabores@india.pt', '223456822', 7, '12:00:00', '22:00:00', 'aberto', 'Curry e tandoori autênticos', 2.99, DATE_SUB(NOW(), INTERVAL 84 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY)),
('Veggie Paradise', 'Rua Central, 567', '4580-001', 'veggie@paradise.pt', '223456823', 9, '11:00:00', '21:00:00', 'fechado', 'Opções veganas e vegetarianas', 2.50, DATE_SUB(NOW(), INTERVAL 82 DAY), DATE_SUB(NOW(), INTERVAL 16 DAY));

-- ======================================
-- INGREDIENTES (80 ingredientes)
-- ======================================
-- Ingredientes criados há 6 meses (base inicial do sistema)
INSERT INTO ingredientes (nome, tipo, alergeno, created_at) VALUES
-- Vegetais (20) - criados nos primeiros dias (há 180 dias)
('Tomate', 'vegetal', FALSE, DATE_SUB(NOW(), INTERVAL 180 DAY)),
('Alface', 'vegetal', FALSE, DATE_SUB(NOW(), INTERVAL 180 DAY)),
('Cebola', 'vegetal', FALSE, DATE_SUB(NOW(), INTERVAL 179 DAY)),
('Pimento', 'vegetal', FALSE, DATE_SUB(NOW(), INTERVAL 179 DAY)),
('Cogumelos', 'vegetal', FALSE, DATE_SUB(NOW(), INTERVAL 178 DAY)),
('Azeitona', 'vegetal', FALSE, DATE_SUB(NOW(), INTERVAL 178 DAY)),
('Rúcula', 'vegetal', FALSE, DATE_SUB(NOW(), INTERVAL 177 DAY)),
('Espinafres', 'vegetal', FALSE, DATE_SUB(NOW(), INTERVAL 177 DAY)),
('Brócolos', 'vegetal', FALSE, DATE_SUB(NOW(), INTERVAL 176 DAY)),
('Cenoura', 'vegetal', FALSE, DATE_SUB(NOW(), INTERVAL 176 DAY)),
('Pepino', 'vegetal', FALSE, DATE_SUB(NOW(), INTERVAL 175 DAY)),
('Beringela', 'vegetal', FALSE, DATE_SUB(NOW(), INTERVAL 175 DAY)),
('Courgette', 'vegetal', FALSE, DATE_SUB(NOW(), INTERVAL 174 DAY)),
('Alho', 'vegetal', FALSE, DATE_SUB(NOW(), INTERVAL 174 DAY)),
('Gengibre', 'vegetal', FALSE, DATE_SUB(NOW(), INTERVAL 173 DAY)),
('Manjericão', 'vegetal', FALSE, DATE_SUB(NOW(), INTERVAL 173 DAY)),
('Coentros', 'vegetal', FALSE, DATE_SUB(NOW(), INTERVAL 172 DAY)),
('Salsa', 'vegetal', FALSE, DATE_SUB(NOW(), INTERVAL 172 DAY)),
('Milho', 'vegetal', FALSE, DATE_SUB(NOW(), INTERVAL 171 DAY)),
('Abacate', 'vegetal', FALSE, DATE_SUB(NOW(), INTERVAL 171 DAY)),
-- Carnes (15)
('Frango', 'carne', FALSE, DATE_SUB(NOW(), INTERVAL 170 DAY)),
('Vaca', 'carne', FALSE, DATE_SUB(NOW(), INTERVAL 170 DAY)),
('Porco', 'carne', FALSE, DATE_SUB(NOW(), INTERVAL 169 DAY)),
('Bacon', 'carne', TRUE, DATE_SUB(NOW(), INTERVAL 169 DAY)),
('Chouriço', 'carne', FALSE, DATE_SUB(NOW(), INTERVAL 168 DAY)),
('Fiambre', 'carne', FALSE, DATE_SUB(NOW(), INTERVAL 168 DAY)),
('Presunto', 'carne', FALSE, DATE_SUB(NOW(), INTERVAL 167 DAY)),
('Salsicha', 'carne', FALSE, DATE_SUB(NOW(), INTERVAL 167 DAY)),
('Alheira', 'carne', FALSE, DATE_SUB(NOW(), INTERVAL 166 DAY)),
('Perú', 'carne', FALSE, DATE_SUB(NOW(), INTERVAL 166 DAY)),
('Pato', 'carne', FALSE, DATE_SUB(NOW(), INTERVAL 165 DAY)),
('Borrego', 'carne', FALSE, DATE_SUB(NOW(), INTERVAL 165 DAY)),
('Vitela', 'carne', FALSE, DATE_SUB(NOW(), INTERVAL 164 DAY)),
('Costelas', 'carne', FALSE, DATE_SUB(NOW(), INTERVAL 164 DAY)),
('Picanha', 'carne', FALSE, DATE_SUB(NOW(), INTERVAL 163 DAY)),
-- Peixes e Mariscos (15)
('Salmão', 'peixe', FALSE, DATE_SUB(NOW(), INTERVAL 162 DAY)),
('Atum', 'peixe', FALSE, DATE_SUB(NOW(), INTERVAL 162 DAY)),
('Bacalhau', 'peixe', FALSE, DATE_SUB(NOW(), INTERVAL 161 DAY)),
('Camarão', 'marisco', TRUE, DATE_SUB(NOW(), INTERVAL 161 DAY)),
('Polvo', 'marisco', FALSE, DATE_SUB(NOW(), INTERVAL 160 DAY)),
('Lulas', 'marisco', FALSE, DATE_SUB(NOW(), INTERVAL 160 DAY)),
('Mexilhão', 'marisco', TRUE, DATE_SUB(NOW(), INTERVAL 159 DAY)),
('Amêijoas', 'marisco', TRUE, DATE_SUB(NOW(), INTERVAL 159 DAY)),
('Lavagante', 'marisco', TRUE, DATE_SUB(NOW(), INTERVAL 158 DAY)),
('Caranguejo', 'marisco', TRUE, DATE_SUB(NOW(), INTERVAL 158 DAY)),
('Robalo', 'peixe', FALSE, DATE_SUB(NOW(), INTERVAL 157 DAY)),
('Dourada', 'peixe', FALSE, DATE_SUB(NOW(), INTERVAL 157 DAY)),
('Sardinhas', 'peixe', FALSE, DATE_SUB(NOW(), INTERVAL 156 DAY)),
('Peixe-Espada', 'peixe', FALSE, DATE_SUB(NOW(), INTERVAL 156 DAY)),
('Linguado', 'peixe', FALSE, DATE_SUB(NOW(), INTERVAL 155 DAY)),
-- Lacticínios (10)
('Queijo Mozzarella', 'laticinios', TRUE, DATE_SUB(NOW(), INTERVAL 154 DAY)),
('Queijo Cheddar', 'laticinios', TRUE, DATE_SUB(NOW(), INTERVAL 154 DAY)),
('Queijo Parmesão', 'laticinios', TRUE, DATE_SUB(NOW(), INTERVAL 153 DAY)),
('Queijo Fresco', 'laticinios', TRUE, DATE_SUB(NOW(), INTERVAL 153 DAY)),
('Queijo Serra', 'laticinios', TRUE, DATE_SUB(NOW(), INTERVAL 152 DAY)),
('Natas', 'laticinios', TRUE, DATE_SUB(NOW(), INTERVAL 152 DAY)),
('Manteiga', 'laticinios', TRUE, DATE_SUB(NOW(), INTERVAL 151 DAY)),
('Iogurte', 'laticinios', TRUE, DATE_SUB(NOW(), INTERVAL 151 DAY)),
('Leite', 'laticinios', TRUE, DATE_SUB(NOW(), INTERVAL 150 DAY)),
('Requeijão', 'laticinios', TRUE, DATE_SUB(NOW(), INTERVAL 150 DAY)),
-- Massas e Cereais (10)
('Arroz', 'cereal', FALSE, DATE_SUB(NOW(), INTERVAL 149 DAY)),
('Massa Spaghetti', 'cereal', TRUE, DATE_SUB(NOW(), INTERVAL 149 DAY)),
('Massa Penne', 'cereal', TRUE, DATE_SUB(NOW(), INTERVAL 148 DAY)),
('Massa Lasanha', 'cereal', TRUE, DATE_SUB(NOW(), INTERVAL 148 DAY)),
('Massa Ravióli', 'cereal', TRUE, DATE_SUB(NOW(), INTERVAL 147 DAY)),
('Pão', 'cereal', TRUE, DATE_SUB(NOW(), INTERVAL 147 DAY)),
('Tortilhas', 'cereal', TRUE, DATE_SUB(NOW(), INTERVAL 146 DAY)),
('Quinoa', 'cereal', FALSE, DATE_SUB(NOW(), INTERVAL 146 DAY)),
('Cuscuz', 'cereal', FALSE, DATE_SUB(NOW(), INTERVAL 145 DAY)),
('Arroz Integral', 'cereal', FALSE, DATE_SUB(NOW(), INTERVAL 145 DAY)),
-- Outros (10)
('Azeite', 'condimento', FALSE, DATE_SUB(NOW(), INTERVAL 144 DAY)),
('Molho Tomate', 'condimento', FALSE, DATE_SUB(NOW(), INTERVAL 144 DAY)),
('Mostarda', 'condimento', FALSE, DATE_SUB(NOW(), INTERVAL 143 DAY)),
('Ketchup', 'condimento', FALSE, DATE_SUB(NOW(), INTERVAL 143 DAY)),
('Maionese', 'condimento', TRUE, DATE_SUB(NOW(), INTERVAL 142 DAY)),
('Piri-Piri', 'condimento', FALSE, DATE_SUB(NOW(), INTERVAL 142 DAY)),
('Soja', 'condimento', TRUE, DATE_SUB(NOW(), INTERVAL 141 DAY)),
('Wasabi', 'condimento', FALSE, DATE_SUB(NOW(), INTERVAL 141 DAY)),
('Ovo', 'proteina', TRUE, DATE_SUB(NOW(), INTERVAL 140 DAY)),
('Tofu', 'proteina', FALSE, DATE_SUB(NOW(), INTERVAL 140 DAY));



-- ======================================
-- PRATOS (mantendo os existentes)
-- ======================================
INSERT INTO pratos (restaurante_id, categoria_id, nome, preco, descricao, disponivel, vegetariano, vegan, sem_gluten) VALUES
-- Bella Napoli (id=1)
(1, 1, 'Pizza Margherita', 8.50, 'Molho de tomate, mozzarella e manjericão', TRUE, TRUE, FALSE, FALSE),
(1, 1, 'Pizza Pepperoni', 9.50, 'Molho de tomate, mozzarella e pepperoni', TRUE, FALSE, FALSE, FALSE),
(1, 1, 'Pizza Quattro Formaggi', 11.00, 'Quatro queijos italianos', TRUE, TRUE, FALSE, FALSE),
(1, 1, 'Pizza Prosciutto', 10.50, 'Mozzarella, fiambre e cogumelos', TRUE, FALSE, FALSE, FALSE),
(1, 1, 'Pizza Vegetariana', 9.00, 'Legumes grelhados e queijo', TRUE, TRUE, FALSE, FALSE),
(1, 1, 'Pizza Diavola', 10.00, 'Picante com chouriço e piri-piri', FALSE, FALSE, FALSE, FALSE),
(1, 1, 'Pizza Carbonara', 11.50, 'Natas, bacon e ovo', TRUE, FALSE, FALSE, FALSE),
(1, 1, 'Pizza Atum', 9.50, 'Atum, cebola e azeitonas', TRUE, FALSE, FALSE, FALSE),

-- Burger House Porto (id=2)
(2, 2, 'Classic Burger', 7.50, 'Hambúrguer de vaca, alface, tomate e queijo', TRUE, FALSE, FALSE, FALSE),
(2, 2, 'Bacon Burger', 8.50, 'Com bacon crocante e molho BBQ', TRUE, FALSE, FALSE, FALSE),
(2, 2, 'Chicken Burger', 7.00, 'Frango grelhado com maionese', FALSE, FALSE, FALSE, FALSE),
(2, 2, 'Veggie Burger', 7.50, 'Hambúrguer vegetariano com legumes', TRUE, TRUE, TRUE, FALSE),
(2, 2, 'Double Cheese', 9.50, 'Duplo queijo cheddar', TRUE, FALSE, FALSE, FALSE),
(2, 2, 'Spicy Burger', 8.00, 'Com jalapeños e molho picante', TRUE, FALSE, FALSE, FALSE),
-- Sushi Zen (id=3)
(3, 3, 'Sushi Salmão (8un)', 9.50, 'Nigiri de salmão fresco', TRUE, FALSE, FALSE, TRUE),
(3, 3, 'Sushi Atum (8un)', 10.50, 'Nigiri de atum vermelho', FALSE, FALSE, FALSE, TRUE),
(3, 3, 'California Roll (8un)', 8.00, 'Surimi, pepino e abacate', TRUE, FALSE, FALSE, TRUE),
(3, 3, 'Temaki Salmão', 5.50, 'Cone de salmão e alga', TRUE, FALSE, FALSE, TRUE),
(3, 3, 'Sashimi Mix (12un)', 15.00, 'Seleção de peixe fresco', TRUE, FALSE, FALSE, TRUE),
(3, 3, 'Hot Roll Camarão', 9.00, 'Empanado com camarão', TRUE, FALSE, FALSE, FALSE),
(3, 3, 'Veggie Roll', 6.50, 'Vegetais frescos', TRUE, TRUE, TRUE, TRUE),
(3, 3, 'Dragon Roll', 12.00, 'Enguia, pepino e abacate', FALSE, FALSE, FALSE, TRUE),
(3, 3, 'Rainbow Roll', 13.50, 'Mix de peixes sobre california', TRUE, FALSE, FALSE, TRUE),
(3, 3, 'Uramaki Filadélfia', 8.50, 'Salmão e cream cheese', TRUE, FALSE, FALSE, TRUE),
-- Trattoria da Nonna (id=4)
(4, 4, 'Spaghetti Carbonara', 10.50, 'Massa com bacon, ovo e parmesão', TRUE, FALSE, FALSE, FALSE),
(4, 4, 'Lasanha Bolonhesa', 11.00, 'Camadas de massa com carne', TRUE, FALSE, FALSE, FALSE),
(4, 4, 'Penne Arrabbiata', 9.00, 'Massa picante com tomate', TRUE, TRUE, TRUE, FALSE),
(4, 4, 'Risotto Funghi', 12.00, 'Arroz cremoso com cogumelos', TRUE, TRUE, FALSE, TRUE),
(4, 4, 'Gnocchi Sorrentina', 10.00, 'Com molho de tomate e mozzarella', FALSE, TRUE, FALSE, FALSE),
(4, 4, 'Saltimbocca Romana', 13.50, 'Vitela com presunto e sálvia', TRUE, FALSE, FALSE, TRUE),
(4, 4, 'Tiramisu', 4.50, 'Sobremesa italiana clássica', TRUE, TRUE, FALSE, FALSE),

-- Tasca do Porto (id=5)
(5, 5, 'Francesinha', 10.00, 'O clássico do Porto', TRUE, FALSE, FALSE, FALSE),
(5, 5, 'Bacalhau à Brás', 12.50, 'Bacalhau desfiado com batata palha', TRUE, FALSE, FALSE, TRUE),
(5, 5, 'Caldo Verde', 4.00, 'Sopa tradicional portuguesa', TRUE, FALSE, FALSE, TRUE),
(5, 5, 'Polvo à Lagareiro', 16.00, 'Polvo assado com batatas', FALSE, FALSE, FALSE, TRUE),
(5, 5, 'Alheira com Grelos', 9.50, 'Alheira grelhada', TRUE, FALSE, FALSE, TRUE),
(5, 5, 'Tripas à Moda do Porto', 11.00, 'Prato típico tripeiro', TRUE, FALSE, FALSE, TRUE),
(5, 5, 'Arroz de Pato', 13.00, 'Arroz com pato e chouriço', TRUE, FALSE, FALSE, TRUE),
(5, 5, 'Bife à Café', 14.00, 'Bife com molho de café', TRUE, FALSE, FALSE, TRUE),

-- Wok Express (id=6)
(6, 6, 'Chow Mein Frango', 8.50, 'Noodles salteados com frango', TRUE, FALSE, FALSE, FALSE),
(6, 6, 'Arroz Frito Especial', 7.50, 'Arroz com legumes e carne', TRUE, FALSE, FALSE, TRUE),
(6, 6, 'Frango Agridoce', 9.00, 'Frango com molho agridoce', TRUE, FALSE, FALSE, TRUE),
(6, 6, 'Vaca com Brócolos', 10.00, 'Vaca salteada com legumes', FALSE, FALSE, FALSE, TRUE),
(6, 6, 'Legumes Salteados', 6.50, 'Mix de vegetais', TRUE, TRUE, TRUE, TRUE),

-- Namaste Palace (id=7)
(7, 7, 'Chicken Tikka Masala', 11.50, 'Frango em molho cremoso', TRUE, FALSE, FALSE, TRUE),
(7, 7, 'Butter Chicken', 12.00, 'Frango em molho de manteiga', TRUE, FALSE, FALSE, TRUE),
(7, 7, 'Palak Paneer', 9.50, 'Queijo com espinafres', TRUE, TRUE, FALSE, TRUE),
(7, 7, 'Biryani Vegetariano', 8.50, 'Arroz basmati com legumes', TRUE, TRUE, FALSE, TRUE),
(7, 7, 'Samosas (4un)', 5.00, 'Pastéis fritos indianos', TRUE, TRUE, FALSE, FALSE),

-- El Sombrero (id=8)
(8, 8, 'Tacos Carne (3un)', 8.50, 'Tacos com carne picada', TRUE, FALSE, FALSE, TRUE),
(8, 8, 'Burrito Frango', 9.00, 'Burrito recheado com frango', TRUE, FALSE, FALSE, FALSE),
(8, 8, 'Quesadilla Queijo', 7.50, 'Tortilha com queijo fundido', TRUE, TRUE, FALSE, FALSE),
(8, 8, 'Nachos Supremos', 8.00, 'Nachos com guacamole e queijo', TRUE, TRUE, FALSE, TRUE),
(8, 8, 'Fajitas Vaca', 12.00, 'Vaca grelhada com vegetais', FALSE, FALSE, FALSE, FALSE),

-- Green Garden (id=9)
(9, 9, 'Buddha Bowl', 9.50, 'Bowl com quinoa e legumes', TRUE, TRUE, TRUE, TRUE),
(9, 9, 'Hamburger Vegano', 8.50, 'Hambúrguer de grão', TRUE, TRUE, TRUE, FALSE),
(9, 9, 'Curry de Legumes', 10.00, 'Legumes em molho de curry', TRUE, TRUE, TRUE, TRUE),
(9, 9, 'Lasanha Vegetariana', 11.00, 'Lasanha com legumes', TRUE, TRUE, FALSE, FALSE),
(9, 9, 'Salada Completa', 7.50, 'Mix de folhas e vegetais', TRUE, TRUE, TRUE, TRUE),

-- Fit & Fresh (id=10)
(10, 10, 'Poke Bowl Salmão', 11.50, 'Bowl havaiano com salmão', TRUE, FALSE, FALSE, TRUE),
(10, 10, 'Salada Caesar Frango', 9.00, 'Salada com frango grelhado', TRUE, FALSE, FALSE, TRUE),
(10, 10, 'Wrap de Peru', 7.50, 'Peru, abacate e vegetais', TRUE, FALSE, FALSE, FALSE),
(10, 10, 'Smoothie Bowl', 6.50, 'Bowl de frutas e granola', TRUE, TRUE, TRUE, TRUE),
(10, 10, 'Quinoa Bowl', 8.50, 'Quinoa com vegetais grelhados', TRUE, TRUE, TRUE, TRUE),

-- Restantes restaurantes (simplificado - 3 pratos por restaurante)
(11, 15, 'Cataplana de Marisco', 28.00, 'Marisco fresco em cataplana', TRUE, FALSE, FALSE, TRUE),
(11, 15, 'Arroz de Marisco', 25.00, 'Arroz com mariscos diversos', TRUE, FALSE, FALSE, TRUE),
(11, 15, 'Gambas à Guilho', 16.00, 'Gambas salteadas', FALSE, FALSE, FALSE, TRUE),
(12, 1, 'Pizza Margherita', 7.50, 'Pizza clássica', TRUE, TRUE, FALSE, FALSE),
(12, 4, 'Spaghetti Bolonhesa', 9.00, 'Massa com molho de carne', TRUE, FALSE, FALSE, FALSE),
(12, 11, 'Gelado', 3.50, 'Gelado artesanal', TRUE, TRUE, FALSE, TRUE),
(13, 13, 'Picanha Grelhada', 18.00, 'Picanha na brasa', TRUE, FALSE, FALSE, TRUE),
(13, 13, 'Frango no Churrasco', 12.00, 'Frango inteiro', TRUE, FALSE, FALSE, TRUE),
(13, 13, 'Costelas BBQ', 16.00, 'Costelas com molho BBQ', FALSE, FALSE, FALSE, TRUE),
(14, 5, 'Bacalhau à Brás', 12.00, 'Bacalhau desfiado', TRUE, FALSE, FALSE, TRUE),
(14, 14, 'Rojões à Minhota', 11.50, 'Porco frito com batatas', TRUE, FALSE, FALSE, TRUE),
(14, 14, 'Alheira Grelhada', 9.50, 'Alheira tradicional', TRUE, FALSE, FALSE, TRUE),
(15, 15, 'Dourada Grelhada', 16.00, 'Dourada fresca grelhada', TRUE, FALSE, FALSE, TRUE),
(15, 15, 'Robalo Assado', 18.00, 'Robalo no forno', FALSE, FALSE, FALSE, TRUE),
(15, 15, 'Lulas Grelhadas', 14.00, 'Lulas frescas', TRUE, FALSE, FALSE, TRUE),
(16, 2, 'Station Burger', 9.50, 'Hambúrguer especial', TRUE, FALSE, FALSE, FALSE),
(16, 2, 'Pulled Pork Burger', 10.50, 'Com porco desfiado', TRUE, FALSE, FALSE, FALSE),
(16, 2, 'Veggie Station', 8.50, 'Hambúrguer vegetariano', TRUE, TRUE, FALSE, FALSE),
(17, 3, 'Mix Sushi 20un', 18.00, 'Variedade de sushi', TRUE, FALSE, FALSE, TRUE),
(17, 3, 'Combinado Sashimi', 22.00, 'Sashimi premium', FALSE, FALSE, FALSE, TRUE),
(17, 3, 'Temaki Variado (3un)', 12.00, 'Seleção de temakis', TRUE, FALSE, FALSE, TRUE),
(18, 6, 'Frango Xadrez', 9.50, 'Frango salteado com vegetais', TRUE, FALSE, FALSE, TRUE),
(18, 6, 'Tofu com Vegetais', 8.50, 'Tofu salteado', TRUE, TRUE, TRUE, TRUE),
(18, 6, 'Pato à Pequim', 16.00, 'Pato assado', TRUE, FALSE, FALSE, TRUE),
(19, 4, 'Risotto ai Funghi', 12.50, 'Arroz cremoso com cogumelos', TRUE, TRUE, FALSE, TRUE),
(19, 4, 'Osso Buco', 16.00, 'Vitela guisada', TRUE, FALSE, FALSE, TRUE),
(19, 4, 'Polenta Cremosa', 9.50, 'Polenta com queijo', FALSE, TRUE, FALSE, TRUE),
(20, 12, 'Menu Fast Food', 8.50, 'Hambúrguer, batatas e bebida', TRUE, FALSE, FALSE, FALSE),
(20, 12, 'Nuggets (6un)', 5.50, 'Nuggets de frango', TRUE, FALSE, FALSE, FALSE),
(20, 12, 'Hot Dog Especial', 6.50, 'Hot dog completo', TRUE, FALSE, FALSE, FALSE),
(21, 13, 'Frango Assado', 8.00, 'Frango no churrasco', TRUE, FALSE, FALSE, TRUE),
(21, 13, 'Meio Frango', 5.00, 'Meio frango grelhado', TRUE, FALSE, FALSE, TRUE),
(21, 13, 'Espetada Mista', 12.00, 'Espetada de carnes', TRUE, FALSE, FALSE, TRUE),
(22, 5, 'Cozido à Portuguesa', 14.00, 'Prato tradicional completo', TRUE, FALSE, FALSE, TRUE),
(22, 5, 'Feijoada', 13.00, 'Feijão com carnes', FALSE, FALSE, FALSE, TRUE),
(22, 5, 'Arroz de Cabidela', 12.50, 'Arroz de frango', TRUE, FALSE, FALSE, TRUE),
(23, 1, 'Pizza Familiar', 15.00, 'Pizza XL', TRUE, TRUE, FALSE, FALSE),
(23, 1, 'Pizza Média', 10.00, 'Pizza M', TRUE, TRUE, FALSE, FALSE),
(23, 1, 'Calzone', 9.50, 'Pizza fechada recheada', TRUE, FALSE, FALSE, FALSE),
(24, 10, 'Bowl de Quinoa', 9.00, 'Quinoa com vegetais', TRUE, TRUE, TRUE, TRUE),
(24, 10, 'Bowl de Salmão', 11.00, 'Salmão grelhado com vegetais', TRUE, FALSE, FALSE, TRUE),
(24, 10, 'Açai Bowl', 8.50, 'Bowl de açai com frutas', TRUE, TRUE, TRUE, TRUE),
(25, 5, 'Rojões à Minhota', 12.00, 'Porco frito tradicional', TRUE, FALSE, FALSE, TRUE),
(25, 5, 'Caldo Verde', 4.00, 'Sopa tradicional', TRUE, FALSE, FALSE, TRUE),
(25, 5, 'Cabrito Assado', 18.00, 'Cabrito no forno', FALSE, FALSE, FALSE, TRUE),
(26, 15, 'Cataplana de Marisco', 30.00, 'Marisco em cataplana', TRUE, FALSE, FALSE, TRUE),
(26, 15, 'Lagosta Grelhada', 45.00, 'Lagosta fresca grelhada', TRUE, FALSE, FALSE, TRUE),
(26, 15, 'Sapateira Recheada', 28.00, 'Sapateira fresca', FALSE, FALSE, FALSE, TRUE),
(27, 1, 'Pizza Romana', 9.50, 'Pizza estilo romano', TRUE, TRUE, FALSE, FALSE),
(27, 1, 'Pizza Capricciosa', 11.00, 'Pizza com vários ingredientes', TRUE, FALSE, FALSE, FALSE),
(27, 1, 'Focaccia', 6.50, 'Pão italiano com azeite', TRUE, TRUE, TRUE, FALSE),
(28, 8, 'Burrito Grande', 10.00, 'Burrito recheado', TRUE, FALSE, FALSE, FALSE),
(28, 8, 'Tacos (3un)', 8.50, 'Tacos mexicanos', TRUE, FALSE, FALSE, TRUE),
(28, 8, 'Enchiladas', 9.50, 'Enchiladas gratinadas', FALSE, FALSE, FALSE, FALSE),
(29, 5, 'Petiscos Variados', 12.00, 'Seleção de petiscos', TRUE, FALSE, FALSE, TRUE),
(29, 14, 'Chouriço Assado', 6.50, 'Chouriço grelhado', TRUE, FALSE, FALSE, TRUE),
(29, 14, 'Moelas Guisadas', 8.00, 'Moelas em molho', TRUE, FALSE, FALSE, TRUE),
(30, 3, 'Sushi Premium (12un)', 16.00, 'Sushi de qualidade', TRUE, FALSE, FALSE, TRUE),
(30, 3, 'Sashimi Mix', 18.00, 'Mix de sashimi', FALSE, FALSE, FALSE, TRUE),
(30, 3, 'Chirashi', 14.00, 'Bowl de sushi', TRUE, FALSE, FALSE, TRUE),
(31, 13, 'Picanha Premium', 20.00, 'Picanha de qualidade', TRUE, FALSE, FALSE, TRUE),
(31, 13, 'Costelas de Vaca', 17.00, 'Costelas grelhadas', TRUE, FALSE, FALSE, TRUE),
(31, 13, 'T-Bone Steak', 25.00, 'Bife especial', FALSE, FALSE, FALSE, TRUE),
(32, 11, 'Panna Cotta', 4.50, 'Sobremesa italiana', TRUE, TRUE, FALSE, TRUE),
(32, 11, 'Tiramisu', 5.00, 'Sobremesa clássica', TRUE, TRUE, FALSE, FALSE),
(32, 11, 'Cannoli', 4.80, 'Cannoli siciliano', TRUE, TRUE, FALSE, FALSE),
(33, 2, 'Burger Premium', 10.50, 'Hambúrguer gourmet', TRUE, FALSE, FALSE, FALSE),
(33, 2, 'Burger Duplo', 12.00, 'Dois hambúrgueres', TRUE, FALSE, FALSE, FALSE),
(33, 2, 'Chicken Deluxe', 9.50, 'Frango especial', FALSE, FALSE, FALSE, FALSE),
(34, 7, 'Chicken Curry', 11.50, 'Frango ao curry', TRUE, FALSE, FALSE, TRUE),
(34, 7, 'Lamb Vindaloo', 13.00, 'Borrego picante', TRUE, FALSE, FALSE, TRUE),
(34, 7, 'Naan Bread', 3.50, 'Pão indiano', TRUE, TRUE, FALSE, FALSE),
(35, 9, 'Bowl Vegano', 9.50, 'Bowl completo vegano', TRUE, TRUE, TRUE, TRUE),
(35, 9, 'Burger Vegano', 8.50, 'Hambúrguer vegetal', TRUE, TRUE, TRUE, FALSE),
(35, 9, 'Wrap Falafel', 8.00, 'Wrap de falafel', FALSE, TRUE, TRUE, FALSE);

-- ======================================
-- CLIENTES (40 clientes)
-- ======================================
INSERT INTO clientes (nome, email, telefone, morada, codpostal) VALUES
('João Silva', 'joao.silva@email.pt', '912345678', 'Rua das Flores, 45', '4000-001'),
('Maria Santos', 'maria.santos@email.pt', '913456789', 'Av. dos Aliados, 123', '4000-056'),
('Pedro Costa', 'pedro.costa@email.pt', '914567890', 'Rua de Cedofeita, 67', '4000-098'),
('Ana Pereira', 'ana.pereira@email.pt', '915678901', 'Rua do Bonjardim, 234', '4000-123'),
('Carlos Oliveira', 'carlos.oliveira@email.pt', '916789012', 'Rua do Heroísmo, 89', '4050-001'),
('Sofia Rodrigues', 'sofia.rodrigues@email.pt', '917890123', 'Rua da Boavista, 456', '4050-345'),
('Miguel Ferreira', 'miguel.ferreira@email.pt', '918901234', 'Av. da República, 78', '4100-001'),
('Rita Alves', 'rita.alves@email.pt', '919012345', 'Rua de Lordelo, 345', '4150-001'),
('Tiago Martins', 'tiago.martins@email.pt', '920123456', 'Rua de Ramalde, 567', '4200-001'),
('Beatriz Sousa', 'beatriz.sousa@email.pt', '921234567', 'Av. da Foz, 234', '4250-001'),
('Hugo Carvalho', 'hugo.carvalho@email.pt', '922345678', 'Cais de Gaia, 89', '4400-087'),
('Inês Lopes', 'ines.lopes@email.pt', '923456789', 'Rua Direita, 123', '4400-001'),
('Ricardo Gomes', 'ricardo.gomes@email.pt', '924567890', 'Av. da República, 456', '4430-001'),
('Catarina Pinto', 'catarina.pinto@email.pt', '925678901', 'Rua do Ouro, 78', '4410-001'),
('André Ribeiro', 'andre.ribeiro@email.pt', '926789012', 'Rua Heróis de França, 234', '4450-001'),
('Joana Dias', 'joana.dias@email.pt', '927890123', 'Av. General Norton, 567', '4450-208'),
('Bruno Nunes', 'bruno.nunes@email.pt', '928901234', 'Rua Brito Capelo, 89', '4460-001'),
('Mariana Moreira', 'mariana.moreira@email.pt', '929012345', 'Rua 5 de Outubro, 345', '4465-001'),
('Gonçalo Rocha', 'goncalo.rocha@email.pt', '930123456', 'Av. Dom Manuel II, 123', '4470-001'),
('Daniela Vieira', 'daniela.vieira@email.pt', '931234567', 'Centro Comercial, Loja 45', '4475-001'),
('Fábio Monteiro', 'fabio.monteiro@email.pt', '932345678', 'Rua Principal, 234', '4435-001'),
('Patrícia Correia', 'patricia.correia@email.pt', '933456789', 'Av. Vasco da Gama, 567', '4510-001'),
('Nuno Araújo', 'nuno.araujo@email.pt', '934567890', 'Rua do Comércio, 89', '4440-001'),
('Liliana Machado', 'liliana.machado@email.pt', '935678901', 'Av. 5 de Outubro, 234', '4445-001'),
('Rui Barbosa', 'rui.barbosa@email.pt', '936789012', 'Praça do Município, 45', '4780-001'),
('Andreia Melo', 'andreia.melo@email.pt', '937890123', 'Av. Marquês Sá, 123', '4480-001'),
('Fernando Lima', 'fernando.lima@email.pt', '938901234', 'Rua 25 de Abril, 567', '4485-001'),
('Susana Coelho', 'susana.coelho@email.pt', '939012345', 'Passeio Alegre, 89', '4490-001'),
('Vítor Mendes', 'vitor.mendes@email.pt', '940123456', 'Rua do Souto, 234', '4700-001'),
('Cláudia Faria', 'claudia.faria@email.pt', '941234567', 'Av. da Liberdade, 456', '4710-001'),
('Paulo Duarte', 'paulo.duarte@email.pt', '942345678', 'Largo do Toural, 78', '4800-001'),
('Teresa Castro', 'teresa.castro@email.pt', '943456789', 'Rua de Santa Maria, 345', '4810-001'),
('Luís Fernandes', 'luis.fernandes@email.pt', '944567890', 'Av. Fernando Magalhães, 123', '4520-001'),
('Cristina Tavares', 'cristina.tavares@email.pt', '945678901', 'Rua do Mercado, 567', '4560-001'),
('Jorge Antunes', 'jorge.antunes@email.pt', '946789012', 'Rua Central, 234', '4580-001'),
('Helena Simões', 'helena.simoes@email.pt', '947890123', 'Rua das Flores, 89', '4590-001'),
('Diogo Marques', 'diogo.marques@email.pt', '948901234', 'Av. dos Aliados, 456', '4000-056'),
('Sara Neves', 'sara.neves@email.pt', '949012345', 'Rua de Cedofeita, 123', '4000-098'),
('Manuel Cardoso', 'manuel.cardoso@email.pt', '950123456', 'Rua do Bonjardim, 567', '4000-123'),
('Isabel Reis', 'isabel.reis@email.pt', '951234567', 'Rua do Heroísmo, 234', '4050-001');

-- ======================================
-- ENTREGADORES (30 entregadores) - COM VARIAÇÃO DE ESTADOS
-- ======================================
INSERT INTO entregadores (nome, email, telefone, codpostal, estado) VALUES
('Marco Delivery', 'marco.delivery@food.pt', '961234567', '4000-001', 'disponivel'),
('António Rápido', 'antonio.rapido@food.pt', '962345678', '4000-056', 'ocupado'),
('José Express', 'jose.express@food.pt', '963456789', '4000-098', 'disponivel'),
('Francisco Veloz', 'francisco.veloz@food.pt', '964567890', '4050-001', 'ocupado'),
('Rodrigo Speed', 'rodrigo.speed@food.pt', '965678901', '4100-001', 'disponivel'),
('Alexandre Fast', 'alexandre.fast@food.pt', '966789012', '4200-001', 'indisponivel'),
('Gabriel Quick', 'gabriel.quick@food.pt', '967890123', '4400-087', 'disponivel'),
('Rafael Turbo', 'rafael.turbo@food.pt', '968901234', '4400-001', 'ocupado'),
('Leonardo Flash', 'leonardo.flash@food.pt', '969012345', '4450-001', 'disponivel'),
('Guilherme Jet', 'guilherme.jet@food.pt', '970123456', '4450-208', 'ocupado'),
('Bernardo Rocket', 'bernardo.rocket@food.pt', '971234567', '4460-001', 'disponivel'),
('Tomás Express2', 'tomas.express@food.pt', '972345678', '4470-001', 'disponivel'),
('Afonso Speed2', 'afonso.speed@food.pt', '973456789', '4480-001', 'indisponivel'),
('Martim Fast2', 'martim.fast@food.pt', '974567890', '4490-001', 'disponivel'),
('Lucas Veloz2', 'lucas.veloz@food.pt', '975678901', '4700-001', 'ocupado'),
('Mateus Quick2', 'mateus.quick@food.pt', '976789012', '4800-001', 'disponivel'),
('David Delivery2', 'david.delivery@food.pt', '977890123', '4520-001', 'disponivel'),
('Simão Rápido2', 'simao.rapido@food.pt', '978901234', '4560-001', 'indisponivel'),
('Pedro Runner', 'pedro.runner@food.pt', '979012345', '4580-001', 'disponivel'),
('Miguel Moto', 'miguel.moto@food.pt', '980123456', '4590-001', 'ocupado'),
('Daniel Bike', 'daniel.bike@food.pt', '981234567', '4000-123', 'disponivel'),
('André Scooter', 'andre.scooter@food.pt', '982345678', '4050-345', 'disponivel'),
('Bruno Wheels', 'bruno.wheels@food.pt', '983456789', '4150-001', 'ocupado'),
('Carlos Driver', 'carlos.driver@food.pt', '984567890', '4250-001', 'disponivel'),
('Eduardo Courier', 'eduardo.courier@food.pt', '985678901', '4410-001', 'disponivel'),
('Fábio Rider', 'fabio.rider@food.pt', '986789012', '4435-001', 'indisponivel'),
('Gonçalo Road', 'goncalo.road@food.pt', '987890123', '4430-001', 'disponivel'),
('Hugo Route', 'hugo.route@food.pt', '988901234', '4440-001', 'ocupado'),
('Ivo Track', 'ivo.track@food.pt', '989012345', '4445-001', 'disponivel'),
('João Path', 'joao.path@food.pt', '990123456', '4465-001', 'disponivel');

-- ======================================
-- PEDIDOS (80 pedidos com GRANDE VARIAÇÃO)
-- ======================================
INSERT INTO pedidos (cliente_id, restaurante_id, metodo_pagamento, hora_pedido) VALUES
-- PEDIDOS EM TEMPO REAL (últimas 2 horas) 
(1, 1, 'cartao', DATE_SUB(NOW(), INTERVAL 15 MINUTE)),
(2, 2, 'mbway', DATE_SUB(NOW(), INTERVAL 25 MINUTE)),
(3, 3, 'cartao', DATE_SUB(NOW(), INTERVAL 35 MINUTE)),
(4, 5, 'dinheiro', DATE_SUB(NOW(), INTERVAL 10 MINUTE)),
(5, 7, 'paypal', DATE_SUB(NOW(), INTERVAL 40 MINUTE)),
(6, 10, 'cartao', DATE_SUB(NOW(), INTERVAL 20 MINUTE)),
(7, 13, 'mbway', DATE_SUB(NOW(), INTERVAL 50 MINUTE)),
(8, 16, 'multibanco', DATE_SUB(NOW(), INTERVAL 5 MINUTE)),
(9, 21, 'cartao', DATE_SUB(NOW(), INTERVAL 30 MINUTE)),
(10, 24, 'dinheiro', DATE_SUB(NOW(), INTERVAL 90 MINUTE)),

-- PEDIDOS HOJE (manhã/tarde) - Maioria entregue, alguns cancelados
(11, 1, 'cartao', DATE_SUB(NOW(), INTERVAL 3 HOUR)),
(12, 2, 'mbway', DATE_SUB(NOW(), INTERVAL 4 HOUR)),
(13, 3, 'paypal', DATE_SUB(NOW(), INTERVAL 5 HOUR)),
(14, 4, 'cartao', DATE_SUB(NOW(), INTERVAL 6 HOUR)),
(15, 5, 'dinheiro', DATE_SUB(NOW(), INTERVAL 7 HOUR)),
(16, 6, 'mbway', DATE_SUB(NOW(), INTERVAL 8 HOUR)),
(17, 8, 'cartao', DATE_SUB(NOW(), INTERVAL 9 HOUR)),
(18, 9, 'multibanco', DATE_SUB(NOW(), INTERVAL 10 HOUR)),
(19, 11, 'paypal', DATE_SUB(NOW(), INTERVAL 11 HOUR)),
(20, 13, 'cartao', DATE_SUB(NOW(), INTERVAL 12 HOUR)),

-- DIA ANTERIOR (ontem)
(21, 15, 'mbway', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(22, 16, 'cartao', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(23, 17, 'dinheiro', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(24, 21, 'paypal', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(25, 23, 'cartao', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(26, 24, 'mbway', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(27, 25, 'multibanco', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(28, 29, 'cartao', DATE_SUB(NOW(), INTERVAL 1 DAY)),

-- 2 DIAS ATRÁS
(29, 1, 'dinheiro', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(30, 2, 'cartao', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(31, 3, 'mbway', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(32, 5, 'paypal', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(33, 8, 'cartao', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(34, 10, 'dinheiro', DATE_SUB(NOW(), INTERVAL 2 DAY)),

-- 3-5 DIAS ATRÁS
(35, 13, 'mbway', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(36, 16, 'cartao', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(37, 21, 'multibanco', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(38, 24, 'paypal', DATE_SUB(NOW(), INTERVAL 4 DAY)),
(39, 29, 'cartao', DATE_SUB(NOW(), INTERVAL 4 DAY)),
(40, 31, 'dinheiro', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(1, 33, 'mbway', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(2, 35, 'cartao', DATE_SUB(NOW(), INTERVAL 5 DAY)),

-- 1 SEMANA ATRÁS
(3, 1, 'paypal', DATE_SUB(NOW(), INTERVAL 7 DAY)),
(4, 2, 'cartao', DATE_SUB(NOW(), INTERVAL 7 DAY)),
(5, 3, 'dinheiro', DATE_SUB(NOW(), INTERVAL 7 DAY)),
(6, 5, 'mbway', DATE_SUB(NOW(), INTERVAL 7 DAY)),
(7, 8, 'multibanco', DATE_SUB(NOW(), INTERVAL 7 DAY)),
(8, 10, 'cartao', DATE_SUB(NOW(), INTERVAL 7 DAY)),

-- 2 SEMANAS ATRÁS
(9, 13, 'paypal', DATE_SUB(NOW(), INTERVAL 14 DAY)),
(10, 16, 'cartao', DATE_SUB(NOW(), INTERVAL 14 DAY)),
(11, 21, 'dinheiro', DATE_SUB(NOW(), INTERVAL 14 DAY)),
(12, 24, 'mbway', DATE_SUB(NOW(), INTERVAL 14 DAY)),
(13, 29, 'cartao', DATE_SUB(NOW(), INTERVAL 14 DAY)),
(14, 31, 'multibanco', DATE_SUB(NOW(), INTERVAL 14 DAY)),

-- 3 SEMANAS ATRÁS
(15, 1, 'cartao', DATE_SUB(NOW(), INTERVAL 21 DAY)),
(16, 2, 'dinheiro', DATE_SUB(NOW(), INTERVAL 21 DAY)),
(17, 3, 'mbway', DATE_SUB(NOW(), INTERVAL 21 DAY)),
(18, 5, 'paypal', DATE_SUB(NOW(), INTERVAL 21 DAY)),
(19, 8, 'cartao', DATE_SUB(NOW(), INTERVAL 21 DAY)),

-- 1 MÊS ATRÁS
(20, 10, 'multibanco', DATE_SUB(NOW(), INTERVAL 30 DAY)),
(21, 13, 'cartao', DATE_SUB(NOW(), INTERVAL 30 DAY)),
(22, 16, 'mbway', DATE_SUB(NOW(), INTERVAL 30 DAY)),
(23, 21, 'dinheiro', DATE_SUB(NOW(), INTERVAL 30 DAY)),
(24, 24, 'paypal', DATE_SUB(NOW(), INTERVAL 30 DAY)),

-- PEDIDOS MAIS ANTIGOS (até 2 meses)
(25, 29, 'cartao', DATE_SUB(NOW(), INTERVAL 35 DAY)),
(26, 31, 'mbway', DATE_SUB(NOW(), INTERVAL 40 DAY)),
(27, 33, 'multibanco', DATE_SUB(NOW(), INTERVAL 45 DAY)),
(28, 1, 'dinheiro', DATE_SUB(NOW(), INTERVAL 50 DAY)),
(29, 2, 'cartao', DATE_SUB(NOW(), INTERVAL 55 DAY)),
(30, 3, 'paypal', DATE_SUB(NOW(), INTERVAL 60 DAY)),

-- MAIS PEDIDOS RECENTES PARA DIVERSIDADE
(31, 5, 'mbway', DATE_SUB(NOW(), INTERVAL 6 DAY)),
(32, 8, 'cartao', DATE_SUB(NOW(), INTERVAL 8 DAY)),
(33, 10, 'dinheiro', DATE_SUB(NOW(), INTERVAL 9 DAY)),
(34, 13, 'multibanco', DATE_SUB(NOW(), INTERVAL 10 DAY)),
(35, 16, 'paypal', DATE_SUB(NOW(), INTERVAL 11 DAY)),
(36, 21, 'cartao', DATE_SUB(NOW(), INTERVAL 12 DAY)),
(37, 24, 'mbway', DATE_SUB(NOW(), INTERVAL 13 DAY)),
(38, 29, 'dinheiro', DATE_SUB(NOW(), INTERVAL 15 DAY)),
(39, 31, 'cartao', DATE_SUB(NOW(), INTERVAL 16 DAY)),
(40, 33, 'multibanco', DATE_SUB(NOW(), INTERVAL 17 DAY)),
-- ÚLTIMOS 20 PEDIDOS PARA ATINGIR 80
(1, 4, 'paypal', DATE_SUB(NOW(), INTERVAL 18 DAY)),
(2, 6, 'cartao', DATE_SUB(NOW(), INTERVAL 19 DAY)),
(3, 9, 'mbway', DATE_SUB(NOW(), INTERVAL 20 DAY)),
(4, 11, 'dinheiro', DATE_SUB(NOW(), INTERVAL 22 DAY)),
(5, 15, 'multibanco', DATE_SUB(NOW(), INTERVAL 23 DAY)),
(6, 17, 'cartao', DATE_SUB(NOW(), INTERVAL 24 DAY)),
(7, 23, 'paypal', DATE_SUB(NOW(), INTERVAL 25 DAY)),
(8, 25, 'mbway', DATE_SUB(NOW(), INTERVAL 26 DAY)),
(9, 29, 'cartao', DATE_SUB(NOW(), INTERVAL 27 DAY)),
(10, 31, 'dinheiro', DATE_SUB(NOW(), INTERVAL 28 DAY)),
(11, 33, 'multibanco', DATE_SUB(NOW(), INTERVAL 29 DAY)),
(12, 35, 'cartao', DATE_SUB(NOW(), INTERVAL 31 DAY)),
(13, 1, 'paypal', DATE_SUB(NOW(), INTERVAL 32 DAY)),
(14, 2, 'mbway', DATE_SUB(NOW(), INTERVAL 33 DAY)),
(15, 3, 'cartao', DATE_SUB(NOW(), INTERVAL 34 DAY)),
(16, 5, 'dinheiro', DATE_SUB(NOW(), INTERVAL 36 DAY)),
(17, 8, 'multibanco', DATE_SUB(NOW(), INTERVAL 37 DAY)),
(18, 10, 'cartao', DATE_SUB(NOW(), INTERVAL 38 DAY)),
(19, 13, 'paypal', DATE_SUB(NOW(), INTERVAL 39 DAY)),
(20, 16, 'mbway', DATE_SUB(NOW(), INTERVAL 41 DAY));

-- ======================================
-- PEDIDOS_PRATOS (itens dos pedidos)
-- ======================================

-- Pedidos em tempo real (1-10)
INSERT INTO pedidos_pratos (pedido_id, prato_id, quantidade) VALUES
(1, 1, 2), (1, 3, 1), (1, 7, 1),
(2, 9, 1), (2, 11, 1), (2, 13, 2),
(3, 15, 2), (3, 17, 1), (3, 19, 1),
(4, 31, 1), (4, 33, 2),
(5, 43, 1), (5, 45, 2), (5, 44, 1),
(6, 61, 1), (6, 62, 1),
(7, 74, 2), (7, 75, 1),
(8, 79, 1), (8, 80, 2),
(9, 84, 1), (9, 85, 1), (9, 86, 1),
(10, 96, 1), (10, 97, 2);

-- Pedidos de hoje (11-20)
INSERT INTO pedidos_pratos (pedido_id, prato_id, quantidade) VALUES
(11, 2, 1), (11, 4, 1),
(12, 10, 2), (12, 12, 1),
(13, 16, 1),
(14, 26, 1), (14, 28, 1),
(15, 32, 2), (15, 34, 1),
(16, 48, 1), (16, 49, 1), (16, 50, 1),
(17, 53, 2), (17, 55, 1),
(18, 59, 1),
(19, 66, 1), (19, 67, 2),
(20, 74, 1), (20, 76, 1);

-- Pedidos de ontem (21-28)
INSERT INTO pedidos_pratos (pedido_id, prato_id, quantidade) VALUES
(21, 77, 1), (21, 78, 1),
(22, 79, 2), (22, 81, 1),
(23, 81, 1), (23, 82, 1), (23, 83, 1),
(24, 84, 1),
(25, 86, 2), (25, 87, 1),
(26, 96, 1), (26, 98, 1),
(27, 100, 1), (27, 101, 1),
(28, 107, 2), (28, 108, 1);

-- 2 dias atrás (29-34)
INSERT INTO pedidos_pratos (pedido_id, prato_id, quantidade) VALUES
(29, 1, 1), (29, 5, 1),
(30, 9, 1), (30, 14, 1),
(31, 15, 1), (31, 20, 1), (31, 22, 1),
(32, 31, 1), (32, 35, 1),
(33, 53, 1),
(34, 61, 2), (34, 63, 1);

-- 3-5 dias atrás (35-42)
INSERT INTO pedidos_pratos (pedido_id, prato_id, quantidade) VALUES
(35, 74, 1), (35, 75, 1),
(36, 79, 2),
(37, 84, 1), (37, 86, 1),
(38, 96, 1), (38, 97, 1),
(39, 107, 2), (39, 109, 1),
(40, 113, 1), (40, 115, 1),
(41, 118, 2),
(42, 1, 1);

-- 1 semana (43-48)
INSERT INTO pedidos_pratos (pedido_id, prato_id, quantidade) VALUES
(43, 15, 1), (43, 18, 1),
(44, 9, 1), (44, 11, 1),
(45, 31, 2),
(46, 48, 1), (46, 50, 1),
(47, 53, 1), (47, 54, 1),
(48, 61, 1);

-- 2 semanas (49-54)
INSERT INTO pedidos_pratos (pedido_id, prato_id, quantidade) VALUES
(49, 74, 2),
(50, 79, 1), (50, 80, 1),
(51, 84, 1), (51, 85, 1),
(52, 96, 1),
(53, 107, 1), (53, 108, 1),
(54, 113, 2);

-- 3 semanas (55-59)
INSERT INTO pedidos_pratos (pedido_id, prato_id, quantidade) VALUES
(55, 1, 1), (55, 2, 1),
(56, 9, 2),
(57, 15, 1), (57, 17, 1),
(58, 31, 1), (58, 33, 1),
(59, 53, 1);

-- 1 mês (60-64)
INSERT INTO pedidos_pratos (pedido_id, prato_id, quantidade) VALUES
(60, 61, 1), (60, 62, 1),
(61, 74, 1),
(62, 79, 2),
(63, 84, 1), (63, 86, 1),
(64, 96, 1);

-- Mais antigos (65-70)
INSERT INTO pedidos_pratos (pedido_id, prato_id, quantidade) VALUES
(65, 107, 1), (65, 108, 1),
(66, 113, 1), (66, 115, 1),
(67, 118, 1),
(68, 1, 1),
(69, 9, 2),
(70, 15, 1), (70, 19, 1);

-- Pedidos finais (71-80)
INSERT INTO pedidos_pratos (pedido_id, prato_id, quantidade) VALUES
(71, 48, 1), (71, 49, 1),
(72, 53, 1),
(73, 59, 1), (73, 60, 1),
(74, 66, 2),
(75, 77, 1), (75, 78, 1),
(76, 79, 1),
(77, 96, 2),
(78, 100, 1),
(79, 107, 1), (79, 108, 1),
(80, 1, 1), (80, 3, 1);

-- ======================================
-- ENTREGAS - COM GRANDE VARIAÇÃO DE ESTADOS
-- ======================================

-- Entregas para pedidos 
INSERT INTO entregas (pedido_id, entregador_id, restaurante_id, tempo_estimado_min, tempo_real_min, estado, hora_entrega) VALUES
(1, 1, 1, 30, 35, 'pendente', DATE_SUB(NOW(), INTERVAL 1 MINUTE)),                    
(2, 2, 2, 25,  30, 'pendente', DATE_SUB(NOW(), INTERVAL 1 MINUTE)),                   
(3, 3, 3, 35, 35, 'a_caminho', DATE_SUB(NOW(), INTERVAL 1 MINUTE)),                   
(4, 4, 5, 30, 30, 'pendente', DATE_SUB(NOW(), INTERVAL 1 MINUTE)),                   
(5, 5, 7, 35, 35, 'pendente', DATE_SUB(NOW(), INTERVAL 1 MINUTE)),                    
(6, 7, 10, 20, 20, 'pendente', DATE_SUB(NOW(), INTERVAL 1 MINUTE)),                  
(7, 8, 13, 40, 40, 'a_caminho', DATE_SUB(NOW(), INTERVAL 1 MINUTE)),                  
(8, 9, 16, 25, 25, 'pendente', DATE_SUB(NOW(), INTERVAL 1 MINUTE)),                  
(9, 10, 21, 30, 30, 'pendente', DATE_SUB(NOW(), INTERVAL 1 MINUTE));                

-- Entrega já realizada há 90 min
INSERT INTO entregas (pedido_id, entregador_id, restaurante_id, tempo_estimado_min, tempo_real_min, estado, hora_entrega) VALUES
(10, 11, 24, 20, 22, 'entregue', DATE_SUB(NOW(), INTERVAL 90 MINUTE));

-- Entregas de HOJE concluídas (11-20)
INSERT INTO entregas (pedido_id, entregador_id, restaurante_id, tempo_estimado_min, tempo_real_min, estado, hora_entrega) VALUES
(11, 12, 1, 30, 28, 'entregue', DATE_SUB(NOW(), INTERVAL 3 HOUR)),
(12, 14, 2, 25, 30, 'entregue', DATE_SUB(NOW(), INTERVAL 4 HOUR)),
-- 13 foi cancelado - sem entrega
(14, 16, 4, 35, 35, 'entregue', DATE_SUB(NOW(), INTERVAL 6 HOUR)),
(15, 17, 5, 40, 38, 'entregue', DATE_SUB(NOW(), INTERVAL 7 HOUR)),
(16, 19, 6, 30, 32, 'entregue', DATE_SUB(NOW(), INTERVAL 8 HOUR)),
(17, 21, 8, 30, 29, 'entregue', DATE_SUB(NOW(), INTERVAL 9 HOUR)),
-- 18 foi cancelado - sem entrega
(19, 24, 11, 45, 50, 'entregue', DATE_SUB(NOW(), INTERVAL 11 HOUR)),
(20, 27, 13, 40, 42, 'entregue', DATE_SUB(NOW(), INTERVAL 12 HOUR));

-- Entregas de ONTEM (21-28)
INSERT INTO entregas (pedido_id, entregador_id, restaurante_id, tempo_estimado_min, tempo_real_min, estado, hora_entrega) VALUES
(21, 1, 15, 45, 43, 'entregue', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(22, 2, 16, 25, 28, 'entregue', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(23, 3, 17, 35, 33, 'entregue', DATE_SUB(NOW(), INTERVAL 1 DAY)),
-- 24 foi cancelado
(25, 5, 23, 30, 35, 'entregue', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(26, 7, 24, 20, 19, 'entregue', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(27, 9, 25, 40, 45, 'entregue', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(28, 11, 29, 30, 28, 'entregue', DATE_SUB(NOW(), INTERVAL 1 DAY));

-- 2 DIAS ATRÁS (29-34)
INSERT INTO entregas (pedido_id, entregador_id, restaurante_id, tempo_estimado_min, tempo_real_min, estado, hora_entrega) VALUES
(29, 12, 1, 30, 32, 'entregue', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(30, 14, 2, 25, 24, 'entregue', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(31, 16, 3, 35, 38, 'entregue', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(32, 17, 5, 40, 40, 'entregue', DATE_SUB(NOW(), INTERVAL 2 DAY)),
-- 33 foi cancelado
(34, 19, 10, 20, 22, 'entregue', DATE_SUB(NOW(), INTERVAL 2 DAY));

-- 3-5 DIAS (35-42)
INSERT INTO entregas (pedido_id, entregador_id, restaurante_id, tempo_estimado_min, tempo_real_min, estado, hora_entrega) VALUES
(35, 21, 13, 40, 37, 'entregue', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(36, 24, 16, 25, 30, 'entregue', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(37, 27, 21, 35, 33, 'entregue', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(38, 1, 24, 20, 25, 'entregue', DATE_SUB(NOW(), INTERVAL 4 DAY)),
(39, 2, 29, 30, 28, 'entregue', DATE_SUB(NOW(), INTERVAL 4 DAY)),
(40, 3, 31, 40, 42, 'entregue', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(41, 5, 33, 25, 26, 'entregue', DATE_SUB(NOW(), INTERVAL 5 DAY));
-- 42 foi cancelado

-- 1 SEMANA (43-48)
INSERT INTO entregas (pedido_id, entregador_id, restaurante_id, tempo_estimado_min, tempo_real_min, estado, hora_entrega) VALUES
(43, 7, 1, 30, 29, 'entregue', DATE_SUB(NOW(), INTERVAL 7 DAY)),
(44, 9, 2, 25, 27, 'entregue', DATE_SUB(NOW(), INTERVAL 7 DAY)),
(45, 11, 3, 35, 35, 'entregue', DATE_SUB(NOW(), INTERVAL 7 DAY)),
(46, 12, 5, 40, 38, 'entregue', DATE_SUB(NOW(), INTERVAL 7 DAY)),
(47, 14, 8, 30, 32, 'entregue', DATE_SUB(NOW(), INTERVAL 7 DAY)),
(48, 16, 10, 20, 21, 'entregue', DATE_SUB(NOW(), INTERVAL 7 DAY));

-- 2 SEMANAS (49-54)
INSERT INTO entregas (pedido_id, entregador_id, restaurante_id, tempo_estimado_min, tempo_real_min, estado, hora_entrega) VALUES
(49, 17, 13, 40, 43, 'entregue', DATE_SUB(NOW(), INTERVAL 14 DAY)),
(50, 19, 16, 25, 24, 'entregue', DATE_SUB(NOW(), INTERVAL 14 DAY)),
(51, 21, 21, 30, 33, 'entregue', DATE_SUB(NOW(), INTERVAL 14 DAY)),
-- 52 foi cancelado
(53, 24, 29, 35, 34, 'entregue', DATE_SUB(NOW(), INTERVAL 14 DAY)),
(54, 27, 31, 40, 45, 'entregue', DATE_SUB(NOW(), INTERVAL 14 DAY));

-- 3 SEMANAS (55-59)
INSERT INTO entregas (pedido_id, entregador_id, restaurante_id, tempo_estimado_min, tempo_real_min, estado, hora_entrega) VALUES
(55, 1, 1, 30, 28, 'entregue', DATE_SUB(NOW(), INTERVAL 21 DAY)),
(56, 2, 2, 25, 26, 'entregue', DATE_SUB(NOW(), INTERVAL 21 DAY)),
(57, 3, 3, 35, 37, 'entregue', DATE_SUB(NOW(), INTERVAL 21 DAY)),
(58, 5, 5, 40, 39, 'entregue', DATE_SUB(NOW(), INTERVAL 21 DAY)),
(59, 7, 8, 30, 31, 'entregue', DATE_SUB(NOW(), INTERVAL 21 DAY));

-- 1 MÊS (60-64)
INSERT INTO entregas (pedido_id, entregador_id, restaurante_id, tempo_estimado_min, tempo_real_min, estado, hora_entrega) VALUES
(60, 9, 10, 20, 22, 'entregue', DATE_SUB(NOW(), INTERVAL 30 DAY)),
(61, 11, 13, 40, 38, 'entregue', DATE_SUB(NOW(), INTERVAL 30 DAY)),
(62, 12, 16, 25, 27, 'entregue', DATE_SUB(NOW(), INTERVAL 30 DAY)),
(63, 14, 21, 35, 35, 'entregue', DATE_SUB(NOW(), INTERVAL 30 DAY)),
(64, 16, 24, 20, 23, 'entregue', DATE_SUB(NOW(), INTERVAL 30 DAY));

-- MAIS ANTIGOS (65-70)
INSERT INTO entregas (pedido_id, entregador_id, restaurante_id, tempo_estimado_min, tempo_real_min, estado, hora_entrega) VALUES
(65, 17, 29, 30, 32, 'entregue', DATE_SUB(NOW(), INTERVAL 35 DAY)),
(66, 19, 31, 40, 42, 'entregue', DATE_SUB(NOW(), INTERVAL 40 DAY)),
(67, 21, 33, 25, 24, 'entregue', DATE_SUB(NOW(), INTERVAL 45 DAY)),
-- 68 foi cancelado
(69, 24, 2, 25, 28, 'entregue', DATE_SUB(NOW(), INTERVAL 55 DAY)),
(70, 27, 3, 35, 36, 'entregue', DATE_SUB(NOW(), INTERVAL 60 DAY));

-- PEDIDOS RECENTES ADICIONAIS (71-80)
INSERT INTO entregas (pedido_id, entregador_id, restaurante_id, tempo_estimado_min, tempo_real_min, estado, hora_entrega) VALUES
(71, 1, 5, 40, 38, 'entregue', DATE_SUB(NOW(), INTERVAL 6 DAY)),
(72, 2, 8, 30, 32, 'entregue', DATE_SUB(NOW(), INTERVAL 8 DAY)),
(73, 3, 10, 20, 19, 'entregue', DATE_SUB(NOW(), INTERVAL 9 DAY)),
(74, 5, 13, 40, 43, 'entregue', DATE_SUB(NOW(), INTERVAL 10 DAY)),
(75, 7, 16, 25, 26, 'entregue', DATE_SUB(NOW(), INTERVAL 11 DAY)),
(76, 9, 21, 35, 34, 'entregue', DATE_SUB(NOW(), INTERVAL 12 DAY)),
(77, 11, 24, 20, 22, 'entregue', DATE_SUB(NOW(), INTERVAL 13 DAY)),
(78, 12, 29, 30, 28, 'entregue', DATE_SUB(NOW(), INTERVAL 15 DAY)),
(79, 14, 31, 40, 41, 'entregue', DATE_SUB(NOW(), INTERVAL 16 DAY));
-- 80 foi cancelado

-- PEDIDOS  ADICIONAIS (81-88)
INSERT INTO pedidos (cliente_id, restaurante_id, metodo_pagamento, hora_pedido) VALUES
(21, 4, 'cartao', DATE_SUB(NOW(), INTERVAL 18 DAY)),
(22, 6, 'mbway', DATE_SUB(NOW(), INTERVAL 19 DAY)),
(23, 9, 'dinheiro', DATE_SUB(NOW(), INTERVAL 20 DAY)),
(24, 11, 'paypal', DATE_SUB(NOW(), INTERVAL 22 DAY)),
(25, 15, 'cartao', DATE_SUB(NOW(), INTERVAL 23 DAY)),
(26, 17, 'multibanco', DATE_SUB(NOW(), INTERVAL 24 DAY)),
(27, 23, 'mbway', DATE_SUB(NOW(), INTERVAL 25 DAY)),
(28, 25, 'cartao', DATE_SUB(NOW(), INTERVAL 26 DAY));


-- Itens e entregas para estes últimos
INSERT INTO pedidos_pratos (pedido_id, prato_id, quantidade) VALUES
(81, 25, 1), (81, 27, 1),
(82, 48, 2),
(83, 59, 1), (83, 60, 1),
(84, 66, 1),
(85, 77, 1), (85, 78, 1),
(86, 81, 2),
(87, 86, 1), (87, 88, 1),
(88, 100, 1);

INSERT INTO entregas (pedido_id, entregador_id, restaurante_id, tempo_estimado_min, tempo_real_min, estado, hora_entrega) VALUES
(81, 16, 4, 35, 37, 'entregue', DATE_SUB(NOW(), INTERVAL 18 DAY)),
(82, 17, 6, 30, 29, 'entregue', DATE_SUB(NOW(), INTERVAL 19 DAY)),
(83, 19, 9, 25, 27, 'entregue', DATE_SUB(NOW(), INTERVAL 20 DAY)),
(84, 21, 11, 45, 48, 'entregue', DATE_SUB(NOW(), INTERVAL 22 DAY)),
(85, 24, 15, 40, 38, 'entregue', DATE_SUB(NOW(), INTERVAL 23 DAY)),
(86, 27, 17, 35, 36, 'entregue', DATE_SUB(NOW(), INTERVAL 24 DAY)),
(87, 1, 23, 30, 32, 'entregue', DATE_SUB(NOW(), INTERVAL 25 DAY)),
(88, 2, 25, 40, 43, 'entregue', DATE_SUB(NOW(), INTERVAL 26 DAY));

-- ======================================
-- PRATOS_INGREDIENTES (Exemplos expandidos)
-- ======================================
INSERT INTO pratos_ingredientes (prato_id, ingrediente_id, quantidade, obrigatorio, unidade) VALUES
-- Pizza Margherita (id=1)
(1, 1, '200', TRUE, 'g'),
(1, 22, '150', TRUE, 'g'),
(1, 37, '10', TRUE, 'g'),
(1, 34, '100', TRUE, 'g'),
(1, 30, '300', TRUE, 'g'),

-- Pizza Pepperoni (id=2)
(2, 1, '200', TRUE, 'g'),
(2, 22, '150', TRUE, 'g'),
(2, 15, '80', TRUE, 'g'),
(2, 34, '20', TRUE, 'ml'),

-- Burger Classic (id=9)
(9, 12, '150', TRUE, 'g'),
(9, 2, '30', TRUE, 'g'),
(9, 1, '50', TRUE, 'g'),
(9, 23, '50', TRUE, 'g'),
(9, 29, '1', TRUE, 'un'),
(9, 3, '20', FALSE, 'g'),

-- Bacon Burger (id=10)
(10, 12, '150', TRUE, 'g'),
(10, 14, '40', TRUE, 'g'),
(10, 23, '50', TRUE, 'g'),
(10, 2, '30', TRUE, 'g'),
(10, 29, '1', TRUE, 'un'),

-- Sushi Salmão (id=15)
(15, 17, '120', TRUE, 'g'),
(15, 28, '100', TRUE, 'g'),
(15, 51, '2', TRUE, 'folhas'),

-- California Roll (id=17)
(17, 18, '80', TRUE, 'g'),
(17, 28, '100', TRUE, 'g'),
(17, 51, '2', TRUE, 'folhas'),

-- Bacalhau à Brás (id=32)
(32, 19, '200', TRUE, 'g'),
(32, 46, '3', TRUE, 'un'),
(32, 3, '50', TRUE, 'g'),
(32, 2, '20', FALSE, 'g'),
(32, 34, '30', TRUE, 'ml'),

-- Francesinha (id=31)
(31, 12, '100', TRUE, 'g'),
(31, 13, '100', TRUE, 'g'),
(31, 16, '80', TRUE, 'g'),
(31, 15, '50', TRUE, 'g'),
(31, 29, '4', TRUE, 'fatias'),
(31, 23, '100', TRUE, 'g'),

-- Spaghetti Carbonara (id=25)
(25, 27, '200', TRUE, 'g'),
(25, 14, '80', TRUE, 'g'),
(25, 46, '2', TRUE, 'un'),
(25, 24, '50', TRUE, 'g'),
(25, 40, '5', TRUE, 'g'),

-- Chicken Tikka Masala (id=43)
(43, 11, '200', TRUE, 'g'),
(43, 25, '100', TRUE, 'ml'),
(43, 1, '100', TRUE, 'g'),
(43, 35, '10', TRUE, 'g'),
(43, 40, '5', TRUE, 'g'),

-- Poke Bowl Salmão (id=61)
(61, 17, '150', TRUE, 'g'),
(61, 28, '150', TRUE, 'g'),
(61, 2, '50', TRUE, 'g'),
(61, 10, '30', TRUE, 'g'),
(61, 7, '20', FALSE, 'g'),
(61, 48, '10', TRUE, 'g'),

-- Burger Vegano (id=67)
(67, 32, '120', TRUE, 'g'),
(67, 2, '30', TRUE, 'g'),
(67, 1, '50', TRUE, 'g'),
(67, 3, '20', FALSE, 'g'),
(67, 29, '1', TRUE, 'un'),

-- Picanha Grelhada (id=74)
(74, 12, '300', TRUE, 'g'),
(74, 39, '5', TRUE, 'g'),
(74, 40, '3', TRUE, 'g'),
(74, 34, '20', TRUE, 'ml'),

-- Cataplana de Marisco (id=66)
(66, 20, '150', TRUE, 'g'),
(66, 21, '100', TRUE, 'g'),
(66, 1, '100', TRUE, 'g'),
(66, 3, '50', TRUE, 'g'),
(66, 35, '20', TRUE, 'g'),
(66, 34, '50', TRUE, 'ml'),

-- Arroz de Marisco (id=67)
(67, 20, '100', TRUE, 'g'),
(67, 21, '80', TRUE, 'g'),
(67, 28, '200', TRUE, 'g'),
(67, 1, '100', TRUE, 'g'),
(67, 35, '15', TRUE, 'g'),

-- Lasanha Bolonhesa (id=26)
(26, 27, '300', TRUE, 'g'),
(26, 12, '200', TRUE, 'g'),
(26, 1, '150', TRUE, 'g'),
(26, 22, '150', TRUE, 'g'),
(26, 25, '100', TRUE, 'ml'),
(26, 3, '50', TRUE, 'g'),

-- Tacos Carne (id=53)
(53, 12, '150', TRUE, 'g'),
(53, 2, '30', TRUE, 'g'),
(53, 1, '50', TRUE, 'g'),
(53, 23, '50', TRUE, 'g'),
(53, 38, '5', FALSE, 'g'),

-- Chow Mein Frango (id=48)
(48, 11, '150', TRUE, 'g'),
(48, 27, '200', TRUE, 'g'),
(48, 10, '50', TRUE, 'g'),
(48, 3, '30', TRUE, 'g'),
(48, 41, '20', TRUE, 'ml'),

-- Buddha Bowl (id=59)
(59, 28, '100', TRUE, 'g'),
(59, 2, '50', TRUE, 'g'),
(59, 10, '50', TRUE, 'g'),
(59, 9, '50', TRUE, 'g'),
(59, 32, '80', TRUE, 'g'),
(59, 34, '20', TRUE, 'ml'),

-- Polvo à Lagareiro (id=34)
(34, 21, '300', TRUE, 'g'),
(34, 35, '30', TRUE, 'g'),
(34, 34, '50', TRUE, 'ml'),
(34, 39, '5', TRUE, 'g');


-- o schema usa O PREÇO EM EUROS COM DUAS CASAS DECIMAIS (ex: 12.50)
-- ======================================
-- ADICIONAR TIMESTAMPS AOS PRATOS
-- ======================================
-- Pratos criados progressivamente conforme restaurantes foram abrindo
-- (alinhado com created_at dos restaurantes, alguns dias depois)
UPDATE pratos SET created_at = DATE_SUB(NOW(), INTERVAL 145 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 145 DAY) WHERE restaurante_id = 1;
UPDATE pratos SET created_at = DATE_SUB(NOW(), INTERVAL 143 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 143 DAY) WHERE restaurante_id = 2;
UPDATE pratos SET created_at = DATE_SUB(NOW(), INTERVAL 141 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 141 DAY) WHERE restaurante_id = 3;
UPDATE pratos SET created_at = DATE_SUB(NOW(), INTERVAL 139 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 139 DAY) WHERE restaurante_id = 4;
UPDATE pratos SET created_at = DATE_SUB(NOW(), INTERVAL 137 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 137 DAY) WHERE restaurante_id = 5;
UPDATE pratos SET created_at = DATE_SUB(NOW(), INTERVAL 135 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 135 DAY) WHERE restaurante_id = 6;
UPDATE pratos SET created_at = DATE_SUB(NOW(), INTERVAL 133 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 133 DAY) WHERE restaurante_id = 7;
UPDATE pratos SET created_at = DATE_SUB(NOW(), INTERVAL 131 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 131 DAY) WHERE restaurante_id = 8;
UPDATE pratos SET created_at = DATE_SUB(NOW(), INTERVAL 129 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 129 DAY) WHERE restaurante_id = 9;
UPDATE pratos SET created_at = DATE_SUB(NOW(), INTERVAL 127 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 127 DAY) WHERE restaurante_id = 10;
UPDATE pratos SET created_at = DATE_SUB(NOW(), INTERVAL 125 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 125 DAY) WHERE restaurante_id BETWEEN 11 AND 15;
UPDATE pratos SET created_at = DATE_SUB(NOW(), INTERVAL 120 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 120 DAY) WHERE restaurante_id BETWEEN 16 AND 20;
UPDATE pratos SET created_at = DATE_SUB(NOW(), INTERVAL 115 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 115 DAY) WHERE restaurante_id BETWEEN 21 AND 25;
UPDATE pratos SET created_at = DATE_SUB(NOW(), INTERVAL 110 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 110 DAY) WHERE restaurante_id BETWEEN 26 AND 30;
UPDATE pratos SET created_at = DATE_SUB(NOW(), INTERVAL 105 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 105 DAY) WHERE restaurante_id BETWEEN 31 AND 35;

-- ======================================
-- ADICIONAR TIMESTAMPS AOS CLIENTES
-- ======================================
-- Clientes criados progressivamente ao longo de 4-6 meses
UPDATE clientes SET created_at = DATE_SUB(NOW(), INTERVAL 165 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 165 DAY) WHERE id BETWEEN 1 AND 5;
UPDATE clientes SET created_at = DATE_SUB(NOW(), INTERVAL 155 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 155 DAY) WHERE id BETWEEN 6 AND 10;
UPDATE clientes SET created_at = DATE_SUB(NOW(), INTERVAL 145 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 145 DAY) WHERE id BETWEEN 11 AND 15;
UPDATE clientes SET created_at = DATE_SUB(NOW(), INTERVAL 135 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 135 DAY) WHERE id BETWEEN 16 AND 20;
UPDATE clientes SET created_at = DATE_SUB(NOW(), INTERVAL 125 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 125 DAY) WHERE id BETWEEN 21 AND 25;
UPDATE clientes SET created_at = DATE_SUB(NOW(), INTERVAL 115 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 115 DAY) WHERE id BETWEEN 26 AND 30;
UPDATE clientes SET created_at = DATE_SUB(NOW(), INTERVAL 105 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 105 DAY) WHERE id BETWEEN 31 AND 35;
UPDATE clientes SET created_at = DATE_SUB(NOW(), INTERVAL 95 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 95 DAY) WHERE id BETWEEN 36 AND 40;

-- ======================================
-- ADICIONAR TIMESTAMPS AOS ENTREGADORES
-- ======================================
-- Entregadores criados progressivamente há 5-6 meses (foram contratados gradualmente)
UPDATE entregadores SET created_at = DATE_SUB(NOW(), INTERVAL 170 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 1 DAY) WHERE id BETWEEN 1 AND 5;
UPDATE entregadores SET created_at = DATE_SUB(NOW(), INTERVAL 160 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 1 DAY) WHERE id BETWEEN 6 AND 10;
UPDATE entregadores SET created_at = DATE_SUB(NOW(), INTERVAL 150 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 1 DAY) WHERE id BETWEEN 11 AND 15;
UPDATE entregadores SET created_at = DATE_SUB(NOW(), INTERVAL 140 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 1 DAY) WHERE id BETWEEN 16 AND 20;
UPDATE entregadores SET created_at = DATE_SUB(NOW(), INTERVAL 130 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 1 DAY) WHERE id BETWEEN 21 AND 25;
UPDATE entregadores SET created_at = DATE_SUB(NOW(), INTERVAL 120 DAY), updated_at = DATE_SUB(NOW(), INTERVAL 1 DAY) WHERE id BETWEEN 26 AND 30;

-- ======================================
-- ADICIONAR TIMESTAMPS AOS PEDIDOS
-- ======================================
-- Pedidos já têm hora_pedido, usamos isso como created_at e updated_at inicial
-- Garantir que TODOS os pedidos têm timestamps

-- Primeiro, atualizar todos os pedidos que têm hora_pedido
UPDATE pedidos 
SET created_at = hora_pedido, 
    updated_at = hora_pedido
WHERE hora_pedido IS NOT NULL;

-- Depois, garantir que todos os que ficaram NULL têm valores
UPDATE pedidos 
SET created_at = COALESCE(created_at, NOW()), 
    updated_at = COALESCE(updated_at, NOW())
WHERE created_at IS NULL OR updated_at IS NULL;

-- Para entregas concluídas, updated_at é quando foram entregues (usar tempo_real_min)
UPDATE pedidos p
JOIN entregas e ON p.id = e.pedido_id
SET p.updated_at = DATE_ADD(p.hora_pedido, INTERVAL e.tempo_real_min MINUTE)
WHERE e.estado = 'entregue' AND e.tempo_real_min IS NOT NULL AND p.hora_pedido IS NOT NULL;

-- ======================================
-- ADICIONAR TIMESTAMPS AOS PEDIDOS_PRATOS
-- ======================================
-- Itens criados quando os pedidos foram feitos
-- Desabilitar triggers temporariamente para evitar conflito
-- Nota: pedidos_pratos só tem created_at, não tem updated_at

-- Desabilitar triggers que atualizam pedidos
DROP TRIGGER IF EXISTS calcular_total_pedido_update;

UPDATE pedidos_pratos pp
INNER JOIN pedidos p ON pp.pedido_id = p.id
SET pp.created_at = COALESCE(CAST(p.hora_pedido AS DATETIME), p.created_at, NOW())
WHERE p.id IS NOT NULL;

-- Reabilitar trigger
-- Nota: O trigger será recriado automaticamente se o schema.sql for executado novamente
-- Por segurança, vamos recriar o trigger aqui
DELIMITER $$
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
DELIMITER ;

-- Para pedidos_pratos sem referência de pedido válida, usar NOW()
UPDATE pedidos_pratos
SET created_at = COALESCE(created_at, NOW())
WHERE created_at IS NULL;

-- ======================================
-- ADICIONAR TIMESTAMPS ÀS ENTREGAS
-- ======================================
-- Entregas criadas quando pedidos foram confirmados (alguns minutos depois do pedido)
UPDATE entregas e
JOIN pedidos p ON e.pedido_id = p.id
SET e.created_at = COALESCE(
        DATE_ADD(COALESCE(p.hora_pedido, p.created_at), INTERVAL 5 MINUTE),
        NOW()
    ),
    e.updated_at = COALESCE(
        CASE 
            WHEN e.estado = 'entregue' AND e.tempo_real_min IS NOT NULL AND p.hora_pedido IS NOT NULL 
                THEN DATE_ADD(p.hora_pedido, INTERVAL e.tempo_real_min MINUTE)
            WHEN e.estado = 'a_caminho' AND p.hora_pedido IS NOT NULL 
                THEN DATE_ADD(p.hora_pedido, INTERVAL 25 MINUTE)
            WHEN p.hora_pedido IS NOT NULL 
                THEN DATE_ADD(p.hora_pedido, INTERVAL 5 MINUTE)
            ELSE COALESCE(p.created_at, NOW())
        END,
        NOW()
    )
WHERE p.id IS NOT NULL;

-- Para entregas sem pedido associado válido
UPDATE entregas
SET created_at = COALESCE(created_at, NOW()),
    updated_at = COALESCE(updated_at, NOW())
WHERE created_at IS NULL OR updated_at IS NULL;

-- ======================================
-- RECALCULAR TOTAIS DOS PEDIDOS
-- ======================================
-- Os triggers devem ter calculado automaticamente, mas garantimos que está tudo atualizado
UPDATE pedidos p
SET total = (
    SELECT COALESCE(SUM(pp.quantidade * pr.preco), 0)
    FROM pedidos_pratos pp
    JOIN pratos pr ON pp.prato_id = pr.id
    WHERE pp.pedido_id = p.id
)
WHERE EXISTS (
    SELECT 1 FROM pedidos_pratos pp WHERE pp.pedido_id = p.id
);

-- ======================================
-- RESUMO DA SEED
-- ======================================
-- 50 Códigos Postais
-- 20 Categorias de Pratos
-- 35 Restaurantes (com estados: aberto, fechado)
-- 80 Ingredientes
-- 130+ Pratos (com disponibilidade variada)
-- 40 Clientes
-- 30 Entregadores (estados: disponivel, ocupado, indisponivel)
-- 88 Pedidos com:
--   * Métodos pagamento: cartao, mbway, dinheiro, paypal, multibanco
--   * Distribuição temporal: últimas 2 horas até 2 meses atrás
--   * Totais calculados automaticamente
-- 150+ Items de pedidos
-- 70+ Entregas com estados variados (pendente, a_caminho, entregue, cancelado)
-- 25+ Relações pratos-ingredientes

SET FOREIGN_KEY_CHECKS = 1;

-- ======================================
-- FIM DA SEED DATA
-- ======================================

