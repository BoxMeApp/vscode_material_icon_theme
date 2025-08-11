import { toFlutterMaterialIconsValue } from "./icon.js";

import { type Manifest } from "material-icon-theme";
import { writeFileSync } from "fs";
import { toFlutterVSCodeLanguageIdValue } from "./language_id.js";


function toFlutterRules(manifest: Manifest, iconLib: string, languageIdLib: string) {
  return `
import '${iconLib}';
import '${languageIdLib}';
// dart format off
const file = ${toFlutterMaterialIconsValue(manifest.file!)};
const folder = ${toFlutterMaterialIconsValue(manifest.folder!)};
const folderExpanded = ${toFlutterMaterialIconsValue(manifest.folderExpanded!)};
const folderNames = {
${toFlutterMap(manifest.folderNames!)}
};
const folderNamesExpanded = {
${toFlutterMap(manifest.folderNamesExpanded!)}
};
// const rootFolderNames = {
// ${toFlutterMap(manifest.rootFolderNames!)}
// };
// const rootFolderNamesExpanded = {
// ${toFlutterMap(manifest.rootFolderNamesExpanded!)}
// };
const rootFolder = ${toFlutterMaterialIconsValue(manifest.rootFolder!)};
const rootFolderExpanded = ${toFlutterMaterialIconsValue(manifest.rootFolderExpanded!)};
const fileExtensions = {
${toFlutterMap(Object.fromEntries(Object.entries(manifest.fileExtensions!).map(([key, value]) => [toFlutterFileExtension(key), value])))}
};
const allExtensions = [
${toFlutterList(Object.keys(manifest.fileExtensions!).map(toFlutterFileExtension))}
];
const fileNames = {
${toFlutterMap(manifest.fileNames!)}
};
const languageIds = {
${toFlutterLanguageIdsMap(manifest.languageIds!)}
};
// dart format on
`;
}

function toFlutterMap(map: Record<string, string>) {
  return Object.entries(map)
    .map(([key, value]) => `  "${key}": ${toFlutterMaterialIconsValue(value)},`)
    .join("\n");
}

function toFlutterLanguageIdsMap(map: Record<string, string>) {
  return Object.entries(map)
    .map(([key, value]) => `  ${toFlutterVSCodeLanguageIdValue(key)}: ${toFlutterMaterialIconsValue(value)},`)
    .join("\n");
}

function toFlutterList(list: string[]) {
  return list.map(item => `  "${item}",`).join("\n");
}

function toFlutterFileExtension(extension: string) {
  return `.${extension}`;
}

export function generateFlutterRules(path: string, manifest: Manifest, iconLib: string, languageIdLib: string) {
  const content = toFlutterRules(manifest, iconLib, languageIdLib);
  writeFileSync(path, content.trim(), { flag: 'w' });
}
