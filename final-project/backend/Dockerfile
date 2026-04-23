FROM node:22-alpine
WORKDIR /app
RUN mkdir -p /app/db
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5001
CMD ["node", "server.js"]
