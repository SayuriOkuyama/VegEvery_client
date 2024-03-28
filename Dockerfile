FROM node:18-alpine AS build

ENV TZ Asia/Tokyo

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm install -D prettier eslint-config-prettier \
    @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev

RUN npm run build

EXPOSE 3000

CMD ["npm", "run" ,"dev"]
