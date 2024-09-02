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
  { path: "/about", label: "About" },
  { path: "https://sepetimiz.vercel.app", label: "Sepetimiz" },
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

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div className={styles["menu-overlay"]} initial="closed" animate="open" exit="closed" variants={menuVariants}>
            <div className={styles["menu-overlay-bar"]}>
              <div className={styles["menu-logo"]}>
                <Link href="/">Let&apos;s Grow</Link>
              </div>
              <div className={styles["menu-close"]}>
                <p onClick={toggleMenu}>Close</p>
              </div>
            </div>

            <div className={styles["menu-close-icon"]} onClick={toggleMenu}>
              <p>&#x2715;</p>
            </div>
            <div className={styles["menu-copy"]}>
              <div className={styles["menu-links"]}>
                {menuLinks.map((link, index) => (
                  <motion.div key={index} className={styles["menu-link-item"]} custom={index} variants={linkVariants}>
                    <div className={styles["menu-link-item-holder"]} onClick={toggleMenu}>
                      <FlipLink href={link.path}>{link.label}</FlipLink>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div className={styles["menu-info"]} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
                <div className={styles["menu-info-col"]}>
                  <a href="https://www.instagram.com/libi.ppit" target="_blank" rel="noopener noreferrer">
                    Instagram &#8599;
                  </a>
                  <a href="https://www.instagram.com/libi.ppit" target="_blank" rel="noopener noreferrer">
                    LinkedIn &#8599;
                  </a>
                </div>
                <div className={styles["menu-info-col"]}>
                  <p>sepetimiz.bk@gmail.com</p>
                  <p>05421794383</p>
                </div>
              </motion.div>
            </div>
            <motion.div className={styles["menu-preview"]} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.5 }}>
              {/* <p>View ShowReel</p> */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, href }: { children: string; href: string }) => {
  return (
    <motion.a initial="initial" whileHover="hovered" href={href} className={styles["flip-link"]}>
      <div className={styles["original"]}>
        {children.split("").map((l, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className={styles["flipped"]}>
        {children.split("").map((l, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};

export default Menu;
