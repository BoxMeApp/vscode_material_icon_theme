import 'package:path/path.dart' as p;

void main() {
  final filePath = 'path/to/your/file.dart';
  final name = p.basename(filePath);
  print('File name: $name'); // Outputs: file.dart
  final extension = p.extension(filePath);
  print('File extension: $extension'); // Outputs: .dart
}
