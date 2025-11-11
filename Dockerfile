FROM node:20-alpine

WORKDIR /app

# Копируем package файлы
COPY package*.json ./

# Очищаем кэш и устанавливаем зависимости
RUN npm cache clean --force && \
    rm -rf node_modules package-lock.json && \
    npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]