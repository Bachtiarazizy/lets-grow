"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./Menu.module.scss";

interface MenuLink {
  path: string;
  label: string;
}

const menuLinks: MenuLink[] = [
  { path: "/", label: "Home" },
  { path: "/work", label: "Work" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
  { path: "/lab", label: "Lab" },
];

const Menu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuVariants = {
    closed: {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      transition: { duration: 0.75, ease: "circOut" },
    },
    open: {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      transition: { duration: 0.75, ease: "circOut" },
    },
  };

  const linkVariants = {
    closed: { y: 50, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.1 + i * 0.1, duration: 0.5, ease: "circOut" },
    }),
  };

  return (
    <div className={styles["menu-container"]}>
      <div className={styles["menu-open"]} onClick={toggleMenu}>
        <p>Menu</p>
      </div>

      {/* menu-overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div className={styles["menu-overlay"]} initial="closed" animate="open" exit="closed" variants={menuVariants}>
            {/* menu-overlay-bar */}
            <div className={styles["menu-overlay-bar"]}>
              <div className={styles["menu-logo"]}>
                <Link href="/">Codegrid</Link>
              </div>
              <div className={styles["menu-close"]}>
                <p onClick={toggleMenu}>Close</p>
              </div>
            </div>

            {/* menu overlay items */}
            <div className={styles["menu-close-icon"]} onClick={toggleMenu}>
              <p>&#x2715;</p>
            </div>
            <div className={styles["menu-copy"]}>
              <div className={styles["menu-links"]}>
                {menuLinks.map((link, index) => (
                  <motion.div key={index} className={styles["menu-link-item"]} custom={index} variants={linkVariants}>
                    <div className={styles["menu-link-item-holder"]} onClick={toggleMenu}>
                      <Link className={styles["menu-link"]} href={link.path}>
                        {link.label}
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div className={styles["menu-info"]} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
                <div className={styles["menu-info-col"]}>
                  <a href="#">X &#8599;</a>
                  <a href="#">Instagram &#8599;</a>
                  <a href="#">LinkedIn &#8599;</a>
                  <a href="#">Behance &#8599;</a>
                  <a href="#">Dribbble &#8599;</a>
                </div>
                <div className={styles["menu-info-col"]}>
                  <p>info@codegrid.com</p>
                  <p>0923 3984 23</p>
                </div>
              </motion.div>
            </div>
            <motion.div className={styles["menu-preview"]} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.5 }}>
              <p>View ShowReel</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
