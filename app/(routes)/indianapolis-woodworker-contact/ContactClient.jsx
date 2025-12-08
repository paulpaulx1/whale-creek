"use client";

import { useState } from "react";
import styles from "./Contact.module.css";
import { PhoneIcon, AtIcon, PaperPlaneTiltIcon } from "@phosphor-icons/react";

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState("");

  const services = [
    "Custom Millwork",
    "Residential Construction",
    "Commercial Projects",
    "Kitchen Cabinetry",
    "Home Renovation",
    "General Contracting",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "da50ebeb-4f05-4ee2-8c37-441bd39d44a0",
          ...formData,
        }),
      });

      if (response.ok) {
        setResult("Thank you — your message is on its way.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        setResult("Something went wrong. Please try again.");
      }
    } catch {
      setResult("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.main}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1>
            Contact <span>Whale Creek</span>
          </h1>
          <p>
            Ready to bring your vision to life? <br />
            Get in touch with us through email, phone, or by filling out the
            form below.
          </p>
          <div className={styles.heroDivider} />
        </div>
      </section>

      {/* FORM */}
      <section className={styles.contactSection}>
        <div className={styles.grid}>
          {/* FORM */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fieldRow}>
              <input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.fieldRow}>
              <input
                name="phone"
                placeholder="Phone (optional)"
                value={formData.phone}
                onChange={handleChange}
              />

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="">Select a service</option>
                {services.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <textarea
              name="message"
              placeholder="Tell us a bit about the project..."
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button disabled={isSubmitting}>
              {isSubmitting ? (
                "Sending…"
              ) : (
                <>
                  Send Message <PaperPlaneTiltIcon size={18} />
                </>
              )}
            </button>

            {result && (
              <div
                className={`${styles.result} ${
                  result.includes("Thank") ? styles.success : styles.error
                }`}
              >
                {result}
              </div>
            )}
          </form>

          {/* INFO */}
          <aside className={styles.info}>
            <div className={styles.infoCard}>
              <PhoneIcon size={22} />
              <span>(317) 431-2449</span>
            </div>

            <div className={styles.infoCard}>
              <AtIcon size={22} />
              <span>dave@whalecreek.co</span>
            </div>

            <ul className={styles.trustList}>
              <li>25+ years experience</li>
              <li>Licensed & insured</li>
              <li>Central Indiana specialists</li>
              <li>Design-build workflow</li>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
