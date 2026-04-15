'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { staggerContainer } from '@/lib/animations';

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

const SectionWrapper = ({ children, id, className }: SectionWrapperProps) => {
  return (
    <motion.section
      id={id}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0 }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;
