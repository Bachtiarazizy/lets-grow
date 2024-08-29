import { FiSend } from "react-icons/fi";
import styles from "./Button.module.scss";

const Button = () => {
  return (
    <div className={styles.button}>
      <NeumorphismButton />
    </div>
  );
};

const NeumorphismButton = () => {
  return (
    <button className={styles.neumorphismButton}>
      <FiSend />
      <span>Join Us</span>
    </button>
  );
};

export default Button;
