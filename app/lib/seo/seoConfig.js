// src/lib/seo/seoConfig.js

export const siteConfig = {
  name: "Whale Creek Construction",
  description:
    "Indianapolis general contractor specializing in home renovation, kitchen remodeling, custom millwork, and outdoor living spaces. Licensed, bonded, and insured.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://whalecreek.co",
  ogImage: "/images/whale-creek-og-image.jpg",
  creator: "Whale Creek Construction",

  // Business Information
  business: {
    name: "Whale Creek Construction",
    legalName: "Whale Creek Co",
    description:
      "Indianapolis general contractor providing comprehensive home renovation, kitchen remodeling, custom millwork, and outdoor living space construction. Professional residential general contractor serving the Indianapolis metro area.",
    phone: "+13174312449",
    email: "dave@whalecreek.co",

    // Address
    address: {
      streetAddress: "2659 Shelby Street",
      addressLocality: "Indianapolis",
      addressRegion: "Indiana",
      postalCode: "46203",
      addressCountry: "US",
    },

    // Coordinates
    geo: {
      latitude: 39.7287174,
      longitude: -86.1392312,
    },

    // Hours
    openingHours: "Mo,Tu,We,Th,Fr 09:00-17:00",
    priceRange: "$$",

    // Social Media
    sameAs: [
      "https://www.facebook.com/whalecreekco",
      "https://www.instagram.com/whalecreekco",
      "https://www.linkedin.com/company/whale-creek-construction",
    ],

    // Payment & Maps
    paymentAccepted: "Cash, Credit Card, Check",
    hasMap: "https://www.google.com/maps?cid=4556171808632496841",

    // Service Areas
    serviceAreas: [
      "Indianapolis, IN",
      "Carmel, IN",
      "Fishers, IN",
      "Noblesville, IN",
      "Westfield, IN",
      "Zionsville, IN",
      "Brownsburg, IN",
      "Avon, IN",
      "Plainfield, IN",
      "Greenwood, IN",
    ],
  },

  // Services offered - prioritized by keyword research
  services: [
    {
      name: "Home Renovation",
      description:
        "Complete home renovation services in Indianapolis, transforming existing spaces with expert craftsmanship and modern design.",
      category: "renovation",
      keywords: [
        "home renovation Indianapolis",
        "home remodeling Indianapolis",
        "residential renovation Indianapolis",
        "Indianapolis home renovation",
      ],
    },
    {
      name: "Kitchen Renovation",
      description:
        "Professional kitchen remodeling services including custom cabinetry, countertops, and complete kitchen renovations.",
      category: "kitchen",
      keywords: [
        "kitchen renovation Indianapolis",
        "kitchen remodeling Indianapolis",
        "custom kitchen cabinets",
        "Indianapolis kitchen remodel",
      ],
    },
    {
      name: "Custom Millwork",
      description:
        "Precision-crafted custom millwork including trim, moldings, cabinetry, and architectural details.",
      category: "millwork",
      keywords: [
        "custom millwork Indianapolis",
        "trim work",
        "architectural millwork",
        "custom cabinetry Indianapolis",
      ],
    },
    {
      name: "Outdoor Living Spaces",
      description:
        "Custom outdoor living spaces including decks, patios, pergolas, and outdoor kitchens.",
      category: "outdoor",
      keywords: [
        "outdoor living spaces Indianapolis",
        "deck builders Indianapolis",
        "patio construction Indianapolis",
        "pergola installation",
      ],
    },
    {
      name: "Residential Construction",
      description:
        "General contracting services for residential construction projects throughout the Indianapolis metro area.",
      category: "residential",
      keywords: [
        "Indianapolis residential general contractor",
        "residential construction Indianapolis",
        "home builder Indianapolis",
      ],
    },
    {
      name: "Design Consultation",
      description:
        "Professional design guidance to help you plan your renovation or construction project from concept to completion.",
      category: "design",
      keywords: [
        "design consultation Indianapolis",
        "renovation planning",
        "construction design services",
      ],
    },
  ],

  // Common keywords for content strategy (not for meta tags)
  keywords: [
    // Primary (High Volume / Low Difficulty)
    "Indianapolis general contractor",
    "home renovation Indianapolis",
    "kitchen renovation Indianapolis",

    // Secondary (Close Variants)
    "general contractors in indianapolis indiana",
    "indianapolis general contractors",
    "general contractors indianapolis",
    "Indianapolis residential general contractor",
    "residential general contractors indianapolis",

    // Supporting Services
    "custom millwork Indianapolis",
    "outdoor living spaces Indianapolis",
    "home remodeling Indianapolis",

    // Long-tail
    "Indianapolis home renovation contractor",
    "kitchen remodeling contractor Indianapolis",
    "residential construction Indianapolis",
    "custom deck builder Indianapolis",
    "Indianapolis general contracting services",
  ],

  // Default metadata for pages
  defaultMetadata: {
    robots: "index, follow",
    googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION,
    bingVerification: process.env.BING_SITE_VERIFICATION,

    // Open Graph defaults
    ogType: "website",
    ogLocale: "en_US",

    // Twitter defaults
    twitterCard: "summary_large_image",
    twitterSite: "@whalecreekco",
    twitterCreator: "@whalecreekco",
  },
};

// Page-specific SEO configurations - UPDATED for keyword research
export const pageConfigs = {
  home: {
    title:
      "Indianapolis General Contractor | Home Renovation & Kitchen Remodeling | Whale Creek Construction",
    description:
      "Trusted Indianapolis general contractor specializing in home renovation, kitchen remodeling, custom millwork, and outdoor living spaces. Licensed, bonded, insured. Serving Indianapolis, Carmel, Fishers, and surrounding areas.",
    canonical: "/",
  },

  about: {
    title:
      "About Us | Indianapolis General Contractor | Whale Creek Construction",
    description:
      "Learn about Whale Creek Construction, Indianapolis' trusted general contractor for home renovation, kitchen remodeling, and custom construction projects. Family-owned, locally operated.",
    canonical: "/about",
  },

  services: {
    title:
      "Construction Services | Indianapolis General Contractor | Home Renovation",
    description:
      "Comprehensive construction services from Indianapolis general contractors. Home renovation, kitchen remodeling, custom millwork, and outdoor living spaces. Free estimates.",
    canonical: "/services",
  },

  gallery: {
    title:
      "Home Renovation Projects | Portfolio | Indianapolis General Contractor",
    description:
      "View completed home renovation and kitchen remodeling projects by Whale Creek Construction. Indianapolis general contractor portfolio featuring custom millwork and outdoor living spaces.",
    canonical: "/project-gallery",
  },

  contact: {
    title:
      "Contact Indianapolis General Contractor | Free Estimates | Whale Creek Construction",
    description:
      "Contact Whale Creek Construction for your home renovation or kitchen remodeling project. Indianapolis general contractor offering free estimates. Call (317) 431-2449.",
    canonical: "/contact",
  },

  blog: {
    title:
      "Home Renovation Blog | Indianapolis General Contractor Tips & Insights",
    description:
      "Expert home renovation and construction advice from Indianapolis general contractors. Tips on kitchen remodeling, custom millwork, and outdoor living projects.",
    canonical: "/blog",
  },
};

// Structured data templates
export const structuredDataTemplates = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.business.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/whale-creek-logo.png`,
    sameAs: siteConfig.business.sameAs,
  },

  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
};
