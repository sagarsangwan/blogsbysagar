/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              // Base
              "default-src 'self'",

              // Scripts (Next.js + GA)
              "script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com",

              // API / analytics beacons
              "connect-src 'self' https://www.google-analytics.com",

              // Images (Next/Image + external blogs/CDNs)
              "img-src 'self' data: https:",

              // Styles (Next/font injects inline styles)
              "style-src 'self' 'unsafe-inline'",

              // Fonts
              "font-src 'self' https:",

              // Frames (GA / Tag Manager)
              "frame-src https://www.googletagmanager.com",

              // Transport security
              "upgrade-insecure-requests",
              "block-all-mixed-content",
            ].join("; "),
          },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [
      // Microlink previews
      {
        protocol: "https",
        hostname: "api.microlink.io",
      },

      // Google profile images (NO wildcards)
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh4.googleusercontent.com",
      },

      // Your domains
      {
        protocol: "https",
        hostname: "sagarsangwan.app",
      },

      // Blogs & content
      {
        protocol: "https",
        hostname: "cdn-images-1.medium.com",
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
      },
      {
        protocol: "https",
        hostname: "media2.dev.to",
      },

      // GitHub assets
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },

      // Google Drive images (if embedded)
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
    ],
  },
};

module.exports = nextConfig;
