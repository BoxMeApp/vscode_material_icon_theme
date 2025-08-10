import { copyFileSync, existsSync, mkdirSync, rmSync } from 'fs';
import { basename, join } from 'path';

function CopyAssets(assetsPaths: string[], destPath: string) {
  if (!existsSync(destPath)) {
    mkdirSync(destPath, { recursive: true });
  }
  assetsPaths.forEach((assetPath) => {
    const fileName = basename(assetPath);
    const destFile = join(destPath, fileName);
    copyFileSync(assetPath, destFile);
  });
}

function ClearAssets(destPath: string) {
  if (existsSync(destPath)) {
    rmSync(destPath, { recursive: true, force: true });
  }
}


export function UpdateAssets(assetsPaths: string[], destPath: string) {
  ClearAssets(destPath);
  CopyAssets(assetsPaths, destPath);
}