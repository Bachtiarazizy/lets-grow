"use client";

import Image from "next/image";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Fullpage.module.scss";

function Fullpage() {
  const secRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: secRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const xTransform = useTransform(scrollYProgress, [1, 0.5, 0.1, 0], [-1000, 0, 0, 0]);

  return (
    <div className={styles.fullpage} ref={secRef}>
      <motion.div
        className={styles.image}
        style={{
          scale: scale,
          x: xTransform,
        }}
      >
        <Image
          src="/images/rover.jpg"
          alt="monkey"
          fill={true}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </motion.div>
    </div>
  );
}

export default Fullpage;
