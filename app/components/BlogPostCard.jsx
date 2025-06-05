'use client';

import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../lib/sanity';
import styles from '../(routes)/blog/Blog.module.css';

// New BlogPostCard component that handles individual post rendering
export default function BlogPostCard({ post }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Link href={`/blog/${post.slug.current}`} className={styles.postCard}>
      <div className={styles.postImage}>
        {post.featuredImage ? (
          <Image
            src={urlFor(post.featuredImage.asset).width(600).height(300).url()}
            alt={post.featuredImage.alt || post.title}
            fill
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className={styles.placeholderImage}>
            <i
              className='ph ph-file-text'
              style={{
                fontSize: '3rem',
                color: '#37474F',
                opacity: 0.3,
              }}
            ></i>
            <p>Construction Article</p>
          </div>
        )}
        <div className={styles.categoryBadge}>{post.category}</div>
      </div>

      <div className={styles.postContent}>
        <h3 className={styles.postTitle}>{post.title}</h3>
        <p className={styles.postExcerpt}>{post.excerpt}</p>

        <div className={styles.postMeta}>
          <span className={styles.date}>
            <i className='ph ph-calendar'></i>
            {formatDate(post.publishedAt)}
          </span>
          {post.readingTime && (
            <span className={styles.readTime}>
              <i className='ph ph-clock'></i>
              {post.readingTime} min read
            </span>
          )}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className={styles.tags}>
            {post.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className={styles.readMore}>
          <span>Read Article</span>
          <i className='ph ph-arrow-right'></i>
        </div>
      </div>
    </Link>
  );
}
