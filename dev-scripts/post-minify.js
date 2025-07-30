import fs from "fs";
import path from "path";
import { readFile, writeFile } from "fs/promises";
import { minify } from "terser";
import CleanCSS from "clean-css";

const walk = dir => fs.readdirSync(dir).flatMap(entry => {
  const fullPath = path.join(dir, entry);
  return fs.statSync(fullPath).isDirectory() ? walk(fullPath) : fullPath;
});

const containsImport = async filePath => {
  const content = await readFile(filePath, "utf8");
  return content.includes("@import");
};

(async () => {
  const files = walk("_site");

  for (const file of files) {
    try {
      if (file.endsWith(".js")) {
        const code = await readFile(file, "utf8");
        const result = await minify(code, {
          compress: true,
          mangle: { toplevel: true },
        });
        if (result.code) await writeFile(file, result.code);
        console.log(`Minified JS: ${file}`);
      }

      if (file.endsWith(".css")) {
        const hasImport = await containsImport(file);
        if (!hasImport) {
          const code = await readFile(file, "utf8");
          const output = new CleanCSS().minify(code);
          if (output.styles) await writeFile(file, output.styles);
          console.log(`Minified CSS: ${file}`);
        } else {
          console.log(`Skipped CSS with import: ${file}`);
        }
      }

    } catch (err) {
      console.error(`Error optimizing ${file}:`, err);
    }
  }
})();
