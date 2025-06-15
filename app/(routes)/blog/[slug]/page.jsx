// src/app/blog/[slug]/page.jsx

import BlogPostClient from './BlogPostClient';
import SchemaMarkup from '../../../components/seo/SchemaMarkup';
import { generateBlogMetadata } from '../../../components/seo/generateMetadata';
import { client } from '../../../lib/sanity';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';

// Your existing blog post query
const blogPostQuery = `
  *[_type == "blogPost" && slug.current == $slug][0] {
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
    "relatedPosts": *[_type == "blogPost" && slug.current != $slug && category == ^.category][0...3] {
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

// Service areas query (reuse from homepage)
const serviceAreasQuery = `*[_type == "project" && defined(location)].location`;

async function getBlogPost(slug) {
  try {
    const post = await client.fetch(blogPostQuery, { slug });
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

async function getServiceAreas() {
  try {
    const locations = await client.fetch(serviceAreasQuery);
    const dynamicAreas = [...new Set(locations.filter(Boolean))];
    
    const hardcodedAreas = [
      'Indianapolis, IN',
      'Meridian Hills, IN', 
      'Noblesville, IN',
      'Carmel, IN',
      'Fishers, IN',
      'Zionsville, IN',
      'Westfield, IN'
    ];
    
    return [...new Set([...dynamicAreas, ...hardcodedAreas])];
  } catch (error) {
    return ['Indianapolis, IN', 'Meridian Hills, IN', 'Noblesville, IN'];
  }
}

// Server-side metadata generation
export async function generateMetadata({ params }) {
  const [post, serviceAreas] = await Promise.all([
    getBlogPost(params.slug),
    getServiceAreas()
  ]);

  if (!post) {
    return {
      title: 'Post Not Found | Whale Creek Construction',
      description: 'The requested blog post could not be found.',
    };
  }

  return generateBlogMetadata(post, serviceAreas);
}

export default async function BlogPostPage({ params }) {
  const [post, serviceAreas] = await Promise.all([
    getBlogPost(params.slug),
    getServiceAreas()
  ]);

  if (!post) notFound();

  // Get current URL dynamically
  const headersList = headers();
  const host = headersList.get('host') || 'whalecreek.co';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const currentUrl = `${protocol}://${host}/blog/${params.slug}`;

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