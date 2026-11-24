import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// This machine's network IPs, so other devices on the network can open the dev
// server by IP. `next dev` otherwise blocks its scripts for any origin but
// localhost, and the page loads without JavaScript.
const lanAddresses = Object.values(os.networkInterfaces())
  .flat()
  .filter((net) => net?.family === "IPv4" && !net.internal)
  .map((net) => net!.address);

const nextConfig: NextConfig = {
  allowedDevOrigins: lanAddresses,
  turbopack: {
    root: path.resolve(dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
    ],
  },
};

export default withPayload(nextConfig);
