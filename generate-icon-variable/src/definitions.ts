import { basename, join } from 'path';
import { writeFileSync } from 'fs';

function toFlutterEnumName(iconId: string) {
    const name = iconId.replace(/-/g, '_');
    // if the name starts with a digit, prefix it with "file_"
    return /^\d/.test(name) ? `file_${name}` : name;
}

export function toFlutterEnumValue(iconId: string) {
    return `VSCodeIcon.${toFlutterEnumName(iconId)}`;
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

function toFlutterEnum(iconDefinitions: {
    id: string;
    path: string;
}[]) {
    return `
// ignore_for_file: constant_identifier_names

enum VSCodeIcon {
  ${iconDefinitions.map(toFlutterEnumItem).join('\n  ')};
  
  final String fileName;
  const VSCodeIcon(this.fileName);

  static VSCodeIcon fromFileName(String fileName) {
    return VSCodeIcon.values.firstWhere((icon) => icon.fileName == fileName);
  }
}
  `;
}

export function generateFlutterEnum(path: string, iconDefinitions: Record<string, {
    iconPath: string;
}>) {
    const definitions = toIconDefinitions(iconDefinitions);
    const enumContent = toFlutterEnum(definitions);

    writeFileSync(path, enumContent.trim(), { flag: 'w' });
}
