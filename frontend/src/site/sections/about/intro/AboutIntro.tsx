"use client";

import { useEffect, useState } from "react";
import styles from "./AboutIntro.module.css";

export default function AboutIntro() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1200); // 👈 define "large screen"
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <section className={`container ${styles.section}`}>
      
      <div className={styles.wrapper}>

        {/* LEFT CONTENT */}
        <div className={styles.content}>
          <h1 className={styles.title}>
            Engineering Automation Excellence
          </h1>

          <p className={styles.description}>
        VSM Venture Control Systems Pvt. Ltd. (VCS) is based in the National Capital Region of India and solutions and services in the Industry Drive Controls segment in the Industrial Controls and Factory Automation market since 2001. VSM has a presence in the local markets in India as well as in markets such as SE Asia, Africa, Middle East and Central Asia. Currently, nearly half of VCS revenues come from international customers. VCS now is already a reputed name in the field of Industrial Automation.
      </p>

      <p className={styles.description}>
        A critical factor in the success of VSM Venture Control Systems Pvt. Ltd. (VCS) inacquiring customers has been a deep understanding of the business and technological challenges that our customers face while considering, designing and deploying drive control systems. Developing domain knowledge, working and partnering closely with customers has been a mantra for operations across VCS. Some of the industries that have been covered by VCS include:
      </p>

          <div className={styles.highlights}>
            <span>Paper</span>
            <span>Steel</span>
            <span>Metal Processing</span>
            <span>Cement</span>
            <span>Material Handling</span>
            <span>Power</span>
          </div>
        </div>

        {isDesktop && (
          <div className={styles.videoWrapper}>
            <video
              className={styles.video}
              src="/aboutVideos/video1.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        )}

      </div>

    </section>
  );
}