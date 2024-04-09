/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
};

export default nextConfig;
