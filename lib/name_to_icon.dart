import 'package:vector_graphics/vector_graphics.dart';

import 'rules.g.dart';

AssetBytesLoader fileToIcon(String name) {
  final extension = _findExtension(name);
  return fileNames[name] ?? fileExtensions[extension] ?? file;
}

/// `/` as root folder
AssetBytesLoader directoryToIcon(String name, {bool isExpanded = false}) {
  if (name == '/') {
    return isExpanded ? rootFolderExpanded : rootFolder;
  }

  if (isExpanded) {
    return folderNamesExpanded[name] ?? folderExpanded;
  }
  return folderNames[name] ?? folder;
}

String _findExtension(String name) {
  return allExtensions
      .where(name.endsWith)
      .fold('', (best, ext) => ext.length > best.length ? ext : best);
}
