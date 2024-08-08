import fs from "fs/promises";
import yaml from "js-yaml";
import path from "path";
import prettier from "prettier";
import { fileURLToPath } from "url";

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

    const jsonContent = JSON.stringify(openApiSpec, null, 2);
    const filePath = path.join(
      PROJECT_ROOT,
      `fern/apis/v${version}/openapi/openapi.auto.json`
    );

    await fs.writeFile(filePath, jsonContent);

    // Format with prettier
    const formattedContent = await prettier.format(
      await fs.readFile(filePath, "utf8"),
      {
        parser: "json",
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

async function main() {
  log("🚀 Starting OpenAPI synchronization process...", "magenta");
  await syncOpenAPI(4);
  console.log();
  await syncOpenAPI(5);
  console.log();
  log("🎉 OpenAPI synchronization process completed!", "magenta");
}

main().catch((error) => {
  log("❌ An unexpected error occurred:", "red");
  log(error.stack, "red");
});
