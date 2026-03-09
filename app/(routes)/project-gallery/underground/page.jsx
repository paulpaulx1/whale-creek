import Link from "next/link";
import Image from "next/image";
import { client } from "../../../lib/sanity";
import styles from "./Underground.module.css";

export const revalidate = 300;

export const metadata = {
  title: "Whale Creek Underground | Excavation Services",
  description:
    "Whale Creek Underground — excavation, grading, and site work in the Indianapolis area.",
};

const undergroundQuery = `
  *[_type == "project" && category == "underground" && defined(slug.current)]
  | order(completedDate desc) {
    _id,
    title,
    description,
    location,
    completedDate,
    "slug": slug.current,
    images[0...1]{
      _key,
      alt,
      caption,
      asset{
        asset->{
          _id,
          url,
          "urlGrid": url + "?w=1200&fit=max&auto=format&q=82",
          metadata{ dimensions }
        }
      }
    }
  }
`;

async function getUndergroundProjects() {
  try {
    return await client.fetch(undergroundQuery);
  } catch (error) {
    console.error("Error fetching underground projects:", error);
    return [];
  }
}

export default async function UndergroundPage() {
  const projects = await getUndergroundProjects();

  return (
    <main className={styles.main}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroNoise} aria-hidden="true" />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Whale Creek</p>
          <h1 className={styles.headline}>Underground</h1>
          <p className={styles.subhead}>
            We go deeper. Excavation, grading, and site work — the foundation
            everything else is built on.
          </p>
        </div>
        <div className={styles.heroScroll} aria-hidden="true">
          <span />
        </div>
      </section>

      {/* Project Grid */}
      <section className={styles.gridSection}>
        <div className={styles.grid}>
          {projects.length > 0 ? (
            projects.map((project) => {
              const cover = project.images?.[0];
              const src =
                cover?.asset?.asset?.urlGrid || cover?.asset?.asset?.url;

              return (
                <Link
                  key={project._id}
                  href={`/project-gallery/underground/${project.slug}`}
                  className={styles.card}
                >
                  <div className={styles.cardImage}>
                    {src && (
                      <Image
                        src={src}
                        alt={cover?.alt || project.title}
                        fill
                        className={styles.cardImg}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        unoptimized
                      />
                    )}
                    <div className={styles.cardOverlay} />
                  </div>
                  <div className={styles.cardInfo}>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    {project.location && (
                      <span className={styles.cardLocation}>
                        {project.location}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })
          ) : (
            <div className={styles.empty}>
              <span className={styles.emptyLine} />
              <p className={styles.emptyText}>Projects coming soon.</p>
              <span className={styles.emptyLine} />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
