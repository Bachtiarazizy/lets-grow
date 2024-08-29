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
        Mewadahi secara menyeluruh dan menjalin koneksi yang kuat antara UMKM pelajar dengan lembaga atau perusahaan bisnis di Turki dan Indonesia, menciptakan peluang untuk kolaborasi, mentorship, dan pengembangan. Inisiatif ini bertujuan
        untuk menjembatani kesenjangan antara pelajar wirausaha yang beraspirasi dan bisnis yang sudah mapan, mendorong kemitraan yang dapat menghasilkan manfaat bersama, berbagi pengetahuan, serta memperluas jangkauan pasar bagi usaha yang
        dipimpin oleh pelajar ini.
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
        Memfasilitasi seluruh kebutuhan mahasiswa yang menjalankan usaha di Turki dengan memberikan dukungan yang komprehensif, mulai dari akses terhadap sumber daya, pelatihan, hingga pendampingan yang diperlukan untuk mengembangkan bisnis
        mereka. Inisiatif ini berupaya memastikan bahwa setiap aspek yang dibutuhkan oleh pelajar dalam menjalankan usahanya, baik dari segi operasional, legalitas, maupun pemasaran, dapat terpenuhi dengan baik sehingga mereka dapat fokus
        pada pertumbuhan dan inovasi bisnis mereka di lingkungan yang kompetitif.
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
        Memusatkan upaya untuk mendukung dan mempercepat ekspansi UMKM pelajar Indonesia di Turki menuju pasar internasional, dengan memberikan akses ke jaringan global, pengetahuan tentang dinamika pasar internasional, serta peluang
        kerjasama dengan mitra bisnis di berbagai negara. Inisiatif ini bertujuan untuk memberdayakan pelajar wirausaha agar dapat membawa produk dan jasa mereka ke level global, meningkatkan daya saing, dan membuka pintu untuk pertumbuhan
        yang lebih besar di luar batas-batas nasional.
      </p>
      <button>
        Learn more <FiArrowUpRight className="inline" />
      </button>
    </div>
  </div>
);
