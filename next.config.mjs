/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
};

export default nextConfig;
