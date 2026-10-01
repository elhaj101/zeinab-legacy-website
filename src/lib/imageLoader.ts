/**
 * next/image loader for a site without an image server (GitHub Pages, static export).
 *
 * The portraits are pre-resized to WebP at the widths below (public/images/<name>-<width>.webp,
 * made from the original JPGs with ImageMagick), so a phone downloads a ~30 KB file instead of the
 * 150 KB original. Any other image (the logo) is returned unchanged. `src` already carries the
 * basePath via asset(), so nothing is prefixed here.
 *
 * To add a photo: drop the JPG in public/images, add its name to RESIZED, and run
 *   for w in 640 828 1080 1366; do magick <name>.jpg -resize "${w}x>" -quality 78 <name>-$w.webp; done
 */
const WIDTHS = [640, 828, 1080, 1366];
const RESIZED = ["seinab-portrait-close", "seinab-portrait-full"];

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const match = src.match(/^(.*\/)([^/]+)\.jpg$/);
  if (!match || !RESIZED.includes(match[2])) return src;
  const w = WIDTHS.find((x) => x >= width) ?? WIDTHS[WIDTHS.length - 1];
  return `${match[1]}${match[2]}-${w}.webp`;
}
