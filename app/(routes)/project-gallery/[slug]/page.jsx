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

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = await client.fetch(allProjectsQuery);
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for SEO
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
    openGraph: {
      title: `${project.title} | Whale Creek Co.`,
      description: project.description,
      images: image ? [{ url: image }] : [],
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Back link */}
        <Link href="/project-gallery" className={styles.backLink}>
          ← Back to Gallery
        </Link>

        {/* Hero Section */}
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

        {/* Main Image */}
        {project.images?.[0] && (
          <div className={styles.heroImage}>
            <Image
              src={project.images[0].asset.asset.url}
              alt={project.images[0].alt || project.title}
              width={project.images[0].asset.asset.metadata.dimensions.width}
              height={project.images[0].asset.asset.metadata.dimensions.height}
              className={styles.heroImg}
              priority
              sizes="(max-width: 768px) 100vw, 1300px"
            />
          </div>
        )}

        {/* Project Details */}
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

            {/* Project Info Grid */}
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

            {/* Testimonial */}
            {/* Testimonial */}
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

          {/* Additional Images Grid */}
          {project.images && project.images.length > 1 && (
            <div className={styles.imageGrid}>
              {project.images.slice(1).map((image, idx) => (
                <div key={image._key} className={styles.gridImage}>
                  <Image
                    src={image.asset.asset.url}
                    alt={image.alt || `${project.title} image ${idx + 2}`}
                    fill
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
  );
}
