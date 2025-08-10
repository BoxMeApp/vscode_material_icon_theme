import { copyFileSync, existsSync, mkdirSync, rmSync } from 'fs';
import { basename, join } from 'path';
import { execSync } from 'child_process';

function copyAssets(assetsPaths: string[], destPath: string) {
  if (!existsSync(destPath)) {
    mkdirSync(destPath, { recursive: true });
  }
  assetsPaths.forEach((assetPath) => {
    const fileName = basename(assetPath);
    const destFile = join(destPath, fileName);
    copyFileSync(assetPath, destFile);
  });
}

function clearAssets(destPath: string) {
  if (existsSync(destPath)) {
    rmSync(destPath, { recursive: true, force: true });
  }
}


export function updateAssets(assetsPaths: string[], destPath: string) {
  clearAssets(destPath);
  copyAssets(assetsPaths, destPath);
}

function reportAssetAboutVec(inputDir: string, outputDir: string, workspacePath: string) {
  // execute: https://pub.dev/packages/flutter_svg
  // dart run vector_graphics_compiler -i $SVG_FILE -o $TEMPORARY_OUTPUT_TO_BE_DELETED --no-optimize-masks --no-optimize-clips --no-optimize-overdraw --no-tessellate
  // workspace: ${workspacePath}
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  try {
    execSync(
      `dart run vector_graphics_compiler --input-dir "${inputDir}" --out-dir "${outputDir}" --no-optimize-masks --no-optimize-clips --no-optimize-overdraw --no-tessellate`,
      { stdio: 'inherit', cwd: workspacePath }
    );
  } catch (error) {
    console.error('Error executing vector_graphics_compiler:', error);
  }
}

function generateAssetVec(inputDir: string, outputDir: string, workspacePath: string) {
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  try {
    execSync(
      `dart run vector_graphics_compiler --input-dir "${inputDir}" --out-dir "${outputDir}"`,
      { stdio: 'inherit', cwd: workspacePath }
    );
  } catch (error) {
    console.error('Error executing vector_graphics_compiler:', error);
  }
}

export function updateAssetsVec(assetsDir: string, destPath: string, logPath: string, workspacePath: string) {
  clearAssets(destPath);

  reportAssetAboutVec(assetsDir, logPath, workspacePath);
  generateAssetVec(assetsDir, destPath, workspacePath);
}