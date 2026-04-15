'use client';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, ArrowUp } from 'lucide-react';
import styles from './Footer.module.css';
import { staggerContainer, fadeSlideScale } from '@/lib/animations';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer 
      className={styles.footer}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.container}>
        <motion.div variants={fadeSlideScale} className={styles.top}>
          <div className={styles.brand}>
            <h2 className={styles.logo}>HR<span>.</span></h2>
            <p className={styles.tagline}>Designing the future, one pixel at a time.</p>
          </div>
          
          <div className={styles.socials}>
            <a href="https://github.com/Hasnainhub" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <Github />
            </a>
            {/* 
            <a href="https://linkedin.com/in/hasnain-raza" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <Linkedin />
            </a>
            <a href="https://twitter.com/hasnainraza" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <Twitter />
            </a>
            */}
          </div>
        </motion.div>

        <motion.div variants={fadeSlideScale} className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Hasnain Raza. All rights reserved.
          </p>
          <button onClick={scrollToTop} className={styles.scrollTop}>
            <ArrowUp size={20} />
          </button>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
