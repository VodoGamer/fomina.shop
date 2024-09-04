FROM oven/bun:latest

WORKDIR /app/

COPY ui/package*.json ui/bun.lockb ./
RUN bun install

COPY ui/src/ ./src/
COPY ui/public/ ./public/
COPY ui/app.config.ts ui/tsconfig.json ui/tsconfig.json ui/tailwind.config.cjs ui/postcss.config.cjs .env ./

RUN bun run --env-file /app/.env build

COPY ui/docker-entrypoint.sh ./
RUN chmod u+rx docker-entrypoint.sh
ENTRYPOINT [ "./docker-entrypoint.sh" ]
