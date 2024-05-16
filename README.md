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
## Updating your Docs

To update your docs, simply merge your PR to main. To see a preview of your docs, run: 

```sh
npm install -g fern-api # only required once
fern generate --docs --preview
```
