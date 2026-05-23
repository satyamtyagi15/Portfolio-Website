import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/about', label: 'About', icon: '👤' },
    { to: '/projects', label: 'Projects', icon: '📁' },
    { to: '/achievements', label: 'Achievements', icon: '🏆' },
    { to: '/contact', label: 'Contact', icon: '📧' }
  ];

  return (
    <>
      <button 
        className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span><span></span><span></span>
      </button>
      <motion.nav 
        className={`${styles.sidebar} ${isOpen ? styles.mobileOpen : ''} ${scrolled ? styles.scrolled : ''}`}
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className={styles.logo}>
          <span className={styles.logoText}>ST</span>
          <div className={styles.logoGlow}></div>
        </div>
        <ul className={styles.navLinks}>
          {links.map(link => (
            <li key={link.to}>
              <NavLink 
                to={link.to} 
                className={({ isActive }) => isActive ? styles.active : ''}
                onClick={() => setIsOpen(false)}
              >
                <span className={styles.icon}>{link.icon}</span>
                <span className={styles.label}>{link.label}</span>
                <div className={styles.linkGlow}></div>
              </NavLink>
            </li>
          ))}
        </ul>
        <div className={styles.socialMini}>
          <a href="https://github.com/satyamtyagi15" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.698.83.578C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/satyam-tyagi1s/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"/>
            </svg>
          </a>
          <a href="https://www.youtube.com/@astroknight.15" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;