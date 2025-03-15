/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all domains
      },
    ],
    dangerouslyAllowSVG: true, // (Optional) Allow SVGs if needed
    contentSecurityPolicy: "default-src 'self'; img-src *; media-src *; script-src 'none'; sandbox;", // (Optional) Security policy
  },
};

export default nextConfig;
