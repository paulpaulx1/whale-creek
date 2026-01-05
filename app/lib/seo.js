// lib/seo.js - SEO utility functions for server-side generation

// Base business information
export const businessInfo = {
  name: "Whale Creek Construction",
  alternateName: "Whale Creek Co",
  description:
    "Indianapolis general contractor providing comprehensive home renovation, kitchen remodeling, custom millwork, and outdoor living space construction. Professional residential general contractor serving the Indianapolis metro area.",
  phone: "+13174312449",
  email: "dave@whalecreek.co",
  address: {
    street: "2659 Shelby Street",
    city: "Indianapolis",
    state: "Indiana",
    zip: "46203",
  },
  geo: {
    latitude: 39.7287174,
    longitude: -86.1392312,
  },
  socialLinks: [
    "https://www.facebook.com/whalecreekco",
    "https://www.instagram.com/whalecreekco",
  ],
};

// Helper function to generate service areas from dynamic location data
export function generateServiceAreas(serviceAreas = []) {
  if (serviceAreas.length === 0) {
    return [
      {
        "@type": "City",
        name: "Indianapolis",
        sameAs: "https://en.wikipedia.org/wiki/Indianapolis",
      },
    ];
  }

  return serviceAreas
    .filter((location) => location && location.trim())
    .map((location) => {
      const cityName = location.split(",")[0].trim();

      return {
        "@type": "City",
        name: cityName,
        sameAs: `https://en.wikipedia.org/wiki/${cityName.replace(/\s+/g, "_")}`,
      };
    })
    .filter(
      (area, index, self) =>
        index ===
        self.findIndex((a) => a.name.toLowerCase() === area.name.toLowerCase())
    );
}

// Generate blog post SEO data
export function generateBlogSEO(post, serviceAreas = []) {
  const title =
    post?.seoTitle ||
    `${post?.title} | Indianapolis General Contractor Blog | Whale Creek Construction`;

  const description =
    post?.seoDescription ||
    post?.excerpt ||
    `${post?.title} - Expert insights on home renovation, kitchen remodeling, custom millwork, and outdoor living spaces from Indianapolis general contractors.`;

  const categoryKeywords = {
    millwork:
      "custom millwork Indianapolis, architectural millwork, trim work Indianapolis",
    renovation:
      "home renovation Indianapolis, kitchen renovation, residential remodeling",
    tips: "construction tips Indianapolis, home improvement advice, renovation techniques",
    spotlights:
      "Indianapolis home renovation projects, custom builds, outdoor living showcase",
    news: "Indianapolis construction news, renovation industry updates",
    "behind-scenes":
      "Indianapolis general contractors, construction process, craftsmanship",
    tools:
      "construction tools, renovation equipment, contractor recommendations",
  };

  const keywords = [
    "Indianapolis general contractor",
    "home renovation Indianapolis",
    "kitchen renovation Indianapolis",
    "outdoor living spaces Indianapolis",
    "custom millwork Indianapolis",
    categoryKeywords[post?.category] || "Indianapolis contractors",
    ...(post?.tags || []),
  ].join(", ");

  return { title, description, keywords };
}

// Generate project gallery SEO data
export function generateGallerySEO(projects = [], serviceAreas = []) {
  const projectCount = projects.length;
  const categories = [
    ...new Set(projects.map((p) => p.category).filter(Boolean)),
  ];
  const locations = [
    ...new Set(projects.map((p) => p.location).filter(Boolean)),
  ];

  const title = `Home Renovation Projects | ${projectCount} Completed Projects | Indianapolis General Contractor`;

  const description = `View ${projectCount} completed home renovation and kitchen remodeling projects by Indianapolis general contractors. Portfolio featuring custom millwork and outdoor living spaces in ${locations.slice(0, 3).join(", ")}.`;

  const keywords = [
    "home renovation portfolio Indianapolis",
    "Indianapolis general contractor projects",
    "kitchen remodel examples",
    "custom millwork projects",
    "outdoor living spaces portfolio",
    ...categories.map((cat) => `${cat} projects Indianapolis`),
    ...locations.map((loc) => `${loc.split(",")[0]} construction`),
  ].join(", ");

  return { title, description, keywords };
}

// Generate default page SEO data
export function generatePageSEO(fallback = {}) {
  const defaults = {
    title:
      "Indianapolis General Contractor | Home Renovation & Kitchen Remodeling | Whale Creek Construction",
    description:
      "Trusted Indianapolis general contractor specializing in home renovation, kitchen remodeling, custom millwork, and outdoor living spaces. Licensed, bonded, insured. Serving Indianapolis, Carmel, Fishers, and surrounding areas.",
    keywords: "",
  };

  return {
    title: fallback.title || defaults.title,
    description: fallback.description || defaults.description,
    keywords: fallback.keywords || defaults.keywords,
  };
}

// Generate base LocalBusiness schema
export function generateBaseSchema(serviceAreas = []) {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": "https://whalecreek.co/#business",
    name: businessInfo.name,
    alternateName: businessInfo.alternateName,
    description: businessInfo.description,
    url: "https://whalecreek.co",
    telephone: businessInfo.phone,
    email: businessInfo.email,
    priceRange: "$$-$$$",
    image: "https://whalecreek.co/public/images/WhaleLogoNew.png",
    logo: {
      "@type": "ImageObject",
      url: "https://whalecreek.co/public/images/WhaleLogoNew.png",
      width: "200",
      height: "200",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: businessInfo.address.street,
      addressLocality: businessInfo.address.city,
      addressRegion: businessInfo.address.state,
      postalCode: businessInfo.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: businessInfo.geo.latitude,
      longitude: businessInfo.geo.longitude,
    },
    areaServed: generateServiceAreas(serviceAreas),
    openingHours: [
      "Mo 09:00-17:00",
      "Tu 09:00-17:00",
      "We 09:00-17:00",
      "Th 09:00-17:00",
      "Fr 09:00-17:00",
    ],
    sameAs: businessInfo.socialLinks,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "12",
      bestRating: "5",
      worstRating: "5",
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Licensed General Contractor",
        credentialCategory: "Professional License",
      },
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Home Renovation & Remodeling",
          description:
            "Complete home renovation and remodeling services transforming residential spaces with expert craftsmanship.",
          category: "Construction Services",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Kitchen Renovation & Remodeling",
          description:
            "Professional kitchen renovation including custom cabinetry, countertops, and complete kitchen remodels.",
          category: "Construction Services",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Millwork & Architectural Trim",
          description:
            "Expert custom millwork, architectural trim, moldings, and precision woodworking.",
          category: "Construction Services",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Outdoor Living Spaces & Deck Construction",
          description:
            "Custom outdoor living spaces, deck construction, patio building, and outdoor entertainment areas.",
          category: "Construction Services",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Residential Construction",
          description:
            "General contracting services for residential construction projects throughout the Indianapolis metro area.",
          category: "Construction Services",
        },
      },
    ],
  };
}

// Generate blog post schema
export function generateBlogSchema(post, currentUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${currentUrl}#article`,
    headline: post.title,
    alternativeHeadline: post.seoTitle,
    description: post.excerpt,
    image: {
      "@type": "ImageObject",
      url:
        post.featuredImage?.asset?.url ||
        "https://whalecreek.co/public/images/WhaleLogoNew.png",
      width: post.featuredImage?.asset?.metadata?.dimensions?.width || 1200,
      height: post.featuredImage?.asset?.metadata?.dimensions?.height || 630,
    },
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    author: {
      "@type": "Organization",
      name: businessInfo.name,
      "@id": "https://whalecreek.co/#business",
    },
    publisher: {
      "@type": "Organization",
      name: businessInfo.name,
      logo: {
        "@type": "ImageObject",
        url: "https://whalecreek.co/public/images/WhaleLogoNew.png",
      },
      "@id": "https://whalecreek.co/#business",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": currentUrl,
    },
    about: [
      {
        "@type": "Thing",
        name: "Construction",
        sameAs: "https://en.wikipedia.org/wiki/Construction",
      },
      {
        "@type": "Thing",
        name: "Home Renovation",
        sameAs: "https://en.wikipedia.org/wiki/Home_improvement",
      },
      {
        "@type": "Place",
        name: "Indianapolis",
        sameAs: "https://en.wikipedia.org/wiki/Indianapolis",
      },
    ],
    articleSection: post.category,
    wordCount: post.readingTime ? post.readingTime * 200 : undefined,
    timeRequired: post.readingTime ? `PT${post.readingTime}M` : undefined,
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };
}

// Generate project gallery schema
export function generateProjectGallerySchema(projects, currentUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${currentUrl}#projectgallery`,
    name: "Whale Creek Construction Project Portfolio",
    description:
      "Complete portfolio of home renovation, kitchen remodeling, and custom millwork projects by Indianapolis general contractors",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "CreativeWork",
      position: index + 1,
      name: project.title,
      description: project.description,
      image: project.images?.[0]?.asset?.asset?.url,
      creator: {
        "@type": "Organization",
        "@id": "https://whalecreek.co/#business",
      },
      dateCreated: project.completedDate,
      locationCreated: {
        "@type": "Place",
        name: project.location,
        address: {
          "@type": "PostalAddress",
          addressLocality: project.location?.split(",")[0] || "Indianapolis",
          addressRegion: "Indiana",
          addressCountry: "US",
        },
      },
      keywords: [
        project.category,
        project.location?.split(",")[0],
        "Indianapolis general contractor",
        "home renovation",
        ...(project.tags || []),
      ]
        .filter(Boolean)
        .join(", "),
      material: project.materials?.join(", "),
      audience: {
        "@type": "Audience",
        audienceType: "homeowners, business owners",
      },
    })),
  };
}
