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

async function main() {
  console.log("1. Loading YAML template");
  const templateContent = await fs.readFile(
    path.join(TEMPLATE_DIR, TEMPLATE_FILE),
    "utf-8"
  );
  const templateYaml = yaml.load(templateContent);

  console.log("2. Converting template to JSON");
  const templateJson = JSON.stringify(templateYaml);

  console.log("3. Loading example JSON files");
  const jsonData = {};
  const files = await fs.readdir(EXAMPLES_DIR);
  for (const file of files) {
    if (file.endsWith(".json")) {
      const name = path.parse(file).name;
      jsonData[name] = await loadJson(path.join(EXAMPLES_DIR, file));
    }
  }

  console.log("4. Replacing placeholders in template");
  const populatedJsonString = templateJson.replace(
    /"<<\s*([\w.]+)\s*>>"/g,
    (match, key) => {
      const value = key.split(".").reduce((o, k) => o && o[k], jsonData);
      return value !== undefined ? JSON.stringify(value) : match;
    }
  );

  console.log("5. Parsing populated JSON");
  const populatedJson = JSON.parse(populatedJsonString);

  console.log("6. Converting populated JSON to YAML");
  const yamlString = yaml.dump(populatedJson, {
    sortKeys: false,
    noRefs: true,
    lineWidth: -1,
    indent: 2,
  });

  console.log("7. Writing YAML to file");
  const outputYamlFile = path.join(TEMPLATE_DIR, "openapi-overrides.yml");
  await fs.writeFile(outputYamlFile, yamlString);

  console.log("Template population process completed!");
}

main().catch((error) => {
  console.error("An error occurred during the template population process:");
  console.error(error);
});
prompt_log_request;
