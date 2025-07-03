FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci --omit=dev
COPY . .
RUN npm install -g pm2

EXPOSE 8000
CMD ["pm2-runtime", "app.js"]
