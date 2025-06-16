'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { urlFor } from '../../../lib/sanity';
import styles from './BlogPostClient.module.css';

const portableTextComponents = {
  types: {
    image: ({ value }) => (
      <div className={styles.postImageContent}>
        <Image
          src={urlFor(value.asset).width(800).url()}
          alt={value.alt || 'Blog post image'}
          width={800}
          height={500}
          className={styles.postContentImage}
        />
        {value.caption && (
          <p className={styles.imageCaption}>{value.caption}</p>
        )}
      </div>
    ),
  },
  block: {
    h1: ({ children }) => <h1 className={styles.contentMainHeading}>{children}</h1>,
    h2: ({ children }) => <h2 className={styles.contentHeading}>{children}</h2>,
    h3: ({ children }) => <h3 className={styles.contentSubheading}>{children}</h3>,
    h4: ({ children }) => <h4 className={styles.contentSubSubheading}>{children}</h4>,
    normal: ({ children }) => <p className={styles.contentParagraph}>{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong className={styles.contentBold}>{children}</strong>,
    em: ({ children }) => <em className={styles.contentItalic}>{children}</em>,
    link: ({ value, children }) => (
      <a href={value.href} className={styles.contentLink} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className={styles.contentList}>{children}</ul>,
    number: ({ children }) => <ol className={styles.contentOrderedList}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className={styles.contentListItem}>{children}</li>,
    number: ({ children }) => <li className={styles.contentListItem}>{children}</li>,
  },
};

export default function BlogPostClient({ post }) {
  const [tableOfContents, setTableOfContents] = useState([]);

  useEffect(() => {
    // Generate table of contents from content blocks
    if (post.content) {
      const headings = post.content
        .filter(block => ['h2', 'h3', 'h4'].includes(block.style))
        .map((block, index) => ({
          id: `heading-${index}`,
          text: block.children.map(child => child.text).join(''),
          level: block.style
        }));
      setTableOfContents(headings);
    }
  }, [post.content]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sharePost = (platform) => {
    const url = window.location.href;
    const title = post.title;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  const getCategoryColor = (category) => {
    const colors = {
      'tips': '#4CAF50',
      'millwork': '#2196F3',
      'spotlights': '#FF9800',
      'tools': '#9C27B0',
      'behind-scenes': '#607D8B'
    };
    return colors[category] || '#263238';
  };

  return (
    <>
      <main className={styles.main}>
        {/* Breadcrumb Navigation */}
        <section className={styles.breadcrumbSection}>
          <div className={styles.container}>
            <nav className={styles.breadcrumb}>
              <Link href='/' className={styles.breadcrumbLink}>
                <i className='ph ph-house'></i>
                Home
              </Link>
              <span className={styles.breadcrumbSeparator}>→</span>
              <Link href='/blog' className={styles.breadcrumbLink}>
                Blog
              </Link>
              <span className={styles.breadcrumbSeparator}>→</span>
              <span className={styles.breadcrumbCurrent}>{post.title}</span>
            </nav>
          </div>
        </section>

        {/* Combined Hero and Featured Image Section */}
        <section className={styles.postHeroWithImage}>
          <div className={styles.container}>
            <div className={styles.heroImageGrid}>
              {/* Hero Content */}
              <div className={styles.postHeroContent}>
                <div
                  className={styles.categoryBadge}
                  style={{ backgroundColor: getCategoryColor(post.category) }}
                >
                  {post.category}
                </div>

                <h1 className={styles.postHeroTitle}>{post.title}</h1>

                {post.excerpt && (
                  <p className={styles.postHeroExcerpt}>{post.excerpt}</p>
                )}

                <div className={styles.postMeta}>
                  <div className={styles.metaItem}>
                    <i className='ph ph-calendar'></i>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  {post.readingTime && (
                    <div className={styles.metaItem}>
                      <i className='ph ph-clock'></i>
                      <span>{post.readingTime} min read</span>
                    </div>
                  )}
                  {post.featured && (
                    <div className={styles.metaItem}>
                      <i className='ph ph-star'></i>
                      <span>Featured Article</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Featured Image */}
              {post.featuredImage && (
                <div className={styles.heroFeaturedImage}>
                  <div className={styles.featuredImageWrapper}>
                    <Image
                      src={urlFor(post.featuredImage.asset)
                        .width(800)
                        .height(600)
                        .url()}
                      alt={post.featuredImage.alt || post.title}
                      width={800}
                      height={600}
                      className={styles.featuredImageLarge}
                      priority
                    />
                    {post.featuredImage.caption && (
                      <p className={styles.imageCaption}>
                        {post.featuredImage.caption}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Post Content */}
        <section className={styles.postContentSection}>
          <div className={styles.container}>
            <div className={styles.postContentGrid}>
              <article className={styles.postContent}>
                <div className={styles.postBody}>
                  {post.content && (
                    <PortableText
                      value={post.content}
                      components={portableTextComponents}
                    />
                  )}
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className={styles.postTags}>
                    <h3 className={styles.tagsTitle}>Related Topics:</h3>
                    <div className={styles.tags}>
                      {post.tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Article Metadata */}
                <div className={styles.articleMeta}>
                  <div className={styles.metaCard}>
                    <h3 className={styles.metaTitle}>Article Information</h3>
                    <div className={styles.metaGrid}>
                      <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Published:</span>
                        <span className={styles.metaValue}>
                          {formatDate(post.publishedAt)}
                        </span>
                      </div>
                      <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Category:</span>
                        <span className={styles.metaValue}>
                          {post.category}
                        </span>
                      </div>
                      {post.readingTime && (
                        <div className={styles.metaItem}>
                          <span className={styles.metaLabel}>
                            Reading Time:
                          </span>
                          <span className={styles.metaValue}>
                            {post.readingTime} minutes
                          </span>
                        </div>
                      )}
                      {post.featured && (
                        <div className={styles.metaItem}>
                          <span className={styles.metaLabel}>Status:</span>
                          <span className={styles.metaValue}>
                            Featured Article
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>

              {/* Sidebar */}
              <aside className={styles.postSidebar}>
                <div className={styles.sidebarContent}>
                  {/* Table of Contents */}
                  {tableOfContents.length > 0 && (
                    <div className={styles.sidebarSection}>
                      <h3 className={styles.sidebarTitle}>In This Article</h3>
                      <nav className={styles.tableOfContents}>
                        {tableOfContents.map((heading, index) => (
                          <a
                            key={index}
                            href={`#heading-${index}`}
                            className={`${styles.tocLink} ${styles[`toc${heading.level.toUpperCase()}`]}`}
                          >
                            {heading.text}
                          </a>
                        ))}
                      </nav>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className={styles.sidebarSection}>
                    <h3 className={styles.sidebarTitle}>Quick Actions</h3>
                    <div className={styles.quickActions}>
                      {/* Back to Blog */}
                      <div className={styles.sidebarSection}>
                        <Link href='/blog' className={styles.backToBlog}>
                          <i className='ph ph-arrow-left'></i>
                          Back to All Articles
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <section className={styles.relatedPostsSection}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>
                More {post.category} Articles
              </h2>
              <div className={styles.relatedPostsGrid}>
                {post.relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost._id}
                    href={`/blog/${relatedPost.slug.current}`}
                    className={styles.relatedPostCard}
                  >
                    {relatedPost.featuredImage && (
                      <div className={styles.relatedPostImage}>
                        <Image
                          src={urlFor(relatedPost.featuredImage.asset)
                            .width(400)
                            .height(250)
                            .url()}
                          alt={relatedPost.title}
                          width={400}
                          height={250}
                        />
                      </div>
                    )}
                    <div className={styles.relatedPostContent}>
                      <div
                        className={styles.categoryBadge}
                        style={{
                          backgroundColor: getCategoryColor(
                            relatedPost.category
                          ),
                        }}
                      >
                        {relatedPost.category}
                      </div>
                      <h3 className={styles.relatedPostTitle}>
                        {relatedPost.title}
                      </h3>
                      <p className={styles.relatedPostExcerpt}>
                        {relatedPost.excerpt}
                      </p>
                      <div className={styles.relatedPostMeta}>
                        <span className={styles.date}>
                          <i className='ph ph-calendar'></i>
                          {formatDate(relatedPost.publishedAt)}
                        </span>
                        {relatedPost.readingTime && (
                          <span className={styles.readTime}>
                            <i className='ph ph-clock'></i>
                            {relatedPost.readingTime} min read
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <div className={styles.ctaContent}>
              <h2>Ready to Start Your Project?</h2>
              <p>
                Inspired by this article? Let&apos;s discuss how we can bring
                that same level of geometric excellence to your construction
                project.
              </p>
              <div className={styles.ctaButtons}>
                <Link
                  href='/indianapolis-woodworker-contact'
                  className={styles.btnPrimary}
                >
                  Get Free Estimate
                </Link>
                <Link href='/project-gallery' className={styles.btnSecondary}>
                  View Our Projects
                </Link>
              </div>
              <div className={styles.ctaCircles}>
                <div className={styles.ctaCircle}></div>
                <div className={styles.ctaCircle}></div>
                <div className={styles.ctaCircle}></div>
                <div className={styles.ctaCircle}></div>
                <div className={styles.ctaCircle}></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
