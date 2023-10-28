export default function generateImagePaths(basePath: string, start: number, end: number): string[] {
    return Array.from({ length: end - start + 1 }, (_, i) => `${basePath}${i + start}.jpg`);
}