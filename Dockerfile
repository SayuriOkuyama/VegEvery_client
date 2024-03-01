FROM node:18-alpine AS build

ENV TZ Asia/Tokyo

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run" ,"dev"]
