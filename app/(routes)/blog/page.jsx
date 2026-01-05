// src/app/blog/page.js
import BlogClient from "./BlogClient";
import { client } from "../../lib/sanity";
import { generateBlogsMetadata } from "../../components/seo/generateMetadata";
import SchemaMarkup from "../../components/seo/SchemaMarkup";
import { headers } from "next/headers";

const blogQuery = `
  *[_type == "blogPost" && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    excerpt,
    featuredImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions
        }
      },
      alt,
      caption
    },
    publishedAt,
    featured,
    tags,
    readingTime,
    "relatedProjectsCount": count(relatedProjects)
  }
`;

const serviceAreasQuery = `*[_type == "project" && defined(location)].location`;

async function getServiceAreas() {
  try {
    const locations = await client.fetch(serviceAreasQuery);
    const dynamicAreas = [...new Set(locations.filter(Boolean))];

    // Hardcoded areas for immediate SEO benefit
    const hardcodedAreas = [
      "Indianapolis, IN",
      "Meridian Hills, IN",
      "Noblesville, IN",
      "Carmel, IN",
      "Fishers, IN",
      "Zionsville, IN",
      "Westfield, IN",
    ];

    // Combine and deduplicate
    const allAreas = [...new Set([...dynamicAreas, ...hardcodedAreas])];
    return allAreas;
  } catch (error) {
    console.error("Error fetching service areas:", error);
    return [
      "Indianapolis, IN",
      "Meridian Hills, IN",
      "Noblesville, IN",
      "Carmel, IN",
      "Fishers, IN",
    ];
  }
}

async function getBlogPosts() {
  try {
    const posts = await client.fetch(blogQuery);
    return posts || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function generateMetadata() {
  const posts = await getBlogPosts();
  const serviceAreas = await getServiceAreas();

  return generateBlogsMetadata(posts, serviceAreas);
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const serviceAreas = await getServiceAreas();
  const headersList = await headers();
  const host = headersList.get("host") || "whalecreek.co";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const currentUrl = `${protocol}://${host}/blog`;

  return (
    <>
      <SchemaMarkup
        type="blog"
        data={posts}
        serviceAreas={serviceAreas}
        currentUrl={currentUrl}
      />
      <BlogClient posts={posts} />
    </>
  );
}
