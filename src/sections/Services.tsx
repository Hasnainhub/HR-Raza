'use client';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';
import Card from '@/components/Card';
import { Code, Layout, Database, Rocket, Globe, Lightbulb, Zap, Monitor, Server, MessageSquare } from 'lucide-react';
import styles from './Services.module.css';
import { fadeSlideScale } from '@/lib/animations';

const services = [
  {
    icon: <Globe />,
    title: "Full Stack Web Development",
    description: "Building scalable, high-performance web applications from frontend to backend."
  },
  {
    icon: <Monitor />,
    title: "Custom Web Applications",
    description: "Developing tailored solutions for businesses, startups, and digital platforms."
  },
  {
    icon: <Layout />,
    title: "UI/UX Design",
    description: "Designing clean, modern, and user-focused digital interfaces."
  },
  {
    icon: <Server />,
    title: "Backend & System Architecture",
    description: "Creating secure, scalable, and optimized backend systems."
  },
  {
    icon: <Zap />,
    title: "Performance Optimization",
    description: "Improving speed, efficiency, and scalability of existing systems."
  },
  {
    icon: <Lightbulb />,
    title: "Technical Consulting",
    description: "Providing expert guidance for startups and digital product development."
  }
];

const Services = () => {
  return (
    <SectionWrapper id="services" className={styles.services}>
      <div className={styles.container}>
        <motion.h2 
          variants={fadeSlideScale} 
          className={`${styles.title} heading-gradient`}
        >
          Services
        </motion.h2>
        <div className={styles.grid}>
          {services.map((service, index) => (
            <Card key={service.title} className={styles.serviceCard}>
              <div className={styles.iconContainer}>
                {service.icon}
              </div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Services;
