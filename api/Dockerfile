FROM python:3.10-slim

WORKDIR /app/

RUN pip install poetry
COPY ../pyproject.toml ../poetry.lock ../.env /app/
RUN poetry install --only main

COPY . /app/

RUN mkdir -p /ui/public/

COPY ./api/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--forwarded-allow-ips='*'", "--proxy-headers"]
