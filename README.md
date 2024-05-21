# Humanloop Fern Configuration

This repository contains your Fern Configuration:

- [OpenAPI spec](./openapi.yml)
- [Generators config](./fern/generators.yml)

## Validating your API Definition

To validate your API, run:

```sh
npm install -g fern-api # only required once
fern check
```

## Changing docs

To see a preview of your docs as you write them, run:

```sh
npm install -g fern-api # only required once
fern docs dev
```

## Updating your Docs

To update your docs, simply merge your PR to main. To see a preview of your docs, run:

```sh
npm install -g fern-api # only required once
fern docs dev
```

## Deploying your Docs

Commit your changes and push to main. Your docs will be automatically deployed to Vercel.
