import { client } from "../lib/sanity";
import AboutContent from "./AboutContent";

const query = `*[_id == "aboutSection"][0]{
  kicker,
  headline,
  bodyParagraphs,
  helpCard {
    title,
    items,
    primaryCtaText,
    primaryCtaHref,
    secondaryCtaText,
    secondaryCtaHref,
  }
}`;

export const AboutSection = async () => {
  const data = await client.fetch(
    query,
    {},
    { next: { tags: ["aboutSection"] } },
  );
  console.log(data, 'data');
  if (!data.kicker) return <></>;
  else return <AboutContent data={data} />;
};
