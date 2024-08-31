import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.scss";
import { squareData } from "../../utils/squareData";
import Button from "../Button/Button";
import SparklesText from "../SparklesText/SparklesText";

const ShuffleHero = () => {
  return (
    <section className={styles.section}>
      <div>
        <span className={styles.header}>Shine Brighter Every Day</span>
        <SparklesText
          text="Let's Grow, Let it Glow" // Change this to whatever text you want
          colors={{ first: "#9E7AFF", second: "#FE8BBB" }}
          className="text"
          sparklesCount={15} // Adjust the number of sparkles if needed
        />
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
