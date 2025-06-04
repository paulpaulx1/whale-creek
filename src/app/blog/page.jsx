// src/app/blog/page.js
import BlogClient from './BlogClient';
import { client } from '../lib/sanity';

const blogQuery = `
  *[_type == "blogPost"] | order(publishedAt desc) {
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

async function getBlogPosts() {
  try {
    const posts = await client.fetch(blogQuery);
    return posts || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export const metadata = {
  title: 'Construction Blog | Whale Creek Construction | Indianapolis Millwork Tips',
  description: 'Expert insights on custom millwork, construction techniques, and project spotlights from Indianapolis\' premier woodworking specialists.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return <BlogClient posts={posts} />;
}