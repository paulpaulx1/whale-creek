"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../../../lib/sanity";
import styles from "./BlogPostClient.module.css";

const generateHeadingId = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const handleTocClick = (e, id) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const portableTextComponents = {
  types: {
    image: ({ value }) => (
      <figure className={styles.inlineImage}>
        <Image
          src={urlFor(value.asset).width(900).url()}
          alt={value.alt || ""}
          width={900}
          height={550}
        />
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ),
  },
  block: {
    h2: ({ children, value }) => {
      const id = generateHeadingId(value.children.map((c) => c.text).join(""));
      return (
        <h2 id={id} className={styles.h2}>
          {children}
        </h2>
      );
    },
    h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
    normal: ({ children }) => <p className={styles.p}>{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className={styles.ul}>{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => <li className={styles.li}>{children}</li>,
  },
};

export default function BlogPostClient({ post }) {
  const [toc, setToc] = useState([]);
  const [active, setActive] = useState("");

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  useEffect(() => {
    if (!post.content) return;
    const heads = post.content
      .filter((b) => b.style === "h2")
      .map((b) => {
        const text = b.children.map((c) => c.text).join("");
        return { id: generateHeadingId(text), text };
      });
    setToc(heads);
    if (heads.length) setActive(heads[0].id);
  }, [post.content]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const v = entries.find((e) => e.isIntersecting);
        if (v) setActive(v.target.id);
      },
      { rootMargin: "-40% 0% -55% 0%" }
    );

    toc.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, [toc]);

  return (
    <main className={styles.main}>
      {/* ✅ SHROUDED HERO */}
      <section className={styles.heroSection}>
        {post.featuredImage && (
          <Image
            src={urlFor(post.featuredImage.asset).width(1600).height(900).url()}
            alt={post.title}
            fill
            className={styles.heroImage}
            priority
          />
        )}

        <div className={styles.heroShroud} />

        <div className={styles.heroInner}>
          <span className={styles.heroCategory}>{post.category}</span>
          <h1 className={styles.heroTitle}>{post.title}</h1>
          <p className={styles.heroExcerpt}>{post.excerpt}</p>
          <div className={styles.heroMeta}>
            <span>{formatDate(post.publishedAt)}</span>
            {post.readingTime && <span>{post.readingTime} min read</span>}
          </div>
        </div>
      </section>

      {/* ✅ BODY */}
      <section className={styles.bodySection}>
        <div className={styles.bodyGrid}>
          {/* ✅ MAIN ARTICLE */}
          <article className={styles.articleCard}>
            <PortableText
              value={post.content}
              components={portableTextComponents}
            />
          </article>

          {/* ✅ RIGHT RAIL: STATS + TAGS + TOC */}
          <aside className={styles.sidebar}>
            {/* Meta Card */}
            <div className={styles.metaCard}>
              <div className={styles.metaItem}>
                <span>Category</span>
                <strong>{post.category}</strong>
              </div>

              <div className={styles.metaItem}>
                <span>Published</span>
                <strong>{formatDate(post.publishedAt)}</strong>
              </div>

              {post.readingTime && (
                <div className={styles.metaItem}>
                  <span>Reading Time</span>
                  <strong>{post.readingTime} min</strong>
                </div>
              )}

              {post.featured && (
                <div className={styles.featuredBadge}>Featured Article</div>
              )}
            </div>

            {/* Tags */}
            {post.tags?.length > 0 && (
              <div className={styles.tagsCard}>
                <h4>Topics</h4>
                <div className={styles.tags}>
                  {post.tags.map((t) => (
                    <span key={t} className={styles.tag}>
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* TOC */}
            {toc.length > 0 && (
              <div className={styles.tocCard}>
                <h4>In This Article</h4>
                <nav>
                  {toc.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      onClick={(e) => handleTocClick(e, h.id)}
                      className={`${styles.tocLink} ${
                        active === h.id ? styles.active : ""
                      }`}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            <Link href="/blog" className={styles.backLink}>
              ← Back to Blog
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
