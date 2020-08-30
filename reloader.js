/// <reference path="node_modules/@citizenfx/server/index.d.ts" />
const chokidar = require("chokidar");
const { parse, extname } = require("path");

const removeFileName = dirname => parse(dirname).dir;

chokidar.watch("resources").on("change", (path) => {
  if (![".dll", ".js", ".lua"].includes(extname(path))) return; //? ensure the filetype matches one of the three default extensions
  const resourceFromPath = removeFileName(path).replace("resources\\", "");
  if (GetCurrentResourceName() === resourceFromPath) return; //? Make sure that the resource we want to restart isn't ourself
  ExecuteCommand(`ensure ${resourceFromPath}`);
  console.log(`^4[File Changed] ^6Restarted ${resourceFromPath}^7`);
});