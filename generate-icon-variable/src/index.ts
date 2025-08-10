import { generateManifest, availableIconPacks } from "material-icon-theme";
import { basename, join } from 'path';

import { UpdateAssets } from "./assets.js";
import { generateFlutterEnum } from "./definitions.js";
import { generateFlutterRules } from "./rules.js";

const manifest = generateManifest();
// console.log(manifest);
// console.log(manifest.iconDefinitions);
// console.log(manifest.folderNames);
// console.log(manifest.fileExtensions);

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

const generateDefinitionPath = join(currentDir, '..', 'lib', 'icon.g.dart');

generateFlutterEnum(generateDefinitionPath, manifest.iconDefinitions!);

// file?: string;
console.log(`file: ${manifest.file}`);
// folder?: string;
console.log(`folder: ${manifest.folder}`);
// folderExpanded?: string;
console.log(`folderExpanded: ${manifest.folderExpanded}`);
// folderNames?: Record<string, string>;
// folderNamesExpanded?: Record<string, string>;
// rootFolderNames?: Record<string, string>;
// rootFolderNamesExpanded?: Record<string, string>;
// rootFolder?: string;
console.log(`rootFolder: ${manifest.rootFolder}`);
// rootFolderExpanded?: string;
// fileExtensions?: Record<string, string>;
// fileNames?: Record<string, string>;
// languageIds?: Record<string, string>;
// iconDefinitions?: Record<string, {
//     iconPath: string;
// }>;
// light?: Manifest;
// highContrast?: Manifest;
// hidesExplorerArrows?: boolean;

const flutterRulesPath = join(currentDir, '..', 'lib', 'rules.g.dart');

generateFlutterRules(flutterRulesPath, manifest, 'icon.g.dart');
