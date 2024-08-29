import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.scss";
import { squareData } from "../../utils/squareData";
import Button from "../Button/Button";

const ShuffleHero = () => {
  return (
    <section className={styles.section}>
      <div>
        <span className={styles.header}>Shine Brighter Every Day</span>
        <h3 className={styles.title}>
          Lets Grow,
          <br /> Lets it Flow
        </h3>
        <p className={styles.description}>Unlock your potential and let your business flourish. Together, we’ll take your ideas to the next level. Join us on this journey of growth and success!</p>
        <Button />
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array: (typeof squareData)[0][]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className={styles.square}
      style={{
        backgroundImage: `url(${sq.src})`,
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<any>(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    const shuffleSquares = () => {
      setSquares(generateSquares());

      timeoutRef.current = setTimeout(shuffleSquares, 3000);
    };

    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  return <div className={styles.grid}>{squares.map((sq) => sq)}</div>;
};

export default ShuffleHero;
