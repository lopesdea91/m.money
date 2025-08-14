# Usa a imagem oficial do Node.js
FROM node:20-alpine

# Atualiza os pacotes do sistema para corrigir vulnerabilidades
RUN apk update && apk upgrade

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia package.json e package-lock.json (se existir) para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o código-fonte da aplicação para o diretório de trabalho
COPY . .

# Expõe a porta que a aplicação Express estará ouvindo
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "dev"]