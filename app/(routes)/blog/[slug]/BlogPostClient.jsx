'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { urlFor } from '../../../lib/sanity';
import styles from '../Blog.module.css';

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
    h2: ({ children }) => <h2 className={styles.contentHeading}>{children}</h2>,
    h3: ({ children }) => (
      <h3 className={styles.contentSubheading}>{children}</h3>
    ),
    normal: ({ children }) => (
      <p className={styles.contentParagraph}>{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className={styles.contentBold}>{children}</strong>
    ),
    link: ({ value, children }) => (
      <a
        href={value.href}
        className={styles.contentLink}
        target='_blank'
        rel='noopener noreferrer'
      >
        {children}
      </a>
    ),
  },
};

export default function BlogPostClient({ post }) {
  const [tableOfContents, setTableOfContents] = useState([]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const sharePost = (platform) => {
    const url = window.location.href;
    const title = post.title;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <>
      {/* Kinetic Background */}
      <div className={styles.kineticBg}>
        <div className={`${styles.floatingElement} ${styles.floatSaw}`}>⚡</div>
        <div className={`${styles.floatingElement} ${styles.floatRuler}`}>
          📏
        </div>
        <div className={`${styles.floatingElement} ${styles.floatHammer}`}>
          🔨
        </div>
        <div
          className={`${styles.floatingElement} ${styles.floatSquare}`}
        ></div>
        <div
          className={`${styles.floatingElement} ${styles.floatTriangle}`}
        ></div>
      </div>

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

        {/* Post Hero */}
        <section className={styles.postHero}>
          <div className={styles.container}>
            <div className={styles.postHeroContent}>
              <div className={styles.categoryBadge}>{post.category}</div>
              <h1 className={styles.postHeroTitle}>{post.title}</h1>
              <p className={styles.postHeroExcerpt}>{post.excerpt}</p>

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
                {post.author && (
                  <div className={styles.metaItem}>
                    <i className='ph ph-user'></i>
                    <span>By {post.author.name}</span>
                  </div>
                )}
              </div>

              {/* Share Buttons */}
              <div className={styles.shareSection}>
                <span className={styles.shareLabel}>Share this article:</span>
                <div className={styles.shareButtons}>
                  <button
                    onClick={() => sharePost('twitter')}
                    className={styles.shareBtn}
                    aria-label='Share on Twitter'
                  >
                    <i className='ph ph-twitter-logo'></i>
                  </button>
                  <button
                    onClick={() => sharePost('facebook')}
                    className={styles.shareBtn}
                    aria-label='Share on Facebook'
                  >
                    <i className='ph ph-facebook-logo'></i>
                  </button>
                  <button
                    onClick={() => sharePost('linkedin')}
                    className={styles.shareBtn}
                    aria-label='Share on LinkedIn'
                  >
                    <i className='ph ph-linkedin-logo'></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {post.featuredImage && (
          <section className={styles.featuredImageSection}>
            <div className={styles.container}>
              <div className={styles.featuredImageWrapper}>
                <Image
                  src={urlFor(post.featuredImage.asset)
                    .width(1200)
                    .height(600)
                    .url()}
                  alt={post.featuredImage.alt || post.title}
                  width={1200}
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
          </section>
        )}

        {/* Post Content */}
        <section className={styles.postContentSection}>
          <div className={styles.container}>
            <div className={styles.postContentGrid}>
              <article className={styles.postContent}>
                <div className={styles.postBody}>
                  <PortableText
                    value={post.body}
                    components={portableTextComponents}
                  />
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className={styles.postTags}>
                    <h3 className={styles.tagsTitle}>Tags:</h3>
                    <div className={styles.tags}>
                      {post.tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author Bio */}
                {post.author && (
                  <div className={styles.authorSection}>
                    <div className={styles.authorCard}>
                      {post.author.image && (
                        <div className={styles.authorImage}>
                          <Image
                            src={urlFor(post.author.image.asset)
                              .width(100)
                              .height(100)
                              .url()}
                            alt={post.author.name}
                            width={100}
                            height={100}
                            className={styles.authorAvatar}
                          />
                        </div>
                      )}
                      <div className={styles.authorInfo}>
                        <h3 className={styles.authorName}>
                          About {post.author.name}
                        </h3>
                        <p className={styles.authorBio}>{post.author.bio}</p>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Sidebar */}
              <aside className={styles.postSidebar}>
                <div className={styles.sidebarContent}>
                  {/* Back to Blog */}
                  <div className={styles.sidebarSection}>
                    <Link href='/blog' className={styles.backToBlog}>
                      <i className='ph ph-arrow-left'></i>
                      Back to All Articles
                    </Link>
                  </div>

                  {/* Table of Contents */}
                  <div className={styles.sidebarSection}>
                    <h3 className={styles.sidebarTitle}>Quick Navigation</h3>
                    <nav className={styles.tableOfContents}>
                      <a href='#top' className={styles.tocLink}>
                        Back to Top
                      </a>
                    </nav>
                  </div>

                  {/* Related Projects */}
                  {post.relatedProjects && post.relatedProjects.length > 0 && (
                    <div className={styles.sidebarSection}>
                      <h3 className={styles.sidebarTitle}>Related Projects</h3>
                      <div className={styles.relatedProjects}>
                        {post.relatedProjects.map((project) => (
                          <Link
                            key={project._id}
                            href={`/project/${project.slug.current}`}
                            className={styles.relatedProjectCard}
                          >
                            {project.featuredImage && (
                              <div className={styles.relatedProjectImage}>
                                <Image
                                  src={urlFor(project.featuredImage.asset)
                                    .width(200)
                                    .height(120)
                                    .url()}
                                  alt={project.title}
                                  width={200}
                                  height={120}
                                />
                              </div>
                            )}
                            <h4 className={styles.relatedProjectTitle}>
                              {project.title}
                            </h4>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <section className={styles.relatedPostsSection}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>Related Articles</h2>
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
