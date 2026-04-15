'use client';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';
import { ExternalLink } from 'lucide-react';
import React from 'react';
import styles from './Projects.module.css';
import { fadeSlideScale } from '@/lib/animations';

const projects = [
  {
    title: "360CartMall",
    description: "A full-scale e-commerce platform built for seamless online shopping experiences with modern UI and optimized performance.",
    tech: ["Next.js", "Supabase", "Node.js"],
    categories: ["Full Stack", "E-commerce"],
    link: "https://360cartmall.com",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "EconMind AI",
    description: "An AI-powered business analytics system that helps digital and physical businesses track performance, identify top-selling products, and predict market trends for smarter decision-making.",
    tech: ["Next.js", "OpenAI", "TypeScript"],
    categories: ["AI", "Full Stack"],
    link: "#",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "Flipsticks",
    description: "An e-commerce website built for selling golf equipment, focused on clean design and product presentation.",
    tech: ["React", "PHP", "MySQL"],
    categories: ["E-commerce", "Full Stack"],
    link: "#",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=1000"
  }
];

const filters = ["All", "Full Stack", "AI", "E-commerce"];

const Projects = () => {
  const [activeFilter, setActiveFilter] = React.useState("All");

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true;
    return project.categories.some(
      (cat) => cat.toLowerCase().trim() === activeFilter.toLowerCase().trim()
    );
  });

  return (
    <SectionWrapper id="projects" className={styles.projects}>
      <div className={styles.container}>
        <motion.h2 
          variants={fadeSlideScale}
          className={`${styles.title} heading-gradient`}
        >
          Selected Projects
        </motion.h2>

        <motion.div 
          variants={fadeSlideScale} 
          className={styles.filterContainer}
          style={{ position: 'relative', zIndex: 10 }}
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                console.log(`Setting filter to: ${filter}`);
                setActiveFilter(filter);
              }}
              className={activeFilter === filter ? styles.activeFilterBtn : styles.filterBtn}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        <motion.div layout className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={styles.projectCard}
              >
                {/* Manual Card implementation to avoid animation conflicts */}
                <div className={styles.cardInternal}>
                  <div className={styles.imageContainer}>
                    <img src={project.image} alt={project.title} className={styles.image} />
                    <div className={styles.overlay}>
                       <div className={styles.projectLinks}>
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.iconButton}>
                          <ExternalLink size={20} />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className={styles.projectContent}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDescription}>{project.description}</p>
                    <div className={styles.techStack}>
                      {project.tech.map((t) => (
                        <span key={t} className={styles.techBadge}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Projects;
