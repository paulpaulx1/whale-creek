// src/app/blog/[slug]/page.jsx
import BlogPostClient from './BlogPostClient';
import { client } from '../../../lib/sanity';
import { notFound } from 'next/navigation';

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

async function getBlogPost(slug) {
  try {
    const post = await client.fetch(blogPostQuery, { slug });
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found | Whale Creek Construction',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: post.seoTitle || `${post.title} | Whale Creek Construction Blog`,
    description:
      post.seoDescription ||
      post.excerpt ||
      `Read about ${post.title} on the Whale Creek Construction blog.`,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.featuredImage
        ? [
            {
              url: post.featuredImage.asset.url,
              width: 1200,
              height: 630,
              alt: post.featuredImage.alt || post.title,
            },
          ]
        : [],
      type: 'article',
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.featuredImage ? [post.featuredImage.asset.url] : [],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
