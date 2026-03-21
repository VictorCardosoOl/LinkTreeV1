/**
 * @fileoverview Script de compressão de imagens para produção.
 * Converte Avatar1.jpeg → avatar.webp (formato WebP, qualidade 82%)
 * 
 * Uso: node scripts/compress-images.mjs
 */

import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ASSETS = join(ROOT, 'assets');

const tasks = [
  {
    input: join(ASSETS, 'Avatar1.jpeg'),
    output: join(ASSETS, 'avatar.webp'),
    label: 'Avatar → avatar.webp',
    options: { width: 840, format: 'webp', quality: 82 },
  },
  {
    input: join(ASSETS, 'Avatar1.jpeg'),
    output: join(ASSETS, 'icon-192.png'),
    label: 'Avatar → icon-192.png (PWA)',
    options: { width: 192, height: 192, format: 'png', fit: 'cover' },
  },
  {
    input: join(ASSETS, 'Avatar1.jpeg'),
    output: join(ASSETS, 'icon-512.png'),
    label: 'Avatar → icon-512.png (PWA)',
    options: { width: 512, height: 512, format: 'png', fit: 'cover' },
  },
];

async function compress({ input, output, label, options }) {
  if (!existsSync(input)) {
    console.warn(`⚠️  Input não encontrado, pulando: ${input}`);
    return;
  }

  const { format, quality, width, height, fit } = options;

  let pipeline = sharp(input).resize(width, height ?? null, { fit: fit ?? 'inside', withoutEnlargement: true });

  if (format === 'webp') {
    pipeline = pipeline.webp({ quality: quality ?? 80 });
  } else if (format === 'png') {
    pipeline = pipeline.png({ compressionLevel: 9 });
  }

  await pipeline.toFile(output);

  const { size: inputSize } = await import('fs').then(m => m.promises.stat(input));
  const { size: outputSize } = await import('fs').then(m => m.promises.stat(output));
  const reduction = (((inputSize - outputSize) / inputSize) * 100).toFixed(1);

  console.log(
    `✅ ${label}\n   ${(inputSize / 1024).toFixed(0)}KB → ${(outputSize / 1024).toFixed(0)}KB (−${reduction}%)`
  );
}

console.log('🖼️  Comprimindo imagens...\n');
for (const task of tasks) {
  await compress(task);
}
console.log('\n✨ Pronto!');
