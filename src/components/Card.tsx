'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const Card = ({ children, className, delay = 0 }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      whileHover={{ 
        y: -10,
        boxShadow: '0 20px 40px rgba(0, 191, 255, 0.15)'
      }}
      className={clsx(styles.card, className)}
    >
      {children}
    </motion.div>
  );
};

export default Card;
