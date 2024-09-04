FROM python:3.12-slim

WORKDIR /app/

COPY requirements.lock pyproject.toml README.md ./
RUN PYTHONDONTWRITEBYTECODE=1 pip install --no-cache-dir -r requirements.lock

COPY src/ ./src/
COPY sdek/ ./sdek/
COPY alembic.ini docker-entrypoint.sh ./
COPY ./alembic/ ./alembic/

RUN alembic upgrade head

RUN chmod +x docker-entrypoint.sh

ENTRYPOINT ["/app/docker-entrypoint.sh"]
