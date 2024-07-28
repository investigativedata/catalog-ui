const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
  pageExtensions: ["mdx", "ts", "tsx"],
};

module.exports = withMDX(nextConfig);
