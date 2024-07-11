#!/usr/bin/env bash

# This script is used to sync the OpenAPI specification from the backend

# TO USE:
# 0. install yq and prettier
# brew install yq
# npm install -g prettier
# 1. Set API_URL to the URL of the backend API (if local, make sure it is running)
# 2. Run the script

# API_URL=https://api.humanloop.com
API_URL=http://localhost:80


# The set -e command in a shell script makes the script exit
# immediately if any command within the script fails (returns a
# non-zero exit status). This is useful for ensuring that errors are caught early and do not cause the script to continue running in an unintended state.
set -e

# This script will download the latest OpenAPI specification from backend.
PROJECT_ROOT="$(pwd)/$(dirname "$0")/../"

# Add warning to the top of the file, not to edit it directly
echo "#
# WARNING: This file is auto-generated. Do not edit this file directly.
# Use the sync_openapi.sh script to update this file.
#" > $PROJECT_ROOT/fern/apis/v4/openapi/openapi.yml

# Convert to yaml 
curl -s $API_URL/v4/openapi.json | yq eval -P - >> $PROJECT_ROOT/fern/apis/v4/openapi/openapi.yml

# Run prettier on the file
prettier --write $PROJECT_ROOT/fern/apis/v4/openapi/openapi.yml

# ----------------------------

echo "#
# WARNING: This file is auto-generated. Do not edit this file directly.
# Use the sync_openapi.sh script to update this file.
#" > $PROJECT_ROOT/fern/apis/v5/openapi/openapi.yml

# Convert to yaml 
curl -s $API_URL/v5/openapi.json | yq eval -P - >> $PROJECT_ROOT/fern/apis/v5/openapi/openapi.yml


# Run prettier on the file
prettier --write $PROJECT_ROOT/fern/apis/v5/openapi/openapi.yml

# Run the populate script to fill in the overrides
python $PROJECT_ROOT/scripts/populate_template.py