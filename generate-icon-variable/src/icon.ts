import { basename } from 'path';
import { writeFileSync } from 'fs';

function toFlutterEnumName(iconId: string) {
    const name = iconId.replace(/-/g, '_');
    // if the name starts with a digit, prefix it with "num_"
    return /^\d/.test(name) ? `num_${name}` : name;
}

export function toFlutterEnumValue(iconId: string) {
    return `MaterialIcons.${toFlutterEnumName(iconId)}`;
}


function toIconDefinitions(iconDefinitions: Record<string, {
    iconPath: string;
}>) {
    return Object.entries(iconDefinitions).map(([iconId, { iconPath }]) =>
        ({id: iconId, path: basename(iconPath)})
    );
}

function toFlutterEnumItem({ id, path }: {
    id: string;
    path: string;
}) {
    return `${toFlutterEnumName(id)}("${path}"),`;
}

function toFlutterIconItem({ id, path }: {
    id: string;
    path: string;
}) {
    return `static const ${toFlutterEnumName(id)} = AssetBytesLoader("assets/icons/${path}.vec", packageName: _packageName);`;
}

function toFlutterEnum(iconDefinitions: {
    id: string;
    path: string;
}[]) {
    return `
// dart format off
// ignore_for_file: constant_identifier_names

import 'package:vector_graphics/vector_graphics.dart';

const _packageName = "vscode_material_icon_theme";

abstract final class MaterialIcons {
  ${iconDefinitions.map(toFlutterIconItem).join('\n  ')}
}

// enum VSCodeIcon {
//   ${iconDefinitions.map(toFlutterEnumItem).join('\n//  ')};
  
//   final String fileName;
//   const VSCodeIcon(this.fileName);

//   static VSCodeIcon fromFileName(String fileName) {
//     return VSCodeIcon.values.firstWhere((icon) => icon.fileName == fileName);
//   }
// }
`;

}

export function generateFlutterEnum(path: string, iconDefinitions: Record<string, {
    iconPath: string;
}>) {
    const definitions = toIconDefinitions(iconDefinitions);
    const enumContent = toFlutterEnum(definitions);

    writeFileSync(path, enumContent.trim(), { flag: 'w' });
}
