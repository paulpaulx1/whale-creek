// src/app/blog/[slug]/page.jsx

import BlogPostClient from "./BlogPostClient";
import SchemaMarkup from "../../../components/seo/SchemaMarkup";
import { generateBlogMetadata } from "../../../components/seo/generateMetadata";
import { client } from "../../../lib/sanity";
import { notFound } from "next/navigation";

const SITE_URL = "https://www.whalecreek.co";

const blogPostQuery = `
  *[
    _type == "blogPost" &&
    slug.current == $slug &&
    status == "published"
  ][0] {
    _id,
    _createdAt,
    _updatedAt,
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
    content,
    seoTitle,
    seoDescription,
    "relatedPosts": *[
      _type == "blogPost" &&
      slug.current != $slug &&
      category == ^.category &&
      status == "published"
    ][0...3] {
      _id,
      title,
      slug,
      excerpt,
      featuredImage {
        asset-> {
          _id,
          url
        }
      },
      publishedAt,
      readingTime,
      category
    }
  }
`;

const serviceAreasQuery = `*[_type == "project" && defined(location)].location`;

async function getBlogPost(slug) {
  try {
    return await client.fetch(
      blogPostQuery,
      { slug },
      { next: { tags: ["sanity"] } },
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

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
    return ["Indianapolis, IN", "Meridian Hills, IN", "Noblesville, IN"];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const [post, serviceAreas] = await Promise.all([
    getBlogPost(slug),
    getServiceAreas(),
  ]);

  if (!post) {
    return {
      title: "Post Not Found | Whale Creek Construction",
      description: "The requested blog post could not be found.",
      alternates: {
        canonical: `${SITE_URL}/blog/${slug}`,
      },
    };
  }

  return generateBlogMetadata(post, serviceAreas);
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  const [post, serviceAreas] = await Promise.all([
    getBlogPost(slug),
    getServiceAreas(),
  ]);

  if (!post) notFound();

  const currentUrl = `${SITE_URL}/blog/${slug}`;

  return (
    <>
      <SchemaMarkup
        type="blog"
        data={post}
        serviceAreas={serviceAreas}
        currentUrl={currentUrl}
      />

      <BlogPostClient post={post} />
    </>
  );
}
