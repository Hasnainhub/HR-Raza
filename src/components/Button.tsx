'use client';
import { motion } from 'framer-motion';
import { ReactNode, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: ReactNode;
}

const Button = ({ variant = 'primary', children, className, ...props }: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: '0 0 15px var(--accent)' }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={clsx(styles.btn, styles[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
