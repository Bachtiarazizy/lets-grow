import React from "react";
import styles from "./SectionLayout.module.scss";

interface SectionLayoutProps {
  children: React.ReactNode;
  ref?: React.RefObject<HTMLDivElement>;
}

function SectionLayout({ children, ref }: SectionLayoutProps) {
  return (
    <section className={styles.section} ref={ref}>
      {children}
    </section>
  );
}

export default SectionLayout;
