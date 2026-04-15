'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';
import Button from '@/components/Button';
import { supabase } from '@/lib/supabase';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import styles from './Contact.module.css';
import { fadeSlideScale } from '@/lib/animations';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <SectionWrapper id="contact" className={styles.contact}>
      <div className={styles.container}>
        <motion.div variants={fadeSlideScale} className={styles.info}>
          <h2 className={`${styles.title} heading-gradient`}>Get In Touch</h2>
          <p className={styles.description}>
            Have a project in mind or want to collaborate? I'm always open to discussing new opportunities and futuristic digital solutions.
          </p>

          <div className={styles.contactDetails}>
            <div className={styles.detailItem}>
              <Mail className={styles.icon} />
              <span>rhasnain286@gmail.com</span>
            </div>
            <div className={styles.detailItem}>
              <MapPin className={styles.icon} />
              <span>Kano, Nigeria</span>
            </div>
            <div className={styles.detailItem}>
              <Phone className={styles.icon} />
              <span>+2348087395768</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={fadeSlideScale}
          className={styles.formContainer}
        >
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Name"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Your Email"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                required 
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Message Subject"
              />
            </div>
            <div className={styles.honeypot} aria-hidden="true">
              <input 
                type="text" 
                name="honeypot" 
                tabIndex={-1} 
                autoComplete="off"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                rows={5} 
                required 
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can I help you?"
              />
            </div>

            <Button type="submit" disabled={status === 'loading'} className={styles.submitBtn}>
              {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Send Message'}
              <Send size={18} style={{ marginLeft: '10px' }} />
            </Button>
            
            {status === 'error' && <p className={styles.error}>Something went wrong. Please try again.</p>}
          </form>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
