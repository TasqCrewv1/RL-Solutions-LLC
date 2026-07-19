import type { ProcessedFile } from '../types';
import { uploadConfig } from '../config/upload';

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const MAX_DIMENSION = uploadConfig.compressionOptions.maxWidthOrHeight ?? 1600;
const TARGET_SIZE_MB = uploadConfig.compressionOptions.maxSizeMB ?? 1;

function isImage(type: string): boolean {
  return IMAGE_TYPES.includes(type);
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = src;
  });
}

async function compressImage(file: File): Promise<File> {
  if (file.size <= TARGET_SIZE_MB * 1024 * 1024) return file;

  const dataUrl = await readFileAsDataURL(file);
  const img = await loadImage(dataUrl);

  let { width, height } = img;
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return file;
  ctx.drawImage(img, 0, 0, width, height);

  const outType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
  const quality = outType === 'image/jpeg' ? 0.82 : 1;
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, outType, quality),
  );
  if (!blob) return file;

  return new File([blob], file.name, { type: outType, lastModified: Date.now() });
}

export async function processFiles(files: File[]): Promise<ProcessedFile[]> {
  const result: ProcessedFile[] = [];
  for (const file of files) {
    if (file.size > uploadConfig.maxSizeMb * 1024 * 1024) {
      throw new Error(`${file.name} exceeds the ${uploadConfig.maxSizeMb}MB limit`);
    }
    if (!uploadConfig.accept.includes(file.type)) {
      throw new Error(`${file.name} is not an accepted file type`);
    }
    const image = isImage(file.type);
    let processed: File = file;
    if (image) {
      try {
        processed = await compressImage(file);
      } catch {
        processed = file;
      }
    }
    const dataUrl = await readFileAsDataURL(processed);
    result.push({
      id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 8)}`,
      name: file.name,
      type: file.type,
      size: processed.size,
      previewUrl: image ? dataUrl : undefined,
      base64: dataUrl,
      isImage: image,
    });
  }
  return result;
}

export function removeFile(files: ProcessedFile[], id: string): ProcessedFile[] {
  return files.filter((f) => f.id !== id);
}

export const fileUploadService = { processFiles, removeFile };
