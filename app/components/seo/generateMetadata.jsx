// components/SEO/generateMetadata.js - Next.js metadata generation functions

import { generateBlogSEO, generateGallerySEO, generatePageSEO } from '../../lib/seo';

// Generate metadata for blog posts
export function generateBlogMetadata(post, serviceAreas = []) {
  const seoData = generateBlogSEO(post, serviceAreas);

  const canonical = `https://whalecreek.co/blog/${post.slug.current}`;
  console.log('🔍 CANONICAL URL BEING GENERATED:', canonical);
  console.log('🔍 POST SLUG:', post.slug.current);

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt || post.publishedAt,
      authors: ['Whale Creek Construction'],
      tags: post.tags || [],
      images: post.featuredImage ? [{
        url: post.featuredImage.asset.url,
        width: post.featuredImage.asset.metadata?.dimensions?.width || 1200,
        height: post.featuredImage.asset.metadata?.dimensions?.height || 630,
        alt: post.featuredImage.alt || post.title,
      }] : [{
        url: 'https://whalecreek.co/public/images/WhaleLogoNew.png',
        width: 1200,
        height: 630,
        alt: 'Whale Creek Construction'
      }],
    },
    
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
      images: post.featuredImage ? [post.featuredImage.asset.url] : ['https://whalecreek.co/public/images/WhaleLogoNew.png'],
    },
    
    alternates: {
      canonical: `https://whalecreek.co/blog/${post.slug.current}`
    },
    
    other: {
      // Local business meta
      'geo.region': 'US-IN',
      'geo.placename': 'Indianapolis',
      'geo.position': '39.7287174;-86.1392312',
      'ICBM': '39.7287174, -86.1392312',
      
      // Article meta
      'article:author': 'Whale Creek Construction',
      'article:section': post.category,
      
      // Business contact
      'business.phone': '(317) 431-2449',
      'business.email': 'dave@whalecreek.co',
      
      // Additional article tags
      ...(post.tags && post.tags.reduce((acc, tag, index) => {
        acc[`article:tag:${index}`] = tag;
        return acc;
      }, {}))
    }
  };
}

// Generate metadata for project gallery
export function generateGalleryMetadata(projects, serviceAreas = []) {
  const seoData = generateGallerySEO(projects, serviceAreas);

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      type: 'website',
      images: projects.length > 0 && projects[0].images?.[0]?.asset?.asset?.url ? [{
        url: projects[0].images[0].asset.asset.url,
        width: projects[0].images[0].asset.asset.metadata?.dimensions?.width || 1200,
        height: projects[0].images[0].asset.asset.metadata?.dimensions?.height || 630,
        alt: projects[0].title || 'Whale Creek Construction Project'
      }] : [{
        url: 'https://whalecreek.co/public/images/WhaleLogoNew.png',
        width: 1200,
        height: 630,
        alt: 'Whale Creek Construction Projects'
      }]
    },
    
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
      images: projects.length > 0 && projects[0].images?.[0]?.asset?.asset?.url ? 
        [projects[0].images[0].asset.asset.url] : 
        ['https://whalecreek.co/public/images/WhaleLogoNew.png']
    },
    
    alternates: {
      canonical: 'https://whalecreek.co/project-gallery'
    },
    
    other: {
      // Local business meta
      'geo.region': 'US-IN',
      'geo.placename': 'Indianapolis',
      'geo.position': '39.7287174;-86.1392312',
      'ICBM': '39.7287174, -86.1392312',
      
      // Business contact
      'business.phone': '(317) 431-2449',
      'business.email': 'dave@whalecreek.co',
      
      // Portfolio meta
      'portfolio.count': projects.length.toString(),
      'portfolio.categories': [...new Set(projects.map(p => p.category).filter(Boolean))].join(', '),
      'portfolio.locations': [...new Set(projects.map(p => p.location).filter(Boolean))].slice(0, 5).join(', ')
    }
  };
}

// Generate metadata for standard pages (homepage, service pages, etc.)
export function generatePageMetadata(fallback = {}, serviceAreas = [], canonicalUrl = '') {
  const seoData = generatePageSEO(fallback);

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      type: 'website',
      images: [{
        url: 'https://whalecreek.co/public/images/WhaleLogoNew.png',
        width: 1200,
        height: 630,
        alt: 'Whale Creek Construction'
      }]
    },
    
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
      images: ['https://whalecreek.co/public/images/WhaleLogoNew.png']
    },
    
    alternates: canonicalUrl ? {
      canonical: canonicalUrl
    } : undefined,
    
    other: {
      // Local business meta
      'geo.region': 'US-IN',
      'geo.placename': 'Indianapolis',
      'geo.position': '39.7287174;-86.1392312',
      'ICBM': '39.7287174, -86.1392312',
      
      // Business contact
      'business.phone': '(317) 431-2449',
      'business.email': 'dave@whalecreek.co',
      
      // Service areas
      'service.areas': serviceAreas.slice(0, 5).join(', '),
      'service.primary': 'Indianapolis Construction, Custom Millwork, Outdoor Living Spaces'
    }
  };
}

// Helper function for dynamic service pages
export function generateServiceMetadata(serviceData, serviceAreas = []) {
  const fallback = {
    title: serviceData.title || "Construction Services | Whale Creek Construction",
    description: serviceData.description || "Professional construction services in Indianapolis and surrounding areas.",
    keywords: serviceData.keywords || "Indianapolis construction, general contractor, construction services"
  };

  return generatePageMetadata(fallback, serviceAreas, serviceData.canonicalUrl);
}