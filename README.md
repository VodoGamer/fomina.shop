# fomina.shop

The source code of fomina.shop site.

## How to start production server

```bash
cp .env.example .env
vim .env
docker compose up --build -d
```

# How to start proxy server

```bash
sudo cp nginx/* /etc/nginx/sites-available/
sudo ln /etc/nginx/sites-available/fomina.shop /etc/nginx/sites-enabled/fomina.shop
sudo ln /etc/nginx/sites-available/api.fomina.shop /etc/nginx/sites-enabled/api.fomina.shop
sudo nginx -s reload
```
