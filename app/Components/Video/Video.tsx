import React from "react";
import { motion, MotionValue } from "framer-motion";
import styles from "./Video.module.scss";

interface VideoProps {
  videoRef?: React.RefObject<HTMLDivElement>;
  opacity?: MotionValue<number>;
  scale?: MotionValue<number>;
}

const Video: React.FC<VideoProps> = ({ videoRef, opacity = 1, scale = 1 }) => {
  return (
    <motion.div
      className={styles.video}
      ref={videoRef}
      style={{
        opacity,
        scale,
      }}
    >
      <iframe src="https://www.youtube.com/embed/xPP7RyV3yPo" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </motion.div>
  );
};

export default Video;
