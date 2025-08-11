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
  return allExtensions.firstWhere(
    (ext) => name.endsWith(ext),
    orElse: () => '',
  );
}
