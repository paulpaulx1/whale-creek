// app/contact/page.jsx

import ContactClient from "./ContactClient";
import SchemaMarkup from "../../components/seo/SchemaMarkup";
import { generatePageMetadata } from "../../components/seo/generateMetadata";
import { pageConfigs } from "../../lib/seo/seoConfig";

const SITE_URL = "https://www.whalecreek.co";
const PAGE_PATH = "/indianapolis-woodworker-contact";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export async function generateMetadata() {
  const contactConfig = pageConfigs.contact;

  return generatePageMetadata(contactConfig, [], PAGE_URL);
}

export default async function ContactPage() {
  return (
    <>
      <SchemaMarkup
        type="page"
        currentUrl={PAGE_URL}
        customSchemas={[
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Whale Creek Construction",
            url: PAGE_URL,
            mainEntity: {
              "@type": "LocalBusiness",
              name: "Whale Creek Construction",
              telephone: "(317) 431-2449",
              email: "dave@whalecreek.co",
            },
          },
        ]}
      />

      <ContactClient />
    </>
  );
}
