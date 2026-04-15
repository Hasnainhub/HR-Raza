'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import styles from './Hero.module.css';
import { staggerContainer, fadeSlideScale } from '@/lib/animations';
import Lottie from 'lottie-react';
import backgroundAnimation from '../../public/animations/background.json';
import { ChevronDown } from 'lucide-react';

const roles = ["CTO", "Full Stack Developer", "Tech Visionary"];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    if (!isDeleting && displayedText === currentRole) {
      const timeoutId = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeoutId);
    }

    if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const typingSpeed = isDeleting ? 40 : 80;

    const timeoutId = setTimeout(() => {
      setDisplayedText((prev) => 
        isDeleting ? currentRole.slice(0, prev.length - 1) : currentRole.slice(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeoutId);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <section className={styles.hero} id="hero">
      {/* Background Lottie & Gradient Orbs */}
      <div className={styles.lottieBackground}>
        <Lottie animationData={backgroundAnimation} loop={true} style={{ width: '100%', height: '100%' }} />
      </div>
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <motion.div 
        className={styles.content}
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={fadeSlideScale}
          className={styles.greeting}
        >
          Hello, I'm
        </motion.p>
        
        <motion.h1
          variants={fadeSlideScale}
          className={`${styles.name} heading-gradient`}
        >
          Hasnain Raza
        </motion.h1>

        <motion.div
         variants={fadeSlideScale}
         className={styles.typewriter}
        >
          I am a <span>{displayedText}</span>
          <span className={styles.cursor}>|</span>
        </motion.div>

        <motion.p
          variants={fadeSlideScale}
          className={styles.bio}
        >
          Building high-performance, scalable, and futuristic digital experiences with a focus on premium quality and innovation.
        </motion.p>

        <motion.div
           variants={fadeSlideScale}
           className={styles.actions}
        >
           <Button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            View Projects
          </Button>
          <Button 
            variant="outline" 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get In Touch
          </Button>
        </motion.div>
      </motion.div>

      <ChevronDown 
        size={32} 
        className={styles.scrollIndicator} 
        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
      />
    </section>
  );
};

export default Hero;
