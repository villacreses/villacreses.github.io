import fs from "fs";
import path from "path";
import { readFile, writeFile } from "fs/promises";
import { minify } from "terser";
import CleanCSS from "clean-css";

const walk = dir => fs.readdirSync(dir).flatMap(entry => {
  const fullPath = path.join(dir, entry);
  return fs.statSync(fullPath).isDirectory() ? walk(fullPath) : fullPath;
});

const minifyJS = async file =>  {
  const code = await readFile(file, "utf8");
  const result = await minify(code, {
    compress: true,
    mangle: { toplevel: true },
  });
  if (result.code) await writeFile(file, result.code);
  console.log(`Minified JS: ${file}`);
}

const minifyCSS = async file => {
  const code = await readFile(file, "utf8");
  const hasImport = code.includes("@import");
  if (!hasImport) {
    const output = new CleanCSS().minify(code);
    if (output.styles) await writeFile(file, output.styles);
    console.log(`Minified CSS: ${file}`);
  } else {
    console.log(`Skipped CSS with import: ${file}`);
  } 
}

(async () => {
  const minificationPromises = walk("_site")
    .filter(file => file.endsWith(".js") || file.endsWith(".css"))
    .map(async file => {
      try { 
        if (file.endsWith(".js")) return minifyJS(file);
        else if (file.endsWith(".css")) return minifyCSS(file);
      } catch (err) {
        console.error(`Error optimizing ${file}:`, err);
      }
    });
  
  await Promise.all(minificationPromises);
})();
