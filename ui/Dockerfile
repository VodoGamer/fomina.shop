FROM node:slim

WORKDIR /app/

COPY package*.json ./
RUN npm install

COPY src/ ./src/
COPY index.html vite.config.ts tsconfig.json ./

# RUN chmod 777 vite.config.ts
# RUN cat vite.config.ts
# RUN bun run build

COPY docker-entrypoint.sh ./
RUN chmod u+rx docker-entrypoint.sh
ENTRYPOINT [ "./docker-entrypoint.sh" ]
