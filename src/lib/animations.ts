import { Variants } from 'framer-motion';

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const fadeSlideScale: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40, 
    scale: 0.95 
  },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1] 
    }
  },
};

export const fadeSlideLeft: Variants = {
  hidden: { opacity: 0, x: -50, scale: 0.95 },
  show: { 
    opacity: 1, x: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export const fadeSlideRight: Variants = {
  hidden: { opacity: 0, x: 50, scale: 0.95 },
  show: { 
    opacity: 1, x: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};
