'use client';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';
import styles from './Experience.module.css';
import { fadeSlideScale, fadeSlideLeft, fadeSlideRight } from '@/lib/animations';

const experiences = [
  {
    company: "Syncbit",
    role: "Chief Technology Officer",
    period: "February 2026 – Present",
    description: [
      "Leading technical strategy and product development",
      "Designing scalable system architecture for digital platforms",
      "Overseeing engineering processes and technical decision-making",
      "Ensuring performance, security, and reliability of applications"
    ]
  },
  {
    company: "Halimak E-Solutions",
    role: "Chief Technology Officer / Lead Developer",
    period: "July 2023 – Present",
    description: [
      "Leading the development of scalable web applications and digital platforms",
      "Managing technical architecture and system design decisions",
      "Overseeing development teams and ensuring high-quality code standards",
      "Driving innovation and implementing modern technologies across projects"
    ]
  },
  {
    company: "Halimak E-Solutions",
    role: "Full Stack Developer",
    period: "May 2022 – July 2023",
    description: [
      "Developed and maintained full-stack web applications",
      "Built responsive frontend interfaces and robust backend systems",
      "Integrated APIs and optimized database performance",
      "Collaborated with team members to deliver efficient digital solutions"
    ]
  },
  {
    company: "Aptech",
    role: "Web Developer (Internship)",
    period: "December 2024 - May 2025",
    description: [
      "Assisted in developing and maintaining web applications",
      "Worked on frontend UI improvements and backend integrations",
      "Gained hands-on experience with modern development tools and workflows"
    ]
  },
  {
    company: "Freelance",
    role: "Full Stack Developer",
    period: "April 2022 – Present",
    description: [
      "Delivered custom web solutions for clients across different industries",
      "Built and deployed full-stack applications tailored to business needs",
      "Provided technical consulting and performance optimization",
      "Managed end-to-end development from concept to deployment"
    ]
  }
];

const Experience = () => {
  return (
    <SectionWrapper id="experience" className={styles.experience}>
      <div className={styles.container}>
        <motion.h2 
          variants={fadeSlideScale} 
          className={`${styles.title} heading-gradient`}
        >
          Experience
        </motion.h2>
        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <motion.div 
              key={`${exp.company}-${exp.role}-${index}`}
              variants={index % 2 === 0 ? fadeSlideLeft : fadeSlideRight}
              className={styles.timelineItem}
            >
              <div className={styles.timelineContent}>
                <span className={styles.period}>{exp.period}</span>
                <h3 className={styles.role}>{exp.role}</h3>
                <h4 className={styles.company}>{exp.company}</h4>
                <ul className={styles.descriptionList}>
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.dot} />
            </motion.div>
          ))}
          <div className={styles.line} />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Experience;
