import { fileURLToPath } from "node:url";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

/** @type {import("next").NextConfig} */
const nextConfig = {
  outputFileTracingRoot: fileURLToPath(new URL(".", import.meta.url)),
  async redirects() {
    return [
      {
        source: "/services/media-relations",
        destination: "/services/public-relations",
        permanent: true,
      },
      {
        source: "/services/brand-strategy",
        destination: "/services/integrated-campaigns",
        permanent: true,
      },
      {
        source: "/services/consulting",
        destination: "/services/integrated-campaigns",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  experimental: { serverActions: { bodySizeLimit: "2mb" } },
};
// Keep production builds from replacing the chunks served by next dev.
export default function config(phase) {
  return {
    ...nextConfig,
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
  };
}
