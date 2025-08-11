import { toFlutterEnumValue } from "./icon.js";
import { writeFileSync } from "fs";

function toFlutterExample(iconIds: string[]) {
  return `
import 'package:vscode_material_icon_theme/vscode_material_icon_theme.dart';

// dart format off
const allIcons = [
  ${iconIds.map(iconId => `${toFlutterEnumValue(iconId)}`).join(",\n  ")}
];
`;
}

export function generateFlutterExample(iconIds: string[], path: string) {
  const content = toFlutterExample(iconIds);
  writeFileSync(path, content.trim(), { flag: 'w' });
}