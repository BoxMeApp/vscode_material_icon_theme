import { generateManifest, availableIconPacks } from "material-icon-theme";
import { basename, join } from 'path';

import { updateAssetsVec } from "./assets.js";
import { generateFlutterEnum } from "./definitions.js";
import { generateFlutterRules } from "./rules.js";
import { generateFlutterExample } from "./example.js";

const manifest = generateManifest();
// console.log(manifest);
// console.log(manifest.iconDefinitions);
// console.log(manifest.folderNames);
// console.log(manifest.fileExtensions);

const currentDir = process.cwd();
console.log(`currentDir: ${currentDir}`);
const iconDistDir = join(currentDir, 'node_modules', 'material-icon-theme', 'dist');
const iconDir = join(currentDir, 'node_modules', 'material-icon-theme', 'icons');
console.log(`iconDistDir: ${iconDistDir}`);

function toRealIconPath(iconPath: string) {
  return join(iconDistDir, iconPath);
}

const iconRealPaths = Object.values(manifest.iconDefinitions ?? {}).map((icon) => toRealIconPath(icon.iconPath));

// console.log(iconRealPaths);
const flutterWorkspacePath = join(currentDir, '..');
const flutterAssetsIconPaths = join(flutterWorkspacePath, 'assets', 'icons');
console.log(`flutterAssetsIconPaths: ${flutterAssetsIconPaths}`);
const flutterAssetsVecLogPath = join(currentDir, 'logs');
updateAssetsVec(iconDir, flutterAssetsIconPaths, flutterAssetsVecLogPath, flutterWorkspacePath);

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

const flutterRulesPath = join(flutterWorkspacePath, 'lib', 'rules.g.dart');

generateFlutterRules(flutterRulesPath, manifest, 'icon.g.dart');

const flutterExamplePath = join(flutterWorkspacePath, 'example',
  'lib', 'all.g.dart');

generateFlutterExample(Object.keys(manifest.iconDefinitions!), flutterExamplePath);
