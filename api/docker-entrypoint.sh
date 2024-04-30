#!/usr/bin/env bash
set -e
alembic upgrade head
uvicorn src:app --host 0.0.0.0 --forwarded-allow-ips='*' --proxy-headers
