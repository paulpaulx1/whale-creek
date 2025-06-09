// app/contact/page.js
'use client';

import { useState } from 'react';
import styles from './Contact.module.css';
import { PhoneIcon, AtIcon  } from '@phosphor-icons/react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState('');

  const services = [
    'Custom Millwork',
    'Residential Construction',
    'Commercial Projects',
    'Kitchen Cabinetry',
    'Home Renovation',
    'General Contracting',
  ];

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
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        });
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
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1>
              Contact <span className={styles.heroAccent}>Whale Creek</span>
            </h1>
            <p className={styles.heroSubtext}>
              Ready to bring your vision to life? <br /> Get in touch with us
              through email, phone, or by filling our the form below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            {/* Contact Form */}
            <div className={styles.formSection}>
              <div className={styles.formHeader}>
                <h2>Get Your Free Estimate</h2>
                <p>
                  Tell us about your project and we will get back to you within
                  24 hours.
                </p>
              </div>

              <form className={styles.contactForm} onSubmit={handleSubmit}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor='name' className={styles.formLabel}>
                      <i className='ph ph-user'></i>
                      Full Name
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      className={styles.formInput}
                      placeholder='Your full name'
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor='email' className={styles.formLabel}>
                      <i className='ph ph-envelope'></i>
                      Email Address
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

                  <div className={styles.formGroup}>
                    <label htmlFor='phone' className={styles.formLabel}>
                      <i className='ph ph-phone'></i>
                      Phone Number
                    </label>
                    <input
                      type='tel'
                      id='phone'
                      name='phone'
                      value={formData.phone}
                      onChange={handleChange}
                      className={styles.formInput}
                      placeholder='(555) 123-4567'
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor='service' className={styles.formLabel}>
                      <i className='ph ph-hammer'></i>
                      Service Needed
                    </label>
                    <select
                      id='service'
                      name='service'
                      value={formData.service}
                      onChange={handleChange}
                      className={styles.formSelect}
                      required
                    >
                      <option value=''>Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div
                    className={`${styles.formGroup} ${styles.formGroupFull}`}
                  >
                    <label htmlFor='message' className={styles.formLabel}>
                      <i className='ph ph-chat-text'></i>
                      Project Details
                    </label>
                    <textarea
                      id='message'
                      name='message'
                      value={formData.message}
                      onChange={handleChange}
                      className={styles.formTextarea}
                      rows='6'
                      placeholder='Tell us about your project, timeline, budget, and any specific requirements...'
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
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <i className='ph ph-paper-plane-tilt'></i>
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
            </div>

            {/* Contact Info */}
            <div className={styles.infoSection}>
              <div className={styles.contactInfo}>
                <h3>Get In Touch</h3>
                <p>Contact us today for a free consultation and estimate.</p>

                <div className={styles.infoCards}>
                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>
                      <i className='ph ph-phone'>
                        <PhoneIcon size={32} />
                      </i>
                    </div>

                    <div className={styles.infoContent}>
                      <h4>Phone</h4>
                      <p>+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>
                      <i className='ph ph-envelope'>
                        <AtIcon size={32} />
                      </i>
                    </div>
                    <div className={styles.infoContent}>
                      <h4>Email</h4>
                      <p>info@whalecreek.com</p>
                    </div>
                  </div>
                </div>

                <div className={styles.ctaNote}>
                  <h4>Why Choose Whale Creek?</h4>
                  <ul>
                    <li>25+ years of experience</li>
                    <li>Licensed & fully insured</li>
                    <li>Award-winning craftsmanship</li>
                    <li>Free estimates & consultations</li>
                    <li>Local Indianapolis specialists</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Ready to Start Your Project?</h2>
            <p>
              Join hundreds of satisfied customers who trust Whale Creek for
              their construction and millwork needs.
            </p>
            <div className={styles.ctaButtons}>
              <a href='/project-gallery' className={styles.btnSecondary}>
                View Our Work
              </a>
              <a href='/services' className={styles.btnSecondary}>
                Our Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
