'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import styles from './Navbar.module.css';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = navLinks.map(link => link.href.substring(1));
      let current = '';
      const scrollY = window.scrollY;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          // Offset for navbar and visual comfort
          if (scrollY >= top - 300 && scrollY < top + height - 300) {
            current = section;
          }
        }
      }
      
      if (scrollY < 100) {
        current = '';
      }
      setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={clsx(styles.navbar, scrolled && styles.scrolled)}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          HR<span>.</span>
        </Link>

        {/* Desktop Links */}
        <ul className={styles.navLinks}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <li key={link.name} className={styles.navItem}>
                <Link 
                  href={link.href} 
                  className={clsx(styles.link, isActive && styles.activeLink)}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className={styles.activePill}
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className={styles.linkLabel}>{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Icon */}
        <button className={styles.mobileOpen} onClick={() => setIsOpen(true)}>
          <Menu />
        </button>
      </div>

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={styles.mobileMenu}
          >
            <button className={styles.mobileClose} onClick={() => setIsOpen(false)}>
              <X />
            </button>
            <ul className={styles.mobileNavLinks}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className={styles.mobileLink}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
