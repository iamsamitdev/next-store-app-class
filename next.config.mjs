/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone', // export, standalone, browser, node
  // distDir: 'out',
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
  images: {
    dangerouslyAllowSVG: true,
    // domains: ['*', 'localhost', 'itgenius.co.th'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        pathname: '**',
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**",
      },
    ],
    minimumCacheTTL: 0, // 0 seconds
  },
}

export default nextConfig
