import 'package:vector_graphics/vector_graphics.dart';

import 'rules.g.dart';
import 'language_id.g.dart';
import 'language_map.dart';

AssetBytesLoader fileToIcon(String name) {
  return fileNames[name] ??
      fileExtensions[_findExtension(name, allExtensions)] ??
      languageIds[_findLanguageId(name)] ??
      file;
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

String _findExtension<T extends Iterable<String>>(String name, T exts) {
  return exts
      .where(name.endsWith)
      .fold('', (best, ext) => ext.length > best.length ? ext : best);
}

VSCodeLanguageId? _findLanguageId(String name) {
  return filenameToLanguageId[name] ??
      extensionToLanguageId[_findExtension(name, allLanguageIdsExtension)];
}
