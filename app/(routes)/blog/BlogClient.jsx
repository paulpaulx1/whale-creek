"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../lib/sanity";
import styles from "./BlogClient.module.css";
import Filter from "../../components/Filter";

export default function BlogClient({ posts }) {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    { id: "all", label: "All" },
    { id: "millwork", label: "Millwork" },
    { id: "tips", label: "Tips" },
    { id: "spotlights", label: "Spotlights" },
    { id: "tools", label: "Tools" },
    { id: "behind-scenes", label: "Behind the Scenes" },
  ];

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((post) => post.category === activeFilter));
    }
  }, [activeFilter, posts]);

  return (
    <main className={styles.main}>
      {/* Minimal Filter */}
      <Filter
        categories={categories}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        minimal
      />

      {/* Clean Editorial Grid */}
      <section className={styles.postsSection}>
        <div className={styles.container}>
          <div className={styles.postsGrid}>
            {filteredPosts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className={styles.postCard}
              >
                <div className={styles.imageWrap}>
                  {post.featuredImage?.asset && (
                    <Image
                      src={urlFor(post.featuredImage.asset)
                        .width(600)
                        .height(360)
                        .url()}
                      alt={post.featuredImage.alt || post.title}
                      fill
                      className={styles.postImg}
                    />
                  )}
                </div>

                <div className={styles.postContent}>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>

                  <span className={styles.readMore}>Read Article →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
