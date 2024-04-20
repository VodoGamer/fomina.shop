# fomina-shop

Source code for a new brand store.

## Requirements

fomina.shop use modern package managers (Bun & Rye). You can use any other package manager, like [npm](https://docs.npmjs.com/getting-started/installing-node) or [pnpm](https://pnpm.io/). But we recommend using [Bun](https://bun.sh/) for JavaScript front-end and [Rye](https://rye-up.com/) for Python back-end.

## Install dependencies

-   Run `cd ui && bun install` in the root directory of fomina.shop.
-   Run `rye install` in the root directory of fomina.shop.

## How to dev

-   To run ui for dev, use `cd ui && bun run dev` in the root directory of fomina.shop.
-   To run api for dev, use `rye run uvicorn --reload api:app` in the root directory of fomina.shop.
