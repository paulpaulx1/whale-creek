// src/app/sitemap.js

import { client } from "./lib/sanity";

const SITE_URL = "https://www.whalecreek.co";

export default async function sitemap() {
  const [posts, projects] = await Promise.all([
    client.fetch(
      `*[
        _type == "blogPost" &&
        status == "published" &&
        defined(slug.current) &&
        !(_id in path("drafts.**"))
      ]{
        "slug": slug.current,
        _updatedAt
      }`,
      {},
      { next: { tags: ["sanity"] } },
    ),

    client.fetch(
      `*[
        _type == "project" &&
        defined(slug.current) &&
        !(_id in path("drafts.**"))
      ]{
        "slug": slug.current,
        category,
        _updatedAt
      }`,
      {},
      { next: { tags: ["sanity"] } },
    ),
  ]);

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/indianapolis-general-contractor`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/indianapolis-woodworker-contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/project-gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/project-gallery/underground`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post._updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    })),

    ...projects.map((project) => ({
      url:
        project.category === "underground"
          ? `${SITE_URL}/project-gallery/underground/${project.slug}`
          : `${SITE_URL}/project-gallery/${project.slug}`,
      lastModified: project._updatedAt,
      changeFrequency: "monthly",
      priority: project.category === "underground" ? 0.75 : 0.7,
    })),
  ];
}
