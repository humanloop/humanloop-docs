import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import yaml from "js-yaml";
import prettier from "prettier";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.dirname(__dirname);
const TEMPLATE_DIR = path.join(ROOT_DIR, "fern", "apis", "v5", "openapi");
const EXAMPLES_DIR = path.join(TEMPLATE_DIR, "examples");
const TEMPLATE_FILE = "template.yml";

function log(message, color = "white") {
  console.log(chalk[color](message));
}

async function loadJson(fileName) {
  const content = await fs.readFile(fileName, "utf-8");
  return JSON.parse(content);
}

function replacePlaceholders(obj, jsonData) {
  if (typeof obj === "string" && obj.match(/^<<\s*[\w.]+\s*>>$/)) {
    const key = obj.replace(/^<<\s*([\w.]+)\s*>>$/, "$1");
    return jsonData[key] || obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => replacePlaceholders(item, jsonData));
  }
  if (typeof obj === "object" && obj !== null) {
    const newObj = {};
    for (const [key, value] of Object.entries(obj)) {
      newObj[key] = replacePlaceholders(value, jsonData);
    }
    return newObj;
  }
  return obj;
}

async function main() {
  log("1. Loading YAML template and verifying parse", "blue");
  const templateContent = await fs.readFile(
    path.join(TEMPLATE_DIR, TEMPLATE_FILE),
    "utf-8"
  );
  let yamlObject;
  try {
    yamlObject = yaml.load(templateContent);
    log("YAML parsed successfully", "green");
  } catch (error) {
    log("Error parsing YAML:", "red");
    console.error(error);
    return;
  }

  log("2. Loading JSON examples", "blue");
  const jsonData = {};
  const files = await fs.readdir(EXAMPLES_DIR);
  for (const file of files) {
    if (file.endsWith(".json")) {
      const name = path.parse(file).name;
      jsonData[name] = await loadJson(path.join(EXAMPLES_DIR, file));
    }
  }

  log("3. Replacing placeholders in YAML object", "blue");
  const populatedObject = replacePlaceholders(yamlObject, jsonData);

  log(
    "4. Converting populated object to JSON, formatting with Prettier, and writing to file",
    "blue"
  );
  const outputJsonFile = path.join(TEMPLATE_DIR, "overrides.auto.json");
  const formattedJson = await prettier.format(JSON.stringify(populatedObject), {
    parser: "json",
    printWidth: 80,
    tabWidth: 2,
    singleQuote: false,
    trailingComma: "none",
  });

  await fs.writeFile(outputJsonFile, formattedJson);

  log(`✅ JSON file generated successfully: ${outputJsonFile}`, "green");
  log("🎉 Template population process completed!", "magenta");
}

main().catch((error) => {
  log("❌ An error occurred during the template population process:", "red");
  console.error(error);
});
