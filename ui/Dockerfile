FROM node:20-slim

WORKDIR /app
COPY ../.env /app
COPY ../ui/ /app

RUN npm i
RUN npm run build

CMD ["npm", "run", "serve", "--", "--host"]
