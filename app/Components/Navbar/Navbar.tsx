import styles from "./Navbar.module.scss"; // Import the Sass module
import Image from "next/image";
import logo from "../../../public/Main logo.png";

export const Navbar: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <Image src={logo} alt="logo" width={100} height={40} />

      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Venue</a>
        </li>
        <li>
          <a href="#">Faq</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </nav>
  );
};
