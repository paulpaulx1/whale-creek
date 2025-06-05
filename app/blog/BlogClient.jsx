'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../lib/sanity';
import styles from './Blog.module.css';
import BlogPostCard from '../components/BlogPostCard';

export default function BlogClient({ posts }) {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [activeFilter, setActiveFilter] = useState('all');

  console.log(posts);

  const categories = [
    { id: 'all', label: 'All Posts', icon: 'newspaper' },
    { id: 'millwork', label: 'Custom Millwork', icon: 'hammer' },
    { id: 'tips', label: 'Construction Tips', icon: 'lightbulb' },
    { id: 'spotlights', label: 'Project Spotlights', icon: 'star' },
    { id: 'tools', label: 'Tool Reviews', icon: 'wrench' },
    { id: 'behind-scenes', label: 'Behind the Scenes', icon: 'eye' }
  ];

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => 
        post.category === activeFilter
      ));
    }
  }, [activeFilter, posts]);

  const handleFilterChange = (categoryId) => {
    setActiveFilter(categoryId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <>
      {/* Kinetic Background with Woodgrain */}
      <div className={styles.kineticBg}>
        <div className={`${styles.floatingElement} ${styles.floatSaw}`}>🪚</div>
        <div className={`${styles.floatingElement} ${styles.floatRuler}`}>
          📐
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
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContainer}>
            <div className={styles.heroContent}>
              <h1>
                CONSTRUCTION <span className={styles.heroAccent}>INSIGHTS</span>
              </h1>
              <p>
                Expert tips, project spotlights, and behind-the-scenes looks at
                Indianapolis&apos; most geometrically excellent construction
                projects. From precision millwork to advanced building
                techniques.
              </p>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{posts.length}</span>
                  <span className={styles.statLabel}>Expert Articles</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>
                    {featuredPosts.length}
                  </span>
                  <span className={styles.statLabel}>Featured Stories</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>∞</span>
                  <span className={styles.statLabel}>Geometric Precision</span>
                </div>
              </div>
              <div className={styles.heroCircles}>
                <div className={styles.heroCircle}></div>
                <div className={styles.heroCircle}></div>
                <div className={styles.heroCircle}></div>
                <div className={styles.heroCircle}></div>
                <div className={styles.heroCircle}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className={styles.featuredSection}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>Featured Articles</h2>
              <div className={styles.featuredGrid}>
                {featuredPosts.slice(0, 2).map((post) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug.current}`}
                    className={styles.featuredCard}
                  >
                    <div className={styles.featuredImage}>
                      {post.featuredImage && (
                        <Image
                          src={urlFor(post.featuredImage.asset)
                            .width(800)
                            .height(500)
                            .url()}
                          alt={post.featuredImage.alt || post.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      )}
                      <div className={styles.featuredOverlay}>
                        <div className={styles.categoryBadge}>
                          {post.category}
                        </div>
                        <div className={styles.featuredInfo}>
                          <h3>{post.title}</h3>
                          <p>{post.excerpt}</p>
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
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Filter Section */}
        <section className={styles.filterSection}>
          <div className={styles.container}>
            <h2 className={styles.filterTitle}>Browse by Category</h2>
            <div className={styles.filterGrid}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`${styles.filterBtn} ${
                    activeFilter === category.id ? styles.active : ''
                  }`}
                  onClick={() => handleFilterChange(category.id)}
                >
                  <i className={`ph ph-${category.icon}`}></i>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* All Posts Grid */}
        <section className={styles.postsSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>
              {activeFilter === 'all'
                ? 'All Articles'
                : `${categories.find((c) => c.id === activeFilter)?.label} Articles`}
            </h2>

            {filteredPosts.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <i
                    className='ph ph-file-text'
                    style={{ fontSize: '4rem', color: '#37474F', opacity: 0.5 }}
                  ></i>
                </div>
                <h3>No articles found</h3>
                <p>
                  {activeFilter === 'all'
                    ? "We haven't published any articles yet. Check back soon for expert construction insights!"
                    : `No articles found in the ${activeFilter} category.`}
                </p>
                {activeFilter !== 'all' && (
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={styles.btnSecondary}
                  >
                    View All Articles
                  </button>
                )}
              </div>
            ) : (
              <div className={styles.postsGrid}>
                {filteredPosts.map((post) => (
                  <BlogPostCard key={post._id} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <div className={styles.ctaContent}>
              <h2>Ready to Start Your Project?</h2>
              <p>
                Get inspired by our articles? Let&apos;s discuss how we can
                bring that same level of geometric excellence to your
                construction project.
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