import React from "react";

interface SectionLayoutProps {
  children: React.ReactNode;
  ref?: React.RefObject<HTMLDivElement>;
}

function SectionLayout({ children, ref }: SectionLayoutProps) {
  return (
    <section
      style={{
        padding: "5rem 5rem",
      }}
    >
      {children}
    </section>
  );
}

export default SectionLayout;
