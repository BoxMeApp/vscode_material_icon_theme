import { toFlutterEnumValue } from "./icon.js";

import { type Manifest } from "material-icon-theme";
import { writeFileSync } from "fs";


function toFlutterRules(manifest: Manifest, importPath: string) {
  return `
import '${importPath}';
// dart format off
const file = ${toFlutterEnumValue(manifest.file!)};
const folder = ${toFlutterEnumValue(manifest.folder!)};
const folderExpanded = ${toFlutterEnumValue(manifest.folderExpanded!)};
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
const rootFolder = ${toFlutterEnumValue(manifest.rootFolder!)};
const rootFolderExpanded = ${toFlutterEnumValue(manifest.rootFolderExpanded!)};
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
${toFlutterMap(manifest.languageIds!)}
};
// dart format on
`;
}

function toFlutterMap(map: Record<string, string>) {
  return Object.entries(map)
    .map(([key, value]) => `  "${key}": ${toFlutterEnumValue(value)},`)
    .join("\n");
}

function toFlutterList(list: string[]) {
  return list.map(item => `  "${item}",`).join("\n");
}

function toFlutterFileExtension(extension: string) {
  return `.${extension}`;
}

export function generateFlutterRules(path: string, manifest: Manifest, importPath: string) {
  const content = toFlutterRules(manifest, importPath);
  writeFileSync(path, content.trim(), { flag: 'w' });
}
