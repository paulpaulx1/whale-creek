// src/app/test-sanity/page.js - App Router version
import { client } from "../lib/sanity";

async function getProjects() {
    try {
      console.log('Testing different queries...');
      
      // First, let's get ALL fields to see what exists
      const allFields = await client.fetch(`
        *[_type == "project"][0]
      `);
      console.log('Sample project with ALL fields:', JSON.stringify(allFields, null, 2));
      
      // Now let's try a more specific query
      const projects = await client.fetch(`
        *[_type == "project"] {
          ...,
          "imageCount": count(images),
          "hasImages": defined(images)
        }
      `);
      
      console.log('Projects with spread operator:', JSON.stringify(projects, null, 2));
      return projects || [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  }

export default async function TestSanity() {
  const projects = await getProjects();

  // Debug info
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  return (
    <div style={{ padding: "2rem", marginTop: "200px" }}>
      <h1>Sanity Connection Test</h1>

      {/* Debug section */}
      <div
        style={{ background: "#f0f0f0", padding: "1rem", marginBottom: "1rem" }}
      >
        <h3>Debug Info:</h3>
        <p>
          <strong>Project ID:</strong> {projectId || "NOT FOUND"}
        </p>
        <p>
          <strong>Dataset:</strong> {dataset || "NOT FOUND"}
        </p>
      </div>

      <p>Found {projects.length} projects:</p>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <strong>{project.title}</strong> - {project.category}
          </li>
        ))}
      </ul>
    </div>
  );
}
