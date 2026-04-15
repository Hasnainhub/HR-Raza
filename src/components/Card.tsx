'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Card.module.css';
import { fadeSlideScale } from '@/lib/animations';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <motion.div
      variants={fadeSlideScale}
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
