"use client";

import { usePathname } from "next/navigation"; // Import usePathname hook
import styles from "./Navbar.module.scss"; // Import the Sass module
import Image from "next/image";
import logo from "../../../public/Main logo.png";
import Menu from "../Menu/Menu";

export const Navbar: React.FC = () => {
  const pathname = usePathname(); // Get the current pathname

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Venue", path: "/venue" },
    { name: "Faq", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={styles.nav}>
      <Image src={logo} alt="logo" width={100} height={30} />

      {/* <ul>
        {navItems.map((item) => (
          <li key={item.path} className={pathname === item.path ? styles.active : undefined}>
            <a href={item.path}>{item.name}</a>
          </li>
        ))}
      </ul> */}
      <Menu />
    </nav>
  );
};
