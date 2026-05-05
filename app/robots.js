// src/app/robots.js

const SITE_URL = "https://www.whalecreek.co";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}