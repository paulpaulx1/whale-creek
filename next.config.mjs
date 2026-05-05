/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/indianapolis-cnc",
        destination: "/indianapolis-general-contractor",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/project-gallery",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/indianapolis-woodworker-contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
