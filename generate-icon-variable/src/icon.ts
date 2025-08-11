import { basename } from 'path';
import { writeFileSync } from 'fs';

function toFlutterVariableName(iconId: string) {
    const name = iconId.replace(/-/g, '_');
    // if the name starts with a digit, prefix it with "num_"
    return /^\d/.test(name) ? `num_${name}` : name;
}

export function toFlutterMaterialIconsValue(iconId: string) {
    return `MaterialIcons.${toFlutterVariableName(iconId)}`;
}


function toIconDefinitions(iconDefinitions: Record<string, {
    iconPath: string;
}>) {
    return Object.entries(iconDefinitions).map(([iconId, { iconPath }]) =>
        ({id: iconId, path: basename(iconPath)})
    );
}

function toFlutterMaterialIconsItem({ id, path }: {
    id: string;
    path: string;
}) {
    return `static const ${toFlutterVariableName(id)} = AssetBytesLoader("assets/icons/${path}.vec", packageName: _packageName);`;
}

function toFlutterMaterialIcons(iconDefinitions: {
    id: string;
    path: string;
}[]) {
    return `
// dart format off
// ignore_for_file: constant_identifier_names

import 'package:vector_graphics/vector_graphics.dart';

const _packageName = "vscode_material_icon_theme";

abstract final class MaterialIcons {
  ${iconDefinitions.map(toFlutterMaterialIconsItem).join('\n  ')}
}
`;

}

export function generateFlutterMaterialIcons(path: string, iconDefinitions: Record<string, {
    iconPath: string;
}>) {
    const definitions = toIconDefinitions(iconDefinitions);
    const enumContent = toFlutterMaterialIcons(definitions);

    writeFileSync(path, enumContent.trim(), { flag: 'w' });
}
