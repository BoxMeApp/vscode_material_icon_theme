import 'rules.g.dart';
import 'icon.g.dart';

VSCodeIcon fileToIcon(String name) {
  final extension = _findExtension(name);
  return fileNames[name] ?? fileExtensions[extension] ?? file;
}

VSCodeIcon directoryToIcon(String name, bool isExpanded) {
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
