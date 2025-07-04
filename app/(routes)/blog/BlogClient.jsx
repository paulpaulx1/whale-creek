'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../../lib/sanity';
import styles from './BlogClient.module.css';
import Filter from '../../components/Filter';

export default function BlogClient({ posts }) {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [activeFilter, setActiveFilter] = useState('all');

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

  const featuredPosts = posts.filter(post => post.featured);

  return (
    <main className={styles.main}>
      {/* Filter Section */}
      <Filter
        categories={categories}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />
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
                    {post.featuredImage ? (
                      <Image
                        src={urlFor(post.featuredImage.asset)
                          .width(800)
                          .height(400)
                          .url()}
                        alt={post.featuredImage.alt || post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div className={styles.placeholderImage}>
                        <i
                          className='ph ph-newspaper'
                          style={{
                            fontSize: '4rem',
                            color: '#999',
                            opacity: 0.5,
                          }}
                        ></i>
                        <p>Featured Article</p>
                      </div>
                    )}
                    <div className={styles.categoryBadge}>{post.category}</div>
                    <div className={styles.featuredOverlay}>
                      <div className={styles.featuredInfo}>
                        <h3>{post.title}</h3>
                        <p>{post.excerpt}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
                  style={{ fontSize: '4rem', color: '#999', opacity: 0.5 }}
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
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className={styles.postCard}
                >
                  <div className={styles.postImage}>
                    {post.featuredImage ? (
                      <Image
                        src={urlFor(post.featuredImage.asset)
                          .width(600)
                          .height(250)
                          .url()}
                        alt={post.featuredImage.alt || post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div className={styles.placeholderImage}>
                        <i
                          className='ph ph-newspaper'
                          style={{
                            fontSize: '3rem',
                            color: '#999',
                            opacity: 0.5,
                          }}
                        ></i>
                        <p>No image available</p>
                      </div>
                    )}
                    <div className={styles.categoryBadge}>{post.category}</div>
                  </div>
                  <div className={styles.postContent}>
                    <h3 className={styles.postTitle}>{post.title}</h3>
                    <p className={styles.postExcerpt}>{post.excerpt}</p>
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
                      <span>Read More</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}