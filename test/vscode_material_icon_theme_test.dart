import 'package:flutter_test/flutter_test.dart';

import 'package:vscode_material_icon_theme/vscode_material_icon_theme.dart';

void main() {
  test('file', () {
    expect(fileToIcon('main.dart'), MaterialIcons.dart);

    expect(fileToIcon('index.test.js'), MaterialIcons.test_js);
  });

  test('directory', () {
    expect(directoryToIcon('lib', isExpanded: false), MaterialIcons.folder_lib);
    expect(
      directoryToIcon('lib', isExpanded: true),
      MaterialIcons.folder_lib_open,
    );
  });
}
