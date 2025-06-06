// src/lib/seo/seoConfig.js

export const siteConfig = {
    name: "Whale Creek Construction",
    description: "Indianapolis' premier destination for custom millwork, woodworking, and construction excellence. Expert craftsmanship for residential and commercial projects.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.whalecreekconstruction.com",
    ogImage: "/images/whale-creek-og-image.jpg",
    creator: "Whale Creek Construction",
    
    // Business Information
    business: {
      name: "Whale Creek Construction",
      legalName: "Whale Creek Co",
      description: "Premier destination for comprehensive design, woodworking, custom built solutions, and contract manufacturing services. We seamlessly blend expertise in design, woodworking, and general contracting to bring your vision to life.",
      phone: "+13174312449",
      email: "info@whalecreekconstruction.com",
      
      // Address
      address: {
        streetAddress: "2659 Shelby Street",
        addressLocality: "Indianapolis", 
        addressRegion: "Indiana",
        postalCode: "46203",
        addressCountry: "US"
      },
      
      // Coordinates
      geo: {
        latitude: 39.7287174,
        longitude: -86.1392312
      },
      
      // Hours
      openingHours: "Mo,Tu,We,Th,Fr 09:00-17:00",
      priceRange: "$$",
      
      // Social Media
      sameAs: [
        "https://www.facebook.com/whalecreekco",
        "https://www.instagram.com/whalecreekco",
        "https://www.linkedin.com/company/whale-creek-construction"
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
        "Greenwood, IN"
      ]
    },
    
    // Services offered
    services: [
      {
        name: "Custom Millwork",
        description: "Precision-crafted trim, moldings, and architectural details that transform spaces with timeless elegance and superior quality.",
        category: "millwork",
        keywords: ["custom millwork", "trim work", "moldings", "architectural millwork", "Indianapolis millwork"]
      },
      {
        name: "Residential Construction", 
        description: "Complete home construction and renovation services, bringing your vision to life with meticulous attention to detail.",
        category: "residential",
        keywords: ["home construction", "residential building", "custom homes", "Indianapolis home builder"]
      },
      {
        name: "Commercial Projects",
        description: "Professional-grade construction solutions for businesses, combining functionality with aesthetic appeal.",
        category: "commercial", 
        keywords: ["commercial construction", "business renovation", "office construction", "Indianapolis commercial contractor"]
      },
      {
        name: "Custom Cabinetry",
        description: "Bespoke storage solutions designed and built to maximize space while complementing your unique style.",
        category: "cabinetry",
        keywords: ["custom cabinets", "kitchen cabinets", "built-in storage", "Indianapolis cabinetry"]
      },
      {
        name: "Renovation & Remodeling",
        description: "Transform existing spaces with expert renovation services that blend modern functionality with classic craftsmanship.",
        category: "renovation", 
        keywords: ["home renovation", "remodeling", "home improvement", "Indianapolis renovation"]
      },
      {
        name: "Design Consultation",
        description: "Professional design guidance to help you visualize and plan your project from initial concept to final execution.",
        category: "design",
        keywords: ["design consultation", "project planning", "interior design", "Indianapolis design services"]
      }
    ],
    
    // Common keywords for the business
    keywords: [
      // Primary
      "Indianapolis construction",
      "custom millwork Indianapolis", 
      "woodworking Indianapolis",
      "home renovation Indianapolis",
      "custom cabinetry Indianapolis",
      
      // Secondary  
      "general contractor Indianapolis",
      "residential construction Indianapolis",
      "commercial construction Indianapolis", 
      "home improvement Indianapolis",
      "custom furniture Indianapolis",
      
      // Long-tail
      "Indianapolis custom millwork contractor",
      "residential construction services Indianapolis",
      "commercial renovation Indianapolis Indiana",
      "custom cabinet maker Indianapolis",
      "home remodeling contractor Indianapolis"
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
      twitterCreator: "@whalecreekco"
    }
  };
  
  // Page-specific SEO configurations
  export const pageConfigs = {
    home: {
      title: "Custom Millwork & Construction Excellence | Indianapolis | Whale Creek Construction",
      description: "Indianapolis' premier woodworking specialists, crafting bespoke solutions for residential and commercial projects with unmatched precision and artistry.",
      keywords: ["Indianapolis construction", "custom millwork", "woodworking Indianapolis", "home renovation"],
      canonical: "/"
    },
    
    about: {
      title: "About Whale Creek Construction | Indianapolis' Trusted Craftsmen",
      description: "With decades of combined experience, Whale Creek Construction has established itself as Indianapolis' premier destination for custom millwork and construction excellence.",
      keywords: ["about whale creek", "Indianapolis contractor", "construction company Indianapolis"],
      canonical: "/about"
    },
    
    services: {
      title: "Construction Services | Custom Millwork & Renovation | Indianapolis",
      description: "From custom millwork to complete renovations, discover our comprehensive construction services in Indianapolis. Expert craftsmanship for residential and commercial projects.",
      keywords: ["construction services Indianapolis", "millwork services", "renovation services"],
      canonical: "/services"
    },
    
    gallery: {
      title: "Project Gallery | Custom Millwork & Construction | Indianapolis",
      description: "Explore our portfolio of custom millwork, residential construction, and commercial projects in Indianapolis. See the quality and craftsmanship that sets us apart.",
      keywords: ["construction portfolio", "millwork gallery", "Indianapolis projects"],
      canonical: "/project-gallery"
    },
    
    contact: {
      title: "Contact Whale Creek Construction | Free Estimates | Indianapolis",
      description: "Ready to start your project? Contact Indianapolis' premier construction and millwork specialists for a free estimate. Call (317) 431-2449 or request a quote online.",
      keywords: ["contact Indianapolis contractor", "construction estimate", "millwork quote"],
      canonical: "/contact"
    },
    
    blog: {
      title: "Construction & Millwork Blog | Tips & Insights | Indianapolis",
      description: "Expert insights on construction, millwork, and home improvement from Indianapolis' trusted craftsmen. Tips, trends, and project inspiration.",
      keywords: ["construction blog", "millwork tips", "home improvement Indianapolis"],
      canonical: "/blog"
    }
  };
  
  // Structured data templates
  export const structuredDataTemplates = {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization", 
      "name": siteConfig.business.name,
      "url": siteConfig.url,
      "logo": `${siteConfig.url}/images/whale-creek-logo.png`,
      "sameAs": siteConfig.business.sameAs
    },
    
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": siteConfig.name,
      "url": siteConfig.url,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${siteConfig.url}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    }
  };