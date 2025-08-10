import { basename, join } from 'path';
import { writeFileSync } from 'fs';

function toIconDefinition(iconName: string, iconPath: string) {
    const iconDefinition = (() => {
        const name = iconName.replace(/-/g, '_');
        // if the name starts with a digit, prefix it with "file_"
        return /^\d/.test(name) ? `file_${name}` : name;
    })();
    const iconFileName = basename(iconPath);
    return {
        iconDefinition,
        iconFileName,
    };
}

function toIconDefinitions(iconDefinitions: Record<string, {
    iconPath: string;
}>) {
    return Object.entries(iconDefinitions).map(([iconName, { iconPath }]) =>
        toIconDefinition(iconName, iconPath)
    );
}

function toFlutterEnumItem({ iconDefinition, iconFileName }: {
    iconDefinition: string;
    iconFileName: string;
}) {
    return `${iconDefinition}("${iconFileName}"),`;
}

function toFlutterEnum(iconDefinitions: {
    iconDefinition: string;
    iconFileName: string;
}[]) {
    return `
// ignore_for_file: constant_identifier_names

enum VsCodeIcon {
  ${iconDefinitions.map(toFlutterEnumItem).join('\n  ')};
  
  final String fileName;
  const VsCodeIcon(this.fileName);

  static VsCodeIcon fromFileName(String fileName) {
    return VsCodeIcon.values.firstWhere((icon) => icon.fileName == fileName);
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
