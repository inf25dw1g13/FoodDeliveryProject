FROM mariadb:11.2

# Copia configuração (my.cnf)
COPY my.cnf /etc/mysql/conf.d/

# Copia os scripts SQL para um diretório initdb.d para ser executado automaticamente ao iniciar o container
COPY scripts/ /docker-entrypoint-initdb.d/

# Converte CRLF para LF nos scripts .sh e torna executável
RUN find /docker-entrypoint-initdb.d -name "*.sh" -type f -exec sed -i 's/\r$//' {} \; && \
    chmod +x /docker-entrypoint-initdb.d/*.sh 2>/dev/null || true