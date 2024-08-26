FROM node:slim

WORKDIR /app/

COPY package*.json ./
RUN npm install

COPY src/ ./src/
COPY index.html vite.config.ts tsconfig.json tailwind.config.cjs postcss.config.js ./

COPY docker-entrypoint.sh ./
RUN chmod u+rx docker-entrypoint.sh
ENTRYPOINT [ "./docker-entrypoint.sh" ]
