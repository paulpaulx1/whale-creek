// app/project-gallery/[slug]/page.jsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "../../../lib/sanity";
import { PortableText } from "@portabletext/react";
import CTASection from "../../../components/CTASection";
import MasonryGallery from "./MasonryGallery.client";
import styles from "./ProjectPage.module.css";

const projectQuery = `
  *[_type == "project" && slug.current == $slug][0]{
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
    video {
      asset->{
        playbackId,
        data {
          aspect_ratio
        }
      }
    },
    images[]{
      _key,
      alt,
      caption,
      "url": asset.asset->url,
      "urlGrid": asset.asset->url + "?w=1600&fit=max&auto=format&q=80",
      "urlLightbox": asset.asset->url + "?w=2200&fit=max&auto=format&q=82",
      "dimensions": asset.asset->metadata.dimensions
    }
  }
`;

const allProjectsQuery = `
  *[_type == "project" && defined(slug.current)]{"slug": slug.current}
`;

async function getProject(slug) {
  try {
    return await client.fetch(projectQuery, { slug });
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export async function generateStaticParams() {
  const projects = await client.fetch(allProjectsQuery);
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return { title: "Project Not Found" };

  const image = project.images?.[0]?.url;

  return {
    title: `${project.title} | Whale Creek Co.`,
    description:
      project.description ||
      `${project.category} project by Whale Creek Co. in ${project.location || "Indiana"}`,
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

function humanCategory(value) {
  const map = {
    millwork: "Custom Millwork",
    residential: "Residential Construction",
    commercial: "Commercial Construction",
    cabinetry: "Custom Cabinetry",
    renovation: "Renovation & Remodeling",
    cnc: "CNC Manufacturing",
  };
  return map[value] || value;
}

function formatProjectValue(value) {
  const map = {
    "5k-15k": "$5K – $15K",
    "15k-50k": "$15K – $50K",
    "50k-100k": "$50K – $100K",
    "100k+": "$100K+",
  };
  return map[value] || value;
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const year = project.completedDate
    ? new Date(project.completedDate).getFullYear()
    : null;

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        {/* Back link - mobile first */}
        <Link href="/project-gallery" className={styles.backLink}>
          ← Gallery
        </Link>

        {/* Main Content - Masonry Grid */}
        <div className={styles.content}>
          <MasonryGallery 
            images={project.images || []} 
            title={project.title}
            video={project.video || null}
          />
        </div>

        {/* Sidebar - Project Details */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarContent}>
            <h1 className={styles.title}>{project.title}</h1>

            {project.description && (
              <p className={styles.description}>{project.description}</p>
            )}

            <div className={styles.meta}>
              {project.location && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Location</span>
                  <span className={styles.metaValue}>{project.location}</span>
                </div>
              )}

              {project.completedDate && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Completed</span>
                  <span className={styles.metaValue}>
                    {new Date(project.completedDate).toLocaleDateString(
                      undefined,
                      { year: "numeric", month: "long" },
                    )}
                  </span>
                </div>
              )}

              {project.category && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Category</span>
                  <span className={styles.metaValue}>
                    {humanCategory(project.category)}
                  </span>
                </div>
              )}

              {project.projectValue && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Project Value</span>
                  <span className={styles.metaValue}>
                    {formatProjectValue(project.projectValue)}
                  </span>
                </div>
              )}

              {project.client && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Client</span>
                  <span className={styles.metaValue}>{project.client}</span>
                </div>
              )}
            </div>

            {project.materials?.length > 0 && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Materials</h3>
                <div className={styles.tags}>
                  {project.materials.map((m) => (
                    <span key={m} className={styles.tag}>
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.tags?.length > 0 && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Services</h3>
                <div className={styles.tags}>
                  {project.tags.map((t) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.longDescription?.length > 0 && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>About This Project</h3>
                <div className={styles.portable}>
                  <PortableText value={project.longDescription} />
                </div>
              </div>
            )}

            {project.testimonial?.quote && (
              <div className={styles.section}>
                <blockquote className={styles.testimonial}>
                  <p className={styles.quote}>
                    &ldquo;{project.testimonial.quote}&rdquo;
                  </p>
                  {(project.testimonial.author ||
                    project.testimonial.authorTitle) && (
                    <footer className={styles.testimonialFooter}>
                      {project.testimonial.author && (
                        <cite className={styles.testimonialAuthor}>
                          {project.testimonial.author}
                        </cite>
                      )}
                      {project.testimonial.authorTitle && (
                        <span className={styles.testimonialTitle}>
                          {project.testimonial.authorTitle}
                        </span>
                      )}
                    </footer>
                  )}
                </blockquote>
              </div>
            )}

            <div className={styles.ctas}>
              <Link className={styles.primaryBtn} href="/contact">
                Request an Estimate
              </Link>
              <Link className={styles.secondaryBtn} href="/services">
                View All Services
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <CTASection />
    </main>
  );
}