import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import yaml from "js-yaml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.dirname(__dirname);
const TEMPLATE_DIR = path.join(ROOT_DIR, "fern", "apis", "v5", "openapi");
const EXAMPLES_DIR = path.join(TEMPLATE_DIR, "examples");
const TEMPLATE_FILE = "template.yml";

async function loadJson(fileName) {
  const content = await fs.readFile(fileName, "utf-8");
  return JSON.parse(content);
}

/**
 * Replaces placeholders in the given object with values from the JSON data.
 * Placeholders are of the form <<key>> and are replaced with the value of the key in the JSON data.
 * If the key is not found in the JSON data, the placeholder is left unchanged.s
 * @param {*} obj The object to replace placeholders in.
 * @param {*} jsonData The JSON data to use for replacement.
 * @returns
 */
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
  console.log("1. Loading YAML template and verifying parse");
  const templateContent = await fs.readFile(
    path.join(TEMPLATE_DIR, TEMPLATE_FILE),
    "utf-8"
  );
  let yamlObject;
  try {
    yamlObject = yaml.load(templateContent);
    console.log("YAML parsed successfully");
  } catch (error) {
    console.error("Error parsing YAML:", error);
    return;
  }

  console.log("2. Loading JSON examples");
  const jsonData = {};
  const files = await fs.readdir(EXAMPLES_DIR);
  for (const file of files) {
    if (file.endsWith(".json")) {
      const name = path.parse(file).name;
      jsonData[name] = await loadJson(path.join(EXAMPLES_DIR, file));
    }
  }

  console.log(jsonData["prompt_log_request"]);

  console.log("3. Replacing placeholders in YAML object");
  const populatedObject = replacePlaceholders(yamlObject, jsonData);

  console.log(
    populatedObject["paths"]["/prompts/log"]["post"]["x-fern-examples"][0]
  );

  console.log("4. Converting populated object to YAML and writing to file");
  const outputYaml = yaml.dump(populatedObject, {
    indent: 2,
    lineWidth: -1,
    noRefs: true,
    quotingType: '"',
  });

  //   const outputYamlFile = path.join(TEMPLATE_DIR, "openapi-overrides.yml");
  //   await fs.writeFile(outputYamlFile, outputYaml);

  const outputJsonFile = path.join(TEMPLATE_DIR, "openapi-overrides.json");
  await fs.writeFile(outputJsonFile, JSON.stringify(populatedObject, null, 2));

  console.log("Template population process completed!");
}

main().catch((error) => {
  console.error("An error occurred during the template population process:");
  console.error(error);
});
