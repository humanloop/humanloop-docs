# Humanloop Fern Configuration

This repository contains your Fern Configuration:

- [OpenAPI spec](./fern/apis/v4/openapi/openapi.yml)
- [OpenAPI Overrides](./fern/apis/v4/openapi/overrides.json)
- [SDK generator config](./fern/apis/v4/generators.yml)

<!-- - [Generators config](./fern/generators.yml) -->

## Setup

```sh
npm install
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
npm run dev
```

To see a exact preview fully rendered, run:

```sh
fern generate --docs --preview
```

and you'll get a preview URL.

### Change the OpenAPI spec

To update the OpenAPI spec, follow these steps:

1. Make sure the backend is running at localhost:80
2. Run the following npm command to synchronize the OpenAPI spec:
   ```sh
   npm run sync
   ```
   This will execute the `sync_openapi.sh` script to synchronize the OpenAPI spec.
   This will simultaneously watch for changes to the `template.yml` file and the OpenAPI spec file(s) for updates.
3. Make any changes to the [`template.yml`](fern/apis/v5/openapi/template.yml) and the examples in the [`examples`](fern/apis/v5/openapi/examples/) directory as needed.
4. Run `fern check` (in a seperate terminal to aid in debugging).

For more details, refer to the [`sync_openapi.sh`](scripts/sync_openapi.sh) and [`populate_template.py`](scripts/populate_template.py) scripts in the `scripts` directory.

#### How the Example templating works

We've made out our jinja like syntax to be able to re-use API examples in multiple places.

The [template.yml](fern/apis/v5/openapi/template.yml) file contains a yml overrides of the OpenAPI schema. If the JSON paths match, the objects will be upserted into the main spec. Use `<< example_name >>` syntax to be able to insert `examples/example_name.json` into the OpenAPI spec.

```
paths:
  /prompts/log:
    post:
      x-fern-examples:
        - name: Log prompt
          request: << prompt_log_request >>
          response:
            body: << prompt_log_response >>

```

### Deploying your Docs

**Docs deploy automatically on merge with main.**

You can deploy manually if your github handle has been associated with our account on Fern:

## Managing SDKs

### Deploying your SDKs

To deploy your SDKs, simply run the `Release Python SDK` GitHub Action with the desired version for the release. Under the hood, this leverages the Fern CLI:

```sh
fern generate --group python-sdk
```

### Developing SDKs

You can also regenerate the SDKs locally by running:

```sh
fern generate --api v5 --group python-sdk --preview --log-level debug
```

This will generate the SDK and download it to a local folder that can be pip installed.

```sh
pip install -e /path/to/fern/apis/v5/.preview/fern-python-sdk
```

# How the repo is structured

- [`fern/docs.yml`](fern/docs.yml) - the starting point, configuration for the docs and links to the versions
- [`fern/versions/v5.yml`](fern/versions/v5.yml) - a version which specifies the tabs and the pages
- [`fern/apis/v5/generators.yml`](fern/apis/v5/generators.yml) - specifies the openapi spec and overrides
- [`fern/apis/v5/openapi/openapi.yml`](fern/apis/v5/openapi/openapi.auto.json) - the (autogenerated) openapi spec
- [`fern/apis/v5/openapi/overrides.json`](fern/apis/v5/openapi/overrides.auto.json) - examples for the openapi spec (autogenerated)
- [`fern/apis/v5/openapi/template.yml`](fern/apis/v5/openapi/template.yml) - the template for the overrides
- [`fern/apis/v5/openapi/examples/`](fern/apis/v5/openapi/examples/) - JSON request/response examples for the examples
