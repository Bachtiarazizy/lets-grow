// TextParallaxContentExample.js
import React, { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import styles from "./TextParallax.module.scss"; // Import the Sass module

export const TextParallax = () => {
  return (
    <div className="bg-white">
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Let's Grow"
        heading="Accommode and Connect the Community."
      >
        <Content2 />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Let's Grow"
        heading="Facilitate all the needs of the Community."
      >
        <Content3 />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1504610926078-a1611febcad3?q=80&w=2416&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Let's Grow"
        heading="Assist in the expansion of the Community."
      >
        <Content />
      </TextParallaxContent>
    </div>
  );
};

const TextParallaxContent = ({ imgUrl, subheading, heading, children }: { imgUrl: string; subheading: string; heading: string; children: ReactNode }) => {
  return (
    <div className={styles.imgPadding}>
      <div className={styles.relativeContainer}>
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }: { imgUrl: string }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        scale,
      }}
      ref={targetRef}
      className={styles.stickyImage}
    >
      <motion.div
        className={styles.overlay}
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }: { subheading: string; heading: string }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className={styles.overlayText}
    >
      <p className={styles.overlayText__subheading}>{subheading}</p>
      <p className={styles.overlayText__heading}>{heading}</p>
    </motion.div>
  );
};

const Content = () => (
  <div className={styles.exampleContent}>
    <h2>Let&apos;s Grow</h2>
    <div className="content">
      <p>
        Comprehensively accommodating and establishing strong connections between student SMEs and business institutions or companies in Turkey and Indonesia, creating opportunities for collaboration, mentorship, and development. This
        initiative aims to bridge the gap between aspiring student entrepreneurs and established businesses, encouraging partnerships that can produce mutual benefits, share knowledge, and expand market reach for student-led ventures.
      </p>
      <button>
        Learn more <FiArrowUpRight className="inline" />
      </button>
    </div>
  </div>
);
const Content2 = () => (
  <div className={styles.exampleContent}>
    <h2>Let&apos;s Grow</h2>
    <div className="content">
      <p>
        Facilitating all the needs of students running businesses in Turkey by providing comprehensive support, including access to resources, training, and necessary mentoring to develop their businesses. This initiative aims to ensure
        that every aspect required by students in running their businesses, whether operational, legal, or marketing-related, is adequately met, allowing them to focus on growth and innovation in a competitive environment.
      </p>
      <button>
        Learn more <FiArrowUpRight className="inline" />
      </button>
    </div>
  </div>
);
const Content3 = () => (
  <div className={styles.exampleContent}>
    <h2>Let&apos;s Grow</h2>
    <div className="content">
      <p>
        Focusing efforts on supporting and accelerating the expansion of Indonesian student SMEs in Turkey towards international markets by providing access to a global network, knowledge about international market dynamics, and
        opportunities for collaboration with business partners in various countries. This initiative aims to empower student entrepreneurs to bring their products and services to a global level, enhance competitiveness, and open doors for
        greater growth beyond national borders.
      </p>
      <button>
        Learn more <FiArrowUpRight className="inline" />
      </button>
    </div>
  </div>
);
