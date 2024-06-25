# Humanloop Fern Configuration

This repository contains your Fern Configuration:

- [OpenAPI spec](./fern/apis/v4/openapi/openapi.yml)
- [OpenAPI Overrides](./fern/apis/v4/openapi/overrides.json)
- [SDK generator config](./fern/apis/v4/generators.yml)

<!-- - [Generators config](./fern/generators.yml) -->

## Setup

```sh
npm install -g fern-api # only required once
```

## Validating your API Definition

To validate your API, run:

```sh
fern check
```

## Managing Docs

### Changing docs

To see a preview of your docs as you write them, run:

```sh
fern docs dev
```

To see a exact preview fully rendered, run:

```sh
fern generate --docs --preview
```

and you'll get a preview URL.

### Deploying your Docs

**Docs deploy automatically on merge with main.**

You can deploy manually if your github handle has been associated with our account on Fern:

```sh
fern generate --docs
```

## Managing SDKs

### Deploying your SDKs

To deploy your SDKs, simply run the `Release Python SDK` GitHub Action with the desired version for the release. Under the hood, this leverages the Fern CLI: 

```sh
npm install -g fern-api # only required once
fern generate --group python-sdk
```