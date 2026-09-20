import type { NextConfig } from "next";

// Deliberately NOT a static export (contrast with el-haj-international's
// GitHub Pages setup). This site needs a real server: the application form
// posts to an API route, and a future self-edit CMS / booking / payment
// backend will need server-side code too. Hosting target is undecided —
// depends on accounts that don't exist yet in Zeinab's name — so nothing
// here assumes Vercel, GitHub Pages, or anywhere else.
const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
};

export default nextConfig;
