"use client";
import React from "react";
import styled from "styled-components";
import SectionLayout from "./Components/SectionLayout/SectionLayout";
import { motion, useScroll, useTransform } from "framer-motion";
import TextSection from "./Components/TextSection/TextSection";
import ShuffleHero from "./Components/Hero/Hero";
import { TextParallax } from "./Components/Text-parallax/TextParallax";
import Fullpage from "./Components/Fullpage/Fullpage";
import Countdown from "./Components/CountDown/CountDown";
import Horizontal from "./Components/HorizontalScroll/HoeizontalScroll";

export default function Home() {
  const video = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: video,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6, 0.8, 0.9], [1, 0.8, 0.8, 0]);

  return (
    <>
      <MainStyled>
        <ShuffleHero />
        <Horizontal />

        <TextParallax />
        <h2 className="title">CountDown</h2>
        <Countdown />

        {/* <Fullpage /> */}

        <SectionLayout>
          <TextSection />
        </SectionLayout>

        <SectionLayout>
          <motion.div
            className="video"
            ref={video}
            style={{
              opacity,
              scale,
            }}
          >
            <iframe src="https://www.youtube.com/embed/xPP7RyV3yPo" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </motion.div>
        </SectionLayout>

        {/* <SectionLayout>
          <ZoomSection></ZoomSection>
        </SectionLayout> */}

        {/* <SectionLayout>
          <TextSection />
        </SectionLayout> */}
      </MainStyled>
    </>
  );
}

const MainStyled = styled.main`
  min-height: 100vh;
  width: 100%;

  .title {
    text-align: center;
    margin-bottom: 4rem;
  }

  .video {
    padding: 2rem;
    background-color: #161616;
    border-radius: 1rem;

    iframe {
      border: none;
      width: 100%;
      height: 52rem;
    }

    // Responsive Styles
    @media (max-width: 1200px) {
      padding: 1.5rem;

      iframe {
        height: 40rem;
      }
    }

    @media (max-width: 768px) {
      padding: 1rem;

      iframe {
        height: 30rem;
      }
    }

    @media (max-width: 480px) {
      padding: 0.5rem;

      iframe {
        height: 20rem;
      }
    }
  }
`;
