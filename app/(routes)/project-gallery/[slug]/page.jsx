import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "../../../lib/sanity";
import { PortableText } from "@portabletext/react";
import CTASection from "../../../components/CTASection";
import styles from "./ProjectPage.module.css";

const projectQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    location,
    client,
    completedDate,
    description,
    longDescription,
    materials,
    projectValue,
    tags,
    testimonial,
    featured,
    images[] {
      _key,
      alt,
      caption,
      asset {
        asset-> {
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        }
      }
    }
  }
`;

const allProjectsQuery = `
  *[_type == "project" && defined(slug.current)] {
    "slug": slug.current
  }
`;

async function getProject(slug) {
  try {
    const project = await client.fetch(projectQuery, { slug });
    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export async function generateStaticParams() {
  const projects = await client.fetch(allProjectsQuery);
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const image = project.images?.[0]?.asset?.asset?.url;

  return {
    title: `${project.title} | Whale Creek Co.`,
    description:
      project.description ||
      `${project.category} project by Whale Creek Co. in ${project.location}`,
    authors: [{ name: "Whale Creek Construction" }],
    robots: "index, follow",
    openGraph: {
      title: `${project.title} | Whale Creek Co.`,
      description: project.description,
      images: image ? [{ url: image }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Whale Creek Co.`,
      description: project.description,
      images: image ? [image] : [],
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  // Generate structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `https://whalecreek.co/project-gallery/${slug}`,
    name: project.title,
    description:
      project.description || `${project.category} project by Whale Creek Co.`,
    image:
      project.images?.map((img) => img.asset?.asset?.url).filter(Boolean) || [],
    creator: {
      "@type": "Organization",
      name: "Whale Creek Co.",
      url: "https://whalecreek.co",
      logo: "https://whalecreek.co/logo.png",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Indianapolis",
        addressRegion: "IN",
        addressCountry: "US",
      },
    },
    ...(project.location && {
      locationCreated: {
        "@type": "Place",
        address: project.location,
      },
    }),
    ...(project.completedDate && {
      datePublished: project.completedDate,
      dateCreated: project.completedDate,
    }),
    ...(project.materials &&
      project.materials.length > 0 && {
        material: project.materials,
      }),
    ...(project.tags &&
      project.tags.length > 0 && {
        keywords: project.tags.join(", "),
      }),
    ...(project.testimonial?.quote && {
      review: {
        "@type": "Review",
        reviewBody: project.testimonial.quote,
        ...(project.testimonial.author && {
          author: {
            "@type": "Person",
            name: project.testimonial.author,
          },
        }),
      },
    }),
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://whalecreek.co/#organization",
      name: "Whale Creek Co.",
      url: "https://whalecreek.co",
      telephone: "+1-317-431-2449",
      email: "dave@whalecreek.co",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Indianapolis",
        addressRegion: "IN",
        postalCode: "46203",
        addressCountry: "US",
      },
      areaServed: [
        "Indianapolis, IN",
        "Carmel, IN",
        "Fishers, IN",
        "Noblesville, IN",
        "Westfield, IN",
        "Zionsville, IN",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "47",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className={styles.main}>
        <div className={styles.container}>
          <Link href="/project-gallery" className={styles.backLink}>
            ← Back to Gallery
          </Link>

          <header className={styles.hero}>
            <div className={styles.heroContent}>
              <h1>{project.title}</h1>
              <div className={styles.meta}>
                {project.location && (
                  <span className={styles.location}>{project.location}</span>
                )}
                {project.category && (
                  <span className={styles.category}>{project.category}</span>
                )}
                {project.completedDate && (
                  <span className={styles.date}>
                    {new Date(project.completedDate).getFullYear()}
                  </span>
                )}
              </div>
            </div>
          </header>

          {project.images?.[0] && (
            <div className={styles.heroImage}>
              <Image
                src={project.images[0].asset.asset.url}
                alt={project.images[0].alt || project.title}
                width={project.images[0].asset.asset.metadata.dimensions.width}
                height={
                  project.images[0].asset.asset.metadata.dimensions.height
                }
                className={styles.heroImg}
                priority
                sizes="(max-width: 768px) 100vw, 1300px"
              />
            </div>
          )}

          <div className={styles.content}>
            <div className={styles.details}>
              {project.description && (
                <div className={styles.description}>
                  <p>{project.description}</p>
                </div>
              )}

              {project.longDescription && (
                <div className={styles.longDescription}>
                  <PortableText value={project.longDescription} />
                </div>
              )}

              <div className={styles.infoGrid}>
                {project.materials && project.materials.length > 0 && (
                  <div className={styles.infoBlock}>
                    <h3>Materials</h3>
                    <ul>
                      {project.materials.map((material, idx) => (
                        <li key={idx}>{material}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.tags && project.tags.length > 0 && (
                  <div className={styles.infoBlock}>
                    <h3>Services</h3>
                    <ul>
                      {project.tags.map((tag, idx) => (
                        <li key={idx}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.client && (
                  <div className={styles.infoBlock}>
                    <h3>Client</h3>
                    <p>{project.client}</p>
                  </div>
                )}
              </div>

              {project.testimonial && (
                <blockquote className={styles.testimonial}>
                  <p>"{project.testimonial.quote}"</p>
                  {(project.testimonial.author ||
                    project.testimonial.authorTitle) && (
                    <footer className={styles.testimonialFooter}>
                      {project.testimonial.author && (
                        <cite>{project.testimonial.author}</cite>
                      )}
                      {project.testimonial.authorTitle && (
                        <span>{project.testimonial.authorTitle}</span>
                      )}
                    </footer>
                  )}
                </blockquote>
              )}
            </div>

            {project.images && project.images.length > 1 && (
              <div className={styles.imageGrid}>
                {project.images.slice(1).map((image, idx) => (
                  <div key={image._key} className={styles.gridImage}>
                    <Image
                      src={image.asset.asset.url}
                      alt={image.alt || `${project.title} image ${idx + 2}`}
                      width={image.asset.asset.metadata.dimensions.width}
                      height={image.asset.asset.metadata.dimensions.height}
                      className={styles.gridImg}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 640px"
                    />
                    {image.caption && (
                      <p className={styles.caption}>{image.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <CTASection />
      </main>
    </>
  );
}
