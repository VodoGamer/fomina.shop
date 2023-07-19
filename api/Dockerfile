FROM python:3.10-slim

WORKDIR /app/

RUN pip install poetry
COPY ../pyproject.toml ../poetry.lock ../.env /app/
RUN poetry install --only main

COPY . /app/

CMD ["poetry", "run", "hypercorn", "api:app"]
