'use client';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';
import Card from '@/components/Card';
import styles from './About.module.css';
import { fadeSlideScale } from '@/lib/animations';

const skills = [
  "React.js", "Next.js", "Node.js", "TypeScript", 
  "JavaScript", "PHP", "Supabase", "MongoDB", 
  "MySQL", "RESTful APIs", "API Integration", 
  "System Architecture", "UI/UX Design", "SEO Optimization",
  "Performance Optimization", "Database Design", "Git & Version Control"
];

const About = () => {
  return (
    <SectionWrapper id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.info}>
          <motion.h2 
            variants={fadeSlideScale}
            className={`${styles.title} heading-gradient`}
          >
            About Me
          </motion.h2>
          <motion.p 
            variants={fadeSlideScale}
            className={styles.description}
          >
            I’m a results-driven <strong>CTO and Full Stack Developer</strong> with over 3 years of experience building scalable, high-performance digital products. 
            My expertise spans across modern web technologies including <strong>React, Next.js, Node.js, PHP, and cloud-based solutions</strong>. 
            I specialize in designing and developing systems that are not only functional but optimized for performance, scalability, and user experience. 
            I’m passionate about crafting premium digital solutions that combine clean design, efficient architecture, and real-world impact.
          </motion.p>
        </div>

        <div className={styles.skillsContainer}>
          <h3 className={styles.subtitle}>Skills & Technologies</h3>
          <div className={styles.skillsGrid}>
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                variants={fadeSlideScale}
                whileHover={{ scale: 1.1, color: 'var(--accent)' }}
                className={styles.skillItem}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
