// components/SEO/generateMetadata.js

import {
  generateBlogSEO,
  generateGallerySEO,
  generatePageSEO,
} from "../../lib/seo";

const SITE_URL = "https://www.whalecreek.co";
const DEFAULT_IMAGE = `${SITE_URL}/images/WhaleLogoNew.png`;

export function generateBlogsMetadata(posts, serviceAreas = []) {
  const postCount = posts.length;
  const categories = [...new Set(posts.map((p) => p.category).filter(Boolean))];
  const recentPosts = posts.slice(0, 3);

  const title = `Home Renovation & Construction Blog | ${postCount} Articles | Indianapolis General Contractor`;
  const description = `Expert insights on home renovation, kitchen remodeling, custom millwork, and outdoor living spaces in Indianapolis. ${postCount} articles from experienced general contractors serving ${serviceAreas.slice(0, 2).join(" and ")}.`;

  const imageUrl = posts[0]?.featuredImage?.asset?.url || DEFAULT_IMAGE;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}/blog`,
      images: [
        {
          url: imageUrl,
          width:
            posts[0]?.featuredImage?.asset?.metadata?.dimensions?.width || 1200,
          height:
            posts[0]?.featuredImage?.asset?.metadata?.dimensions?.height || 630,
          alt:
            posts[0]?.featuredImage?.alt || "Indianapolis Home Renovation Blog",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${SITE_URL}/blog`,
    },
    other: {
      "geo.region": "US-IN",
      "geo.placename": "Indianapolis",
      "geo.position": "39.7287174;-86.1392312",
      ICBM: "39.7287174, -86.1392312",
      "business.phone": "(317) 431-2449",
      "business.email": "dave@whalecreek.co",
      "business.type": "General Contractor",
      "blog.post_count": postCount.toString(),
      "blog.categories": categories.join(", "),
      "blog.recent_posts": recentPosts.map((p) => p.title).join(" | "),
      "blog.service_areas": serviceAreas.slice(0, 5).join(", "),
      "service.primary":
        "Indianapolis general contractor, home renovation, kitchen remodeling, custom millwork, outdoor living spaces",
      "blog.last_updated":
        posts.length > 0 ? posts[0].publishedAt : new Date().toISOString(),
    },
  };
}

export function generateBlogMetadata(post, serviceAreas = []) {
  const seoData = generateBlogSEO(post, serviceAreas);

  const isRenovationPost =
    post.category?.toLowerCase().includes("renovation") ||
    post.category?.toLowerCase().includes("remodel") ||
    post.tags?.some((tag) =>
      ["renovation", "remodel", "kitchen", "millwork", "outdoor"].includes(
        tag.toLowerCase(),
      ),
    );

  const enhancedTitle = isRenovationPost
    ? `${seoData.title} | Indianapolis Home Renovation`
    : `${seoData.title} | Indianapolis General Contractor`;

  const canonical = `${SITE_URL}/blog/${post.slug.current}`;
  const imageUrl = post.featuredImage?.asset?.url || DEFAULT_IMAGE;

  return {
    title: enhancedTitle,
    description: seoData.description,
    openGraph: {
      title: enhancedTitle,
      description: seoData.description,
      type: "article",
      url: canonical,
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt || post.publishedAt,
      authors: ["Whale Creek Construction"],
      tags: post.tags || [],
      images: [
        {
          url: imageUrl,
          width: post.featuredImage?.asset?.metadata?.dimensions?.width || 1200,
          height:
            post.featuredImage?.asset?.metadata?.dimensions?.height || 630,
          alt: post.featuredImage?.alt || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: enhancedTitle,
      description: seoData.description,
      images: [imageUrl],
    },
    alternates: {
      canonical,
    },
    other: {
      "geo.region": "US-IN",
      "geo.placename": "Indianapolis",
      "geo.position": "39.7287174;-86.1392312",
      ICBM: "39.7287174, -86.1392312",
      "article:author": "Whale Creek Construction",
      "article:section": post.category,
      "business.phone": "(317) 431-2449",
      "business.email": "dave@whalecreek.co",
      "business.type": "General Contractor",
      "service.primary": isRenovationPost
        ? "home renovation Indianapolis, kitchen renovation, custom millwork"
        : "Indianapolis general contractor, residential construction",
    },
  };
}

export function generateGalleryMetadata(projects, serviceAreas = []) {
  const renovationProjects = projects.filter(
    (p) =>
      p.category?.toLowerCase().includes("renovation") ||
      p.category?.toLowerCase().includes("remodel") ||
      p.title?.toLowerCase().includes("renovation") ||
      p.title?.toLowerCase().includes("remodel"),
  ).length;

  const title = `Home Renovation Projects | ${projects.length} Completed Projects | Indianapolis General Contractor`;
  const description = `View ${renovationProjects} completed home renovation projects including kitchen remodels, custom millwork, and outdoor living spaces by Indianapolis general contractors. Serving ${serviceAreas.slice(0, 3).join(", ")}.`;

  const projectImage = projects[0]?.images?.[0]?.asset?.asset;
  const imageUrl = projectImage?.url || DEFAULT_IMAGE;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}/project-gallery`,
      images: [
        {
          url: imageUrl,
          width: projectImage?.metadata?.dimensions?.width || 1200,
          height: projectImage?.metadata?.dimensions?.height || 630,
          alt: "Indianapolis Home Renovation Project",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${SITE_URL}/project-gallery`,
    },
    other: {
      "geo.region": "US-IN",
      "geo.placename": "Indianapolis",
      "geo.position": "39.7287174;-86.1392312",
      ICBM: "39.7287174, -86.1392312",
      "business.phone": "(317) 431-2449",
      "business.email": "dave@whalecreek.co",
      "business.type": "General Contractor",
      "portfolio.count": projects.length.toString(),
      "portfolio.renovation_count": renovationProjects.toString(),
      "portfolio.categories": [
        ...new Set(projects.map((p) => p.category).filter(Boolean)),
      ].join(", "),
      "portfolio.locations": [
        ...new Set(projects.map((p) => p.location).filter(Boolean)),
      ]
        .slice(0, 5)
        .join(", "),
      "service.primary":
        "home renovation Indianapolis, kitchen renovation, custom millwork, outdoor living spaces",
    },
  };
}

export function generatePageMetadata(
  fallback = {},
  serviceAreas = [],
  canonicalUrl = "",
) {
  const seoData = generatePageSEO(fallback);

  return {
    title: seoData.title,
    description: seoData.description,
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      type: "website",
      url: canonicalUrl || SITE_URL,
      images: [
        {
          url: DEFAULT_IMAGE,
          width: 1200,
          height: 630,
          alt: "Indianapolis General Contractor - Home Renovation Experts",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.title,
      description: seoData.description,
      images: [DEFAULT_IMAGE],
    },
    alternates: canonicalUrl
      ? {
          canonical: canonicalUrl,
        }
      : undefined,
    other: {
      "geo.region": "US-IN",
      "geo.placename": "Indianapolis",
      "geo.position": "39.7287174;-86.1392312",
      ICBM: "39.7287174, -86.1392312",
      "business.phone": "(317) 431-2449",
      "business.email": "dave@whalecreek.co",
      "business.type": "General Contractor",
      "service.areas": serviceAreas.slice(0, 5).join(", "),
      "service.primary":
        "Indianapolis general contractor, home renovation, kitchen remodeling, custom millwork, outdoor living spaces",
    },
  };
}

export function generateServiceMetadata(serviceData, serviceAreas = []) {
  const fallback = {
    title:
      serviceData.title ||
      "Construction Services | Indianapolis General Contractor",
    description:
      serviceData.description ||
      "Professional home renovation and construction services in Indianapolis. Custom millwork, kitchen remodeling, and outdoor living spaces.",
  };

  return generatePageMetadata(fallback, serviceAreas, serviceData.canonicalUrl);
}
