export function fileNameToLabel(filename: string): string {
  const nameWithoutExtension = filename.replace(/\.[^.]+$/, '');

  return nameWithoutExtension
    .split(/[-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
