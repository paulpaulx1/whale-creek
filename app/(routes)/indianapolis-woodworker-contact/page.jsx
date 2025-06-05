// app/contact/page.js
'use client';

import { useState } from 'react';
import styles from './Contact.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'da50ebeb-4f05-4ee2-8c37-441bd39d44a0', // Replace with your actual key
          ...formData,
        }),
      });

      if (response.ok) {
        setResult('Thank you! Your message has been sent successfully.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setResult('Something went wrong. Please try again.');
      }
    } catch (error) {
      setResult('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Kinetic Background */}
      <div className={styles.kineticBg}>
        <div className={`${styles.floatingElement} ${styles.floatSaw}`}>🪚</div>
        <div className={`${styles.floatingElement} ${styles.floatRuler}`}>
          📏
        </div>
        <div className={`${styles.floatingElement} ${styles.floatHammer}`}>
          🔨
        </div>
        <div
          className={`${styles.floatingElement} ${styles.floatSquare}`}
        ></div>
        <div
          className={`${styles.floatingElement} ${styles.floatTriangle}`}
        ></div>

        {/* Construction elements */}
        <div className={`${styles.constructionElement} ${styles.beam}`}></div>
        <div className={`${styles.constructionElement} ${styles.beam}`}></div>
        <div className={`${styles.constructionElement} ${styles.screw}`}></div>
        <div className={`${styles.constructionElement} ${styles.screw}`}></div>
        <div className={`${styles.constructionElement} ${styles.plank}`}></div>
        <div className={`${styles.constructionElement} ${styles.plank}`}></div>
      </div>

      <main className={styles.main}>
        <div className={styles.contactContainer}>
          {/* Memphis Shapes */}
          <div
            className={`${styles.memphisShape} ${styles.memphisCircle}`}
          ></div>
          <div
            className={`${styles.memphisShape} ${styles.memphisTriangle}`}
          ></div>

          {/* Header Section */}
          <div className={styles.contactHeader}>
            <h1 className={styles.contactTitle}>
              Contact <span className={styles.titleAccent}>Whale Creek</span>
            </h1>
            <p className={styles.contactIntro}>
              Have a project in mind? Get in touch with our team.
            </p>

            {/* Decorative circles */}
            <div className={styles.headerCircles}>
              <div className={styles.headerCircle}></div>
              <div className={styles.headerCircle}></div>
              <div className={styles.headerCircle}></div>
              <div className={styles.headerCircle}></div>
              <div className={styles.headerCircle}></div>
            </div>
          </div>

          {/* Contact Form */}
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor='name' className={styles.formLabel}>
                  <i className={styles.labelIcon}>👤</i>
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder='Your name'
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor='email' className={styles.formLabel}>
                  <i className={styles.labelIcon}>📧</i>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder='your.email@example.com'
                  required
                />
              </div>

              <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                <label htmlFor='message' className={styles.formLabel}>
                  <i className={styles.labelIcon}>💬</i>
                  Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.formTextarea}
                  rows='6'
                  placeholder='Tell us about your project...'
                  required
                ></textarea>
              </div>
            </div>

            <button
              type='submit'
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.spinner}></span>
                  Sending...
                </>
              ) : (
                <>
                  <i className={styles.btnIcon}>🚀</i>
                  Send Message
                </>
              )}
            </button>

            {result && (
              <div
                className={`${styles.result} ${result.includes('Thank you') ? styles.success : styles.error}`}
              >
                {result}
              </div>
            )}
          </form>

          {/* Contact Info */}
          <div className={styles.contactInfo}>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>📍</div>
                <h3>Visit Us</h3>
                <p>
                  Whale Creek
                  <br />
                  Location TBD
                </p>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>📞</div>
                <h3>Call Us</h3>
                <p>+1 (555) 123-4567</p>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>⏰</div>
                <h3>Working Hours</h3>
                <p>
                  Mon - Fri: 9AM - 6PM
                  <br />
                  Sat: 10AM - 4PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
