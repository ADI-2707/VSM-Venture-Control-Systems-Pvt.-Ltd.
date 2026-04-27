"use client";

import styles from "./CareerLayout.module.css";
import CareerHero from "../Hero/CareerHero";
import Openings from "../Openings/Openings";

export default function CareerLayout() {
  return (
    <div className="container">
      <div className={styles.wrapper}>
        <CareerHero />

        <div className={styles.header}>
          <h1>Careers at VSM</h1>
          <p>
            Join our team and help build cutting-edge industrial automation systems.
          </p>
        </div>

        <Openings />
      </div>
    </div>
  );
}