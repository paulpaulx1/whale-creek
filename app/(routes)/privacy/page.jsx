import Link from "next/link";
import styles from "./privacy.module.css";

// Update this whenever the policy text changes. Git history gives you a
// dated record of what the policy said on any given day, which is the
// whole reason this lives in the repo instead of the CMS.
const EFFECTIVE_DATE = "August 7, 2026";

export const metadata = {
  title: "Privacy Policy | Whale Creek Construction",
  description:
    "How Whale Creek Construction handles information from visitors to whalecreek.co, including contact form submissions and video playback.",
  alternates: { canonical: "https://whalecreek.co/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.effective}>Effective {EFFECTIVE_DATE}</p>
        </header>

        <aside className={styles.summary}>
          <h2 className={styles.summaryTitle}>The short version</h2>
          <p>
            We don&rsquo;t run advertising trackers, analytics, or any tool that
            follows you to other websites. We don&rsquo;t sell your information
            to anyone. If you fill out our contact form, we use what you tell us
            to get back to you about your project &mdash; that&rsquo;s it. The
            only thing this site stores on your device is set by our video
            player, and it&rsquo;s explained below.
          </p>
        </aside>

        <section className={styles.section}>
          <h2 className={styles.heading}>Who this covers</h2>
          <p>
            This policy applies to whalecreek.co, operated by{" "}
            {/* TODO: confirm exact legal entity name */}
            Whale Creek Construction. It describes what happens to information
            when you visit the site. It doesn&rsquo;t cover anything that
            happens off the website &mdash; phone calls, in-person estimates, or
            signed contracts are handled separately.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>What we collect</h2>

          <h3 className={styles.subheading}>When you contact us</h3>
          <p>
            {/* TODO: match this list to your actual form fields */}
            Our contact form asks for your name, email address, phone number,
            and a description of your project. That message is emailed directly
            to us. We use it to respond to you, prepare an estimate, and follow
            up about the work. We don&rsquo;t add you to a marketing list, and
            we don&rsquo;t pass your information to anyone outside the company
            except where we need a subcontractor or supplier to price part of
            your job.
          </p>

          <h3 className={styles.subheading}>Automatically, when you visit</h3>
          <p>
            Our hosting provider keeps standard server logs: your IP address,
            browser type, the pages you requested, and the time you requested
            them. Every website receives this information as a basic function of
            how the internet works. We use it to keep the site running and to
            investigate problems. We don&rsquo;t use it to build a profile of
            you, and we don&rsquo;t combine it with anything else.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Cookies and video playback</h2>
          <p>
            This site sets no advertising cookies, no analytics cookies, and
            nothing that tracks you across other websites. There is no Google
            Analytics, no Facebook pixel, and no call-tracking software here.
          </p>
          <p>
            We do host video of our job sites and equipment, delivered by a
            service called Mux. When you load a page containing a video, the
            player stores two things on your device:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>A cookie</strong> holding a randomly generated viewer ID
              and a sampling value. Mux uses these to measure whether videos are
              loading and playing correctly. The ID is not linked to your name,
              email, or anything else about you, and it isn&rsquo;t used for
              advertising.
            </li>
            <li>
              <strong>A playback preference</strong> in your browser&rsquo;s
              local storage, remembering your volume and mute settings so you
              don&rsquo;t have to reset them on every video.
            </li>
          </ul>
          <p>
            You can clear both at any time through your browser settings, and
            blocking them won&rsquo;t break the site.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Services we rely on</h2>
          <p>
            Running the site means using a few outside providers. Each one sees
            only what it needs to do its job:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Vercel</strong> hosts the website and keeps the server
              logs described above.
            </li>
            <li>
              <strong>Sanity</strong> stores the text and photos you see here.
              It doesn&rsquo;t receive any information about you &mdash; the
              content is assembled before the page reaches your browser.
            </li>
            <li>
              <strong>Mux</strong> delivers and measures our video.
            </li>
            {/* TODO: name the actual email provider handling form delivery */}
            <li>
              <strong>Our email provider</strong> delivers contact form
              submissions to our inbox.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>What we don&rsquo;t do</h2>
          <p>
            We do not sell your personal information, and we never have. We do
            not share it for targeted advertising. We do not use it to build
            profiles or make automated decisions about you.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>How long we keep things</h2>
          <p>
            Contact form emails stay in our inbox as part of our normal business
            records, which we may need for warranty questions, permits, or tax
            purposes. Server logs are kept briefly by our host and then rotated
            out. If you&rsquo;d like us to delete a message you sent us, just
            ask &mdash; contact details are at the bottom of this page.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Your choices</h2>
          <ul className={styles.list}>
            <li>
              Every major browser lets you block or delete cookies and local
              storage. This site works fine either way.
            </li>
            <li>
              You can ask us what information we have about you, ask for a
              correction, or ask us to delete it.
            </li>
            <li>
              You can send Global Privacy Control or Do Not Track signals from
              your browser. Since we don&rsquo;t sell data or run advertising
              trackers, there&rsquo;s nothing for those signals to switch off
              here &mdash; but we&rsquo;re noting them so you know we&rsquo;re
              aware of them.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Children</h2>
          <p>
            This site is meant for property owners and businesses hiring a
            contractor. It isn&rsquo;t directed at children under 13, and we
            don&rsquo;t knowingly collect information from them.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Changes</h2>
          <p>
            If we add a tool that changes any of the above, we&rsquo;ll update
            this page and move the effective date at the top. Worth a look if
            you&rsquo;re curious what changed.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Questions</h2>
          <p>
            Reach us about anything on this page at{" "}
            {/* TODO: real address, phone, and mailing address */}
            <a className={styles.link} href="mailto:info@whalecreek.co">
              dave@whalecreek.co
            </a>
            , or through our{" "}
            <Link className={styles.link} href="/contact">
              contact page
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}