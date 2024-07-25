import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import yaml from "js-yaml";
import prettier from "prettier";

const API_URL = process.env.API_URL || "http://localhost:80";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");

const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  console.log(colors[color] + message + colors.reset);
}

async function syncOpenAPI(version) {
  log(
    `🔄 Starting the synchronization of the OpenAPI specification for v${version}...`,
    "cyan"
  );

  try {
    const response = await fetch(`${API_URL}/v${version}/openapi.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const openApiSpec = await response.json();

    const warning = `#
# WARNING: This file is auto-generated. Do not edit this file directly.
# Use the sync_openapi.js script to update this file.
#
`;

    const yamlContent = yaml.dump(openApiSpec);
    const filePath = path.join(
      PROJECT_ROOT,
      `fern/apis/v${version}/openapi/openapi.yml`
    );

    await fs.writeFile(filePath, warning + yamlContent);

    // Format with prettier
    const formattedContent = await prettier.format(
      await fs.readFile(filePath, "utf8"),
      {
        parser: "yaml",
      }
    );
    await fs.writeFile(filePath, formattedContent);

    log(`...✨ formatted successfully!`, "green");
    log(
      `✅ Successfully synchronized v${version} OpenAPI specification and formatted it with prettier.`,
      "green"
    );
  } catch (error) {
    log(
      `⚠️  Warning: Failed to fetch or process the API at ${API_URL}/v${version}/openapi.json`,
      "yellow"
    );
    log(`⚠️  The v${version} OpenAPI spec will not be regenerated.`, "yellow");
    log(`⚠️  Error details: ${error.message}`, "yellow");
    log(
      `⚠️  Please ensure the backend is running and accessible at ${API_URL}`,
      "yellow"
    );
    log(`⚠️  Continuing with the rest of the script execution...`, "yellow");
  }
}

async function populateTemplate() {
  log("Populating template with overrides...", "blue");

  try {
    const scriptPath = path.join(__dirname, "populate_template.py");
    const { exec } = await import("child_process");

    await new Promise((resolve, reject) => {
      exec(`python ${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
          log(`Error executing populate_template.py: ${error}`, "red");
          reject(error);
          return;
        }
        if (stderr) {
          log(`populate_template.py stderr: ${stderr}`, "yellow");
        }
        log(stdout, "blue");
        resolve();
      });
    });

    log(
      `✨ YAML file generated successfully: ${PROJECT_ROOT}/fern/apis/v5/openapi/openapi-overrides.yml`,
      "green"
    );
    log("✅ Successfully populated the template with overrides.", "green");
  } catch (error) {
    log(`❌ Error in populateTemplate: ${error}`, "red");
    throw error;
  }
}

async function main() {
  log("🚀 Starting OpenAPI synchronization process...", "magenta");
  await syncOpenAPI(4);
  console.log();
  await syncOpenAPI(5);
  console.log();
  await populateTemplate();
  log("🎉 OpenAPI synchronization process completed!", "magenta");
}

main().catch((error) => {
  log("❌ An unexpected error occurred:", "red");
  log(error.stack, "red");
});
