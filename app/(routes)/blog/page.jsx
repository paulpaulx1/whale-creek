// src/app/blog/page.js

import BlogClient from "./BlogClient";
import { client } from "../../lib/sanity";
import { generateBlogsMetadata } from "../../components/seo/generateMetadata";
import SchemaMarkup from "../../components/seo/SchemaMarkup";

const SITE_URL = "https://www.whalecreek.co";
const PAGE_PATH = "/blog";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

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
    const locations = await client.fetch(
      serviceAreasQuery,
      {},
      { next: { tags: ["sanity"] } },
    );

    const dynamicAreas = [...new Set(locations.filter(Boolean))];

    const hardcodedAreas = [
      "Indianapolis, IN",
      "Meridian Hills, IN",
      "Noblesville, IN",
      "Carmel, IN",
      "Fishers, IN",
      "Zionsville, IN",
      "Westfield, IN",
    ];

    return [...new Set([...dynamicAreas, ...hardcodedAreas])];
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
    const posts = await client.fetch(
      blogQuery,
      {},
      { next: { tags: ["sanity"] } },
    );

    return posts || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function generateMetadata() {
  const posts = await getBlogPosts();
  const serviceAreas = await getServiceAreas();

  return generateBlogsMetadata(posts, serviceAreas, PAGE_URL);
}

export default async function BlogPage() {
  const [posts, serviceAreas] = await Promise.all([
    getBlogPosts(),
    getServiceAreas(),
  ]);

  return (
    <>
      <SchemaMarkup
        type="blog"
        data={posts}
        serviceAreas={serviceAreas}
        currentUrl={PAGE_URL}
      />

      <BlogClient posts={posts} />
    </>
  );
}
