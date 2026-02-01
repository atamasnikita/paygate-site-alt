/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages requires a fully static site.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true }
};

export default nextConfig;
