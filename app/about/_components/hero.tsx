"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { SiSpacex } from "react-icons/si";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { useRef, useState } from "react";
import styles from "./hero.module.scss";
import { Modal } from "./modal";

export const SmoothScrollHero = () => {
  return (
    <div className={styles.smoothScrollHero}>
      <ReactLenis root options={{ lerp: 0.05 }}>
        <Hero />
        <Schedule />
      </ReactLenis>
    </div>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }} className={styles.hero}>
      <CenterImage />
      <ParallaxImages />
      <div className={styles.gradient} />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(scrollY, [0, SECTION_HEIGHT + 500], ["170%", "100%"]);
  const opacity = useTransform(scrollY, [SECTION_HEIGHT, SECTION_HEIGHT + 500], [1, 0]);

  return (
    <motion.div
      className={styles.centerImage}
      style={{
        clipPath,
        backgroundSize,
        opacity,
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className={styles.parallaxImages}>
      <ParallaxImg
        src="https://images.unsplash.com/photo-1484600899469-230e8d1d59c0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="And example of a space launch"
        start={-200}
        end={200}
        className={styles.imageOneThird}
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="An example of a space launch"
        start={200}
        end={-250}
        className={styles.imageTwoThirds}
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Orbiting satellite"
        start={-200}
        end={200}
        className={styles.imageOneThirdRight}
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1494022299300-899b96e49893?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Orbiting satellite"
        start={0}
        end={-500}
        className={styles.imageFivetwelfths}
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }: { className?: string; alt: string; src: string; start: number; end: number }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return <motion.img src={src} alt={alt} className={className} ref={ref} style={{ transform, opacity }} />;
};

interface ScheduleItem {
  title: string;
  date: string;
  location: string;
}

const Schedule: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<ScheduleItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const scheduleItems: ScheduleItem[] = [
    { title: "NG-21", date: "Dec 9th", location: "Florida" },
    { title: "Starlink", date: "Dec 20th", location: "Texas" },
    { title: "Starlink", date: "Jan 13th", location: "Florida" },
    { title: "Turksat 6A", date: "Feb 22nd", location: "Florida" },
    { title: "NROL-186", date: "Mar 1st", location: "California" },
    { title: "GOES-U", date: "Mar 8th", location: "California" },
    { title: "ASTRA 1P", date: "Apr 8th", location: "Texas" },
  ];

  const handleItemClick = (item: ScheduleItem) => {
    setSelectedItem(item);
    setIsDrawerOpen(true);
  };

  return (
    <section id="launch-schedule" className={styles.schedule}>
      <motion.h1 initial={{ y: 48, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ ease: "easeInOut", duration: 0.75 }} className={styles.scheduleTitle}>
        Launch Schedule
      </motion.h1>
      {scheduleItems.map((item, index) => (
        <ScheduleItem key={index} item={item} onClick={() => handleItemClick(item)} />
      ))}

      <Modal open={isDrawerOpen} setOpen={setIsDrawerOpen}>
        {selectedItem && (
          <div className={styles.drawerContent}>
            <h2 className={styles.drawerTitle}>{selectedItem.title}</h2>
            <p className={styles.drawerDate}>Launch Date: {selectedItem.date}</p>
            <p className={styles.drawerLocation}>Location: {selectedItem.location}</p>
            <p className={styles.drawerDescription}>
              This is a placeholder for the detailed description of the {selectedItem.title} mission. In a real application, you would fetch and display more comprehensive information about the launch here.
            </p>
          </div>
        )}
      </Modal>
    </section>
  );
};

interface ScheduleItemProps {
  item: ScheduleItem;
  onClick: () => void;
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({ item, onClick }) => {
  return (
    <motion.div initial={{ y: 48, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ ease: "easeInOut", duration: 0.75 }} className={styles.scheduleItem} onClick={onClick}>
      <div>
        <p className={styles.scheduleItemTitle}>{item.title}</p>
        <p className={styles.scheduleItemDate}>{item.date}</p>
      </div>
      <div className={styles.scheduleItemLocation}>
        <p>{item.location}</p>
        <FiMapPin />
      </div>
    </motion.div>
  );
};
