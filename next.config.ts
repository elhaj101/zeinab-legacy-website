import type { NextConfig } from "next";

// Real hosting (Vercel or similar, with the /api/apply route working) is
// still undecided — depends on accounts that don't exist yet in Zeinab's
// name. NEXT_PUBLIC_STATIC_EXPORT=true switches to a GitHub Pages static
// export instead, same approach as el-haj-international, ONLY for a
// temporary preview under Ali's own GitHub account (see
// .github/workflows/deploy.yml and src/config/deployment.ts) — the API
// route doesn't exist in that build, so ApplicationForm falls back to a
// mailto link instead of posting to it. Default (unset) stays a normal
// server build for `next dev`/`next start`/real hosting.
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
const basePath = isStaticExport ? "/zeinab-legacy-website" : undefined;

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  // Photos come pre-resized as WebP (see src/lib/imageLoader.ts): works the same with or without
  // an image server, and phones get files sized for their screen.
  images: {
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
    deviceSizes: [640, 828, 1080, 1366],
    imageSizes: [64, 128, 256],
  },
  ...(isStaticExport && {
    output: "export",
    basePath,
    assetPrefix: basePath,
    trailingSlash: true,
  }),
};

export default nextConfig;
