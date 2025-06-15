// lib/seo.js - SEO utility functions for server-side generation

// Base business information
export const businessInfo = {
    name: "Whale Creek Construction",
    alternateName: "Whale Creek Co",
    description: "Premier Indianapolis construction company specializing in custom millwork, residential construction, outdoor living spaces, decks, patios, and home remodeling. Expert craftsmanship serving Indianapolis metro area.",
    phone: "+13174312449", 
    email: "dave@whalecreek.co",
    address: {
      street: "2659 Shelby Street",
      city: "Indianapolis", 
      state: "Indiana",
      zip: "46203"
    },
    geo: {
      latitude: 39.7287174,
      longitude: -86.1392312
    },
    socialLinks: [
      "https://www.facebook.com/whalecreekco",
      "https://www.instagram.com/whalecreekco"
    ]
  };
  
  // Helper function to generate service areas from dynamic location data
  export function generateServiceAreas(serviceAreas = []) {
    if (serviceAreas.length === 0) {
      return [
        {
          "@type": "City",
          "name": "Indianapolis",
          "sameAs": "https://en.wikipedia.org/wiki/Indianapolis"
        }
      ];
    }
  
    return serviceAreas
      .filter(location => location && location.trim())
      .map(location => {
        const cityName = location.split(',')[0].trim();
        
        return {
          "@type": "City",
          "name": cityName,
          "sameAs": `https://en.wikipedia.org/wiki/${cityName.replace(/\s+/g, '_')}`
        };
      })
      .filter((area, index, self) => 
        index === self.findIndex(a => a.name.toLowerCase() === area.name.toLowerCase())
      );
  }
  
  // Generate blog post SEO data
  export function generateBlogSEO(post, serviceAreas = []) {
    const title = post?.seoTitle || 
      `${post?.title} | Indianapolis Construction Blog | Whale Creek Construction`;
    
    const description = post?.seoDescription || 
      post?.excerpt || 
      `${post?.title} - Expert insights on Indianapolis construction, custom millwork, outdoor living spaces, and home remodeling.`;
  
    const categoryKeywords = {
      'millwork': 'custom millwork Indianapolis, architectural millwork, trim work Indianapolis',
      'tips': 'construction tips Indianapolis, home improvement advice, building techniques',
      'spotlights': 'Indianapolis construction projects, custom builds, outdoor living showcase',
      'news': 'Indianapolis construction news, building industry updates',
      'behind-scenes': 'Indianapolis contractors, construction process, craftsmanship',
      'tools': 'construction tools, woodworking equipment, contractor recommendations'
    };
  
    const keywords = [
      'Indianapolis construction',
      'home remodeling Indianapolis', 
      'outdoor living spaces Indianapolis',
      'custom millwork Indianapolis',
      categoryKeywords[post?.category] || 'Indianapolis contractors',
      ...(post?.tags || [])
    ].join(', ');
  
    return { title, description, keywords };
  }
  
  // Generate project gallery SEO data
  export function generateGallerySEO(projects = [], serviceAreas = []) {
    const projectCount = projects.length;
    const categories = [...new Set(projects.map(p => p.category).filter(Boolean))];
    const locations = [...new Set(projects.map(p => p.location).filter(Boolean))];
  
    const title = `Indianapolis Construction Portfolio | ${projectCount} Projects | Whale Creek Construction`;
    
    const description = `View our portfolio of ${projectCount} construction and custom millwork projects in ${locations.slice(0, 3).join(', ')}. Specializing in ${categories.slice(0, 3).join(', ')} and outdoor living spaces.`;
  
    const keywords = [
      'Indianapolis construction portfolio',
      'construction project gallery',
      'custom millwork projects',
      'outdoor living spaces portfolio',
      ...categories.map(cat => `${cat} projects Indianapolis`),
      ...locations.map(loc => `${loc.split(',')[0]} construction`)
    ].join(', ');
  
    return { title, description, keywords };
  }
  
  // Generate default page SEO data
  export function generatePageSEO(fallback = {}) {
    const defaults = {
      title: "Indianapolis Construction Company | Custom Millwork & Outdoor Living | Whale Creek Construction",
      description: "Premier Indianapolis construction company specializing in custom millwork, outdoor living spaces, decks, patios, home remodeling, and residential construction. Licensed, bonded, and insured.",
      keywords: "Indianapolis construction, Indianapolis general contractor, custom millwork Indianapolis, outdoor living spaces Indianapolis, deck builders Indianapolis, patio construction Indianapolis, home remodeling Indianapolis"
    };
  
    return {
      title: fallback.title || defaults.title,
      description: fallback.description || defaults.description,
      keywords: fallback.keywords || defaults.keywords
    };
  }
  
  // Generate base LocalBusiness schema
  export function generateBaseSchema(serviceAreas = []) {
    return {
      "@context": "https://schema.org",
      "@type": "GeneralContractor",
      "@id": "https://whalecreek.co/#business",
      "name": businessInfo.name,
      "alternateName": businessInfo.alternateName,
      "description": businessInfo.description,
      "url": "https://whalecreek.co",
      "telephone": businessInfo.phone,
      "email": businessInfo.email,
      "priceRange": "$$-$$$",
      "image": "https://whalecreek.co/public/images/WhaleLogoNew.png",
      "logo": {
        "@type": "ImageObject",
        "url": "https://whalecreek.co/public/images/WhaleLogoNew.png",
        "width": "200",
        "height": "200"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": businessInfo.address.street,
        "addressLocality": businessInfo.address.city,
        "addressRegion": businessInfo.address.state,
        "postalCode": businessInfo.address.zip,
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": businessInfo.geo.latitude,
        "longitude": businessInfo.geo.longitude
      },
      "areaServed": generateServiceAreas(serviceAreas),
      "openingHours": [
        "Mo 09:00-17:00",
        "Tu 09:00-17:00", 
        "We 09:00-17:00",
        "Th 09:00-17:00",
        "Fr 09:00-17:00"
      ],
      "sameAs": businessInfo.socialLinks,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "12",
        "bestRating": "5",
        "worstRating": "5"
      },
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Licensed General Contractor",
          "credentialCategory": "Professional License"
        }
      ],
      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Millwork & Architectural Trim",
            "description": "Expert custom millwork, architectural trim, moldings, and precision woodworking.",
            "category": "Construction Services"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Outdoor Living Spaces & Deck Construction",
            "description": "Custom outdoor living spaces, deck construction, patio building, and outdoor entertainment areas.",
            "category": "Construction Services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Residential Construction & Home Building",
            "description": "Complete residential construction services including custom homes and major renovations.",
            "category": "Construction Services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Home Remodeling & Renovation",
            "description": "Complete home remodeling and renovation services transforming living spaces.",
            "category": "Construction Services"
          }
        }
      ]
    };
  }
  
  // Generate blog post schema
  export function generateBlogSchema(post, currentUrl) {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${currentUrl}#article`,
      "headline": post.title,
      "alternativeHeadline": post.seoTitle,
      "description": post.excerpt,
      "image": {
        "@type": "ImageObject",
        "url": post.featuredImage?.asset?.url || "https://whalecreek.co/public/images/WhaleLogoNew.png",
        "width": post.featuredImage?.asset?.metadata?.dimensions?.width || 1200,
        "height": post.featuredImage?.asset?.metadata?.dimensions?.height || 630
      },
      "datePublished": post.publishedAt,
      "dateModified": post._updatedAt || post.publishedAt,
      "author": {
        "@type": "Organization",
        "name": businessInfo.name,
        "@id": "https://whalecreek.co/#business"
      },
      "publisher": {
        "@type": "Organization", 
        "name": businessInfo.name,
        "logo": {
          "@type": "ImageObject",
          "url": "https://whalecreek.co/public/images/WhaleLogoNew.png"
        },
        "@id": "https://whalecreek.co/#business"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": currentUrl
      },
      "about": [
        {
          "@type": "Thing",
          "name": "Construction",
          "sameAs": "https://en.wikipedia.org/wiki/Construction"
        },
        {
          "@type": "Thing", 
          "name": "Millwork",
          "sameAs": "https://en.wikipedia.org/wiki/Millwork_(building_material)"
        },
        {
          "@type": "Place",
          "name": "Indianapolis",
          "sameAs": "https://en.wikipedia.org/wiki/Indianapolis"
        }
      ],
      "articleSection": post.category,
      "wordCount": post.readingTime ? post.readingTime * 200 : undefined,
      "timeRequired": post.readingTime ? `PT${post.readingTime}M` : undefined,
      "inLanguage": "en-US",
      "isAccessibleForFree": true
    };
  }
  
  // Generate project gallery schema
  export function generateProjectGallerySchema(projects, currentUrl) {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${currentUrl}#projectgallery`,
      "name": "Whale Creek Construction Project Portfolio",
      "description": "Complete portfolio of construction and custom millwork projects by Whale Creek Construction",
      "numberOfItems": projects.length,
      "itemListElement": projects.map((project, index) => ({
        "@type": "CreativeWork",
        "position": index + 1,
        "name": project.title,
        "description": project.description,
        "image": project.images?.[0]?.asset?.asset?.url,
        "creator": {
          "@type": "Organization",
          "@id": "https://whalecreek.co/#business"
        },
        "dateCreated": project.completedDate,
        "locationCreated": {
          "@type": "Place",
          "name": project.location,
          "address": {
            "@type": "PostalAddress", 
            "addressLocality": project.location?.split(',')[0] || "Indianapolis",
            "addressRegion": "Indiana",
            "addressCountry": "US"
          }
        },
        "keywords": [
          project.category, // Put category in keywords instead
          project.location?.split(',')[0],
          "Indianapolis construction",
          ...(project.tags || [])
        ].filter(Boolean).join(', '),
        "material": project.materials?.join(', '),
        "audience": {
          "@type": "Audience",
          "audienceType": "homeowners, business owners"
        }
      }))
    };
  }