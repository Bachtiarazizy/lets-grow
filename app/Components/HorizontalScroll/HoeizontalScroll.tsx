import React, { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import styles from "./Horizontal.module.scss";

type CardType = {
  url: string;
  title: string;
  desc: string;
  id: number;
};

const cards: CardType[] = [
  {
    url: "https://plus.unsplash.com/premium_photo-1683134650708-d84ff30080c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXdhcmRzfGVufDB8fDB8fHww",
    title: "Bussines Plan Competition",
    id: 1,
    desc: "The Business Plan Competition in October as a Pre-Event for Let’s Grow",
  },
  {
    url: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRlZCUyMHRhbGt8ZW58MHx8MHx8fDA%3D",
    title: "Business Talk Show",
    id: 2,
    desc: "Inspiring discussion session with business experts.",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1661274209157-118069b926f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZGlzY3Vzc2lvbnxlbnwwfHwwfHx8MA%3D%3D",
    title: "Bussines Discussion Session",
    id: 3,
    desc: "Forum for sharing ideas and strategies in business development.",
  },
];

const Card: React.FC<{ card: CardType }> = ({ card }) => (
  <div key={card.id} className={styles.card}>
    <div
      className={styles.card__background}
      style={{
        backgroundImage: `url(${card.url})`,
      }}
    ></div>
    <div className={styles.card__content}>
      <h3>{card.title}</h3>
      <p>{card.desc}</p>
    </div>
  </div>
);

const HorizontalScrollCarousel: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className={styles["horizontal-scroll-section"]}>
      <div className={styles["sticky-container"]}>
        <motion.div style={{ x }} className={styles["card-container"]}>
          {cards.map((card) => (
            <Card card={card} key={card.id} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Horizontal: React.FC = () => (
  <div className={styles["horizontal-scroll-container"]}>
    <div className={styles["scroll-indicator"]}>
      <span>Our Agenda</span>
    </div>
    <HorizontalScrollCarousel />
  </div>
);

export default Horizontal;
