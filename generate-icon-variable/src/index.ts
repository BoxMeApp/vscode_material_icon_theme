import { generateManifest, availableIconPacks } from "material-icon-theme";
import { basename, join } from 'path';

import { UpdateAssets } from "./assets.js";
import { generateFlutterEnum } from "./definition.js";

const manifest = generateManifest();
// console.log(manifest);
// console.log(manifest.iconDefinitions);
// console.log(manifest.folderNames);

const currentDir = process.cwd();
console.log(`currentDir: ${currentDir}`);
const iconDistDir = `${currentDir}/node_modules/material-icon-theme/dist`;
console.log(`iconDistDir: ${iconDistDir}`);

function toRealIconPath(iconPath: string) {
  return join(iconDistDir, iconPath);
}

const iconRealPaths = Object.values(manifest.iconDefinitions ?? {}).map((icon) => toRealIconPath(icon.iconPath));

// console.log(iconRealPaths);

const flutterAssetsIconPaths = join(currentDir, '..', 'assets', 'icons');
console.log(`flutterAssetsIconPaths: ${flutterAssetsIconPaths}`);

UpdateAssets(iconRealPaths, flutterAssetsIconPaths);

const generateDefinitionPath = join(currentDir, '..', 'lib', 'vscode_icon.g.dart');

generateFlutterEnum(generateDefinitionPath, manifest.iconDefinitions!);
