/// <reference path="node_modules/@citizenfx/server/index.d.ts" />
const chokidar = require('chokidar');
const { parse, extname } = require('path');

chokidar.watch('resources').on('change', (path) => {
  if (!['.dll', '.js', '.lua'].includes(extname(path))) return; //? ensure the filetype matches one of the three default extensions
  const parsedPath = parse(path);
  const resourceFromPath = parsedPath.dir.split('\\');
  const foundRes = resourceFromPath.find((path) => GetResourcePath(path) !== null);
  if (GetCurrentResourceName() === foundRes) return; //? Make sure that the resource we want to restart isn't ourself
  ExecuteCommand(`ensure ${foundRes}`);
  console.log(`\n^4[File Changed (^5${parsedPath.base}^4)] ^6Restarted "${foundRes}"^7\n`);
});