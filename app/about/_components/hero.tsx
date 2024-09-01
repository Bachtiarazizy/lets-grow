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
      <ParallaxImg src="/images/bk1.jpg" alt="And example of a space launch" start={-200} end={200} className={styles.imageOneThird} />
      <ParallaxImg src="/images/bk3.jpg" alt="An example of a space launch" start={200} end={-250} className={styles.imageTwoThirds} />
      <ParallaxImg src="/images/bk4.jpg" alt="Orbiting satellite" start={-200} end={200} className={styles.imageOneThirdRight} />
      <ParallaxImg src="/images/bk5.jpg" alt="Orbiting satellite" start={0} end={-500} className={styles.imageFivetwelfths} />
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
  desc: string;
}

const Schedule: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<ScheduleItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const scheduleItems: ScheduleItem[] = [
    {
      title: "What is Let's grow?",
      desc: "Let's Grow is the flagship event of the Business and Entrepreneurship Department of the Indonesian Student Association in Turkey. This event will feature a Business Plan Competition, Business Talk Show, Business Discussion Session, and Networking Opportunities.The event serves as a platform to facilitate and connect all Indonesian diaspora students, especially those with an interest in or currently running a business, with various stakeholders and the right business networks to expand into international markets.",
    },
    {
      title: "What is the purpose of Let's Grow??",
      desc: "To provide a platform, centralize, and connect Indonesian student-run SMEs in Turkey with various institutions or business companies in Turkey and Indonesia to receive tangible support. To facilitate and address the needs of Indonesian diaspora students in Turkey who are entrepreneurs. To assist in the expansion of Indonesian student-run SMEs in Turkey.",
    },
    {
      title: "Forms of Collaboration with Let's Grow:",
      desc: "MÜSİAD can send representatives to serve as the main speakers in the Business Talkshow and Business Discussion Session at the Let's Grow event, focusing on the theme of Legalization and International Business Expansion in Turkey.MÜSİAD can also send delegates to be judges for the Business Plan Competition at the Let's Grow event. Additionally, MÜSİAD can attend the Let's Grow event to benefit from Business Networking Opportunities and Business Matching, thereby enhancing the three main characteristics of business growth: connected growth, complementary growth, and continuous growth on an international bilateral level.",
    },
    {
      title: "Benefits Offered by Let's Grow:",
      desc: "MÜSİAD can engage in business matching and establish partnerships with strategic partners from PPI Turkey to access international markets, enabling the expansion of company scale to compete globally, enhancing the ability to attract a stronger talent pool, and boosting the economies of both Indonesia and Turkey.MÜSİAD can also reach a broader audience of international students from Indonesia, which is valuable for promoting all the activities and services they offer.",
    },
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

            <p className={styles.drawerDescription}>{selectedItem.desc}</p>
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
      </div>
      <div className={styles.scheduleItemLocation}>
        <FiArrowRight />
      </div>
    </motion.div>
  );
};
