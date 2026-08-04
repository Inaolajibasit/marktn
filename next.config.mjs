/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // All images are served locally from /public/images — no remote
    // patterns needed. Add one here if you later move images to a CDN.
  },
  experimental: {
    serverActions: { bodySizeLimit: "2mb" },
  },
};
export default nextConfig;
