import { useAnimate } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./Countdown.module.scss"; // Import the Sass file

const COUNTDOWN_FROM = "2024-12-14";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

type Units = "Day" | "Hour" | "Minute" | "Second";

const Countdown = () => {
  return (
    <div className={styles.bgGradient}>
      <div className={styles.container}>
        <CountdownItem unit="Day" text="days" />
        <CountdownItem unit="Hour" text="hours" />
        <CountdownItem unit="Minute" text="minutes" />
        <CountdownItem unit="Second" text="seconds" />
      </div>
    </div>
  );
};

const CountdownItem = ({ unit, text }: { unit: Units; text: string }) => {
  const { ref, time } = useTimer(unit);

  return (
    <div className={`${styles.countdownItem} ${styles.large}`}>
      <div className={`${styles.countdownText} ${styles.large}`} ref={ref}>
        {time}
      </div>
      <span className={`${styles.unitText} ${styles.large}`}>{text}</span>
    </div>
  );
};

export default Countdown;

const useTimer = (unit: Units) => {
  const [ref, animate] = useAnimate();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeRef = useRef(0);

  const [time, setTime] = useState(0);

  const handleCountdown = useCallback(async () => {
    const end = new Date(COUNTDOWN_FROM);
    const now = new Date();
    const distance = +end - +now;

    let newTime = 0;

    if (unit === "Day") {
      newTime = Math.floor(distance / DAY);
    } else if (unit === "Hour") {
      newTime = Math.floor((distance % DAY) / HOUR);
    } else if (unit === "Minute") {
      newTime = Math.floor((distance % HOUR) / MINUTE);
    } else {
      newTime = Math.floor((distance % MINUTE) / SECOND);
    }

    if (newTime !== timeRef.current) {
      // Exit animation
      await animate(ref.current, { y: ["0%", "-50%"], opacity: [1, 0] }, { duration: 0.35 });

      timeRef.current = newTime;
      setTime(newTime);

      // Enter animation
      await animate(ref.current, { y: ["50%", "0%"], opacity: [0, 1] }, { duration: 0.35 });
    }
  }, [unit, animate, ref]);

  useEffect(() => {
    intervalRef.current = setInterval(handleCountdown, 1000);

    return () => clearInterval(intervalRef.current || undefined);
  }, [handleCountdown]);

  return { ref, time };
};
