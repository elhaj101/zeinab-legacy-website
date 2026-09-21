/**
 * next/image with `unoptimized: true` passes `src` through untouched — it
 * does NOT apply `basePath`. On the GitHub Pages preview build that turns
 * every image into a 404 while the build still reports success. Prefix them
 * by hand. Must match `basePath` in next.config.ts (empty for the normal
 * server build, where no prefix is needed). Same fix as el-haj-international
 * hit first — see that repo's src/lib/asset.ts.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true" ? "/zeinab-legacy-website" : "";

export const asset = (path: string) => `${BASE_PATH}${path}`;
