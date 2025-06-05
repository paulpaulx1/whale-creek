// src/app/project-gallery/page.js
import GalleryClient from './GalleryClient';
import { client } from '../../lib/sanity';

const galleryQuery = `
  *[_type == "project"] | order(featured desc, completedDate desc) {
    _id,
    title,
    slug,
    category,
    description,
    featured,
    completedDate,
    location,
    client,
    images[] {
      _key,
      alt,
      caption,
      asset {
        asset-> {
          _id,
          url,
          metadata {
            dimensions
          }
        }
      }
    },
    tags[]
  }
`;

async function getProjects() {
  try {
    const projects = await client.fetch(galleryQuery);
    return projects || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export const metadata = {
  title: 'Project Gallery | Whale Creek Construction | Indianapolis',
  description: 'Explore our portfolio of custom millwork, residential construction, and commercial projects in Indianapolis. Award-winning craftsmanship and geometric design excellence.',
};

export default async function ProjectGallery() {
  const projects = await getProjects();

  return <GalleryClient projects={projects} />;
}