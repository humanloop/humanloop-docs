/**
 * This script optimizes all staged image files using imageoptim-cli and re-stages them in Git.
 * It accepts additional options to pass to imageoptim-cli.
 * See: https://github.com/JamieMason/ImageOptim-CLI?tab=readme-ov-file#-usage for more information.
 *
 * ImageOptim overwrites the original files with the optimized versions.
 * Note that the default `--speed` option is set to 1, which is the slowest.
 *
 * Usage:
 *   npm run optimize-assets -- [options]
 *
 * Example:
 *   npm run optimize-assets -- --speed 10
 */

import { execSync } from "child_process";

// Get additional options passed to the script
const options = process.argv.slice(2).join(" ");

// Get the list of staged files
const stagedFiles = execSync("git diff --cached --name-only --diff-filter=ACM")
  .toString()
  .split("\n")
  .filter((file) => file.match(/\.(png|jpe?g|gif|svg)$/i));

// If there are no staged image files, exit
if (stagedFiles.length === 0) {
  console.log("No staged image files to optimize.");
  process.exit(0);
}

// Log the files that will be optimized
console.log("Staged image files to be optimized:");
stagedFiles.forEach((file) => console.log(`- ${file}`));

// Run imageoptim-cli on the staged image files using npx
try {
  execSync(`npx imageoptim-cli ${options} ${stagedFiles.join(" ")}`, {
    stdio: "inherit",
  });
  // Re-add the optimized files to the staging area
  execSync(`git add ${stagedFiles.join(" ")}`);
  console.log("Optimized and re-staged image files.");
} catch (error) {
  console.error("Error optimizing images:", error);
  process.exit(1);
}
