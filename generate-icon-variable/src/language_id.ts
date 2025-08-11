import { basename } from 'path';
import { writeFileSync } from 'fs';

function toFlutterVariableName(iconId: string) {
    const name = iconId.replace(/-/g, '_');
    // if the name starts with a digit, prefix it with "num_"
    return /^\d/.test(name) ? `num_${name}` : name;
}

export function toFlutterVSCodeLanguageIdValue(iconId: string) {
    return `VSCodeLanguageId.${toFlutterVariableName(iconId)}`;
}


function toFlutterEnumItem(id: string) {
    return `${toFlutterVariableName(id)}("${id}"),`;
}

function toFlutterEnumVSCodeLanguageId(languageIds: string[]) {
    return `
// dart format off
// ignore_for_file: constant_identifier_names

enum VSCodeLanguageId {
  ${languageIds.map(toFlutterEnumItem).join('\n  ')};

  final String id;
  const VSCodeLanguageId(this.id);

  static VSCodeLanguageId fromString(String str) {
    return VSCodeLanguageId.values.firstWhere((id) => id.id == str);
  }
}
`;

}

export function generateFlutterLanguageId(path: string, languageIds: string[]) {
    const enumContent = toFlutterEnumVSCodeLanguageId(languageIds);

    writeFileSync(path, enumContent.trim(), { flag: 'w' });
}
