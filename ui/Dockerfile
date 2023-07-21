FROM node:20-slim

WORKDIR /app/ui/
COPY ../.env /app/
COPY ../ui/ /app/ui/

RUN npm i
RUN npm run build

CMD ["npm", "run", "serve", "--", "--host"]
