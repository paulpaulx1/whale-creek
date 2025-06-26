// components/SEO/generateMetadata.js - Next.js metadata generation functions

import { generateBlogSEO, generateGallerySEO, generatePageSEO } from '../../lib/seo';

// Generate metadata for the blog listing page (shows all blog posts)
export function generateBlogsMetadata(posts, serviceAreas = []) {
  // Generate dynamic content based on available posts
  const postCount = posts.length;
  const categories = [...new Set(posts.map(p => p.category).filter(Boolean))];
  const recentPosts = posts.slice(0, 3);
  
  // Create dynamic title and description
  const title = `Construction Blog | ${postCount} Articles on Home Building & Renovation | Indianapolis`;
  const description = `Discover expert insights on construction, home renovation, and custom millwork. ${postCount} articles covering ${categories.join(', ')} and more. Serving ${serviceAreas.slice(0, 3).join(', ')}.`;
  
  // Generate keywords from posts and service areas
  const postKeywords = [
    ...categories,
    ...posts.flatMap(p => p.tags || []).slice(0, 10),
    'construction blog',
    'home renovation tips',
    'building advice',
    'Indianapolis construction'
  ];
  
  const locationKeywords = serviceAreas.slice(0, 5).map(area => 
    `construction blog ${area.replace(', IN', '')}`
  );
  
  const keywords = [...new Set([...postKeywords, ...locationKeywords])].join(', ');

  return {
    title,
    description,
    keywords,
    
    openGraph: {
      title,
      description,
      type: 'website',
      images: posts.length > 0 && posts[0].featuredImage?.asset?.url ? [{
        url: posts[0].featuredImage.asset.url,
        width: posts[0].featuredImage.asset.metadata?.dimensions?.width || 1200,
        height: posts[0].featuredImage.asset.metadata?.dimensions?.height || 630,
        alt: posts[0].featuredImage.alt || 'Whale Creek Construction Blog'
      }] : [{
        url: 'https://whalecreek.co/public/images/WhaleLogoNew.png',
        width: 1200,
        height: 630,
        alt: 'Whale Creek Construction Blog'
      }]
    },
    
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: posts.length > 0 && posts[0].featuredImage?.asset?.url ? 
        [posts[0].featuredImage.asset.url] : 
        ['https://whalecreek.co/public/images/WhaleLogoNew.png']
    },
    
    alternates: {
      canonical: 'https://whalecreek.co/blog'
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
      
      // Blog-specific meta
      'blog.post_count': postCount.toString(),
      'blog.categories': categories.join(', '),
      'blog.recent_posts': recentPosts.map(p => p.title).join(' | '),
      'blog.service_areas': serviceAreas.slice(0, 5).join(', '),
      
      // Content freshness
      'blog.last_updated': posts.length > 0 ? posts[0].publishedAt : new Date().toISOString(),
      
      // Article tags from recent posts
      ...(recentPosts.flatMap(post => post.tags || []).slice(0, 10).reduce((acc, tag, index) => {
        acc[`blog:topic:${index}`] = tag;
        return acc;
      }, {}))
    }
  };
}


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