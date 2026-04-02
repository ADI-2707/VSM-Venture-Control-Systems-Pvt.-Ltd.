"use client";

import Image from "next/image";
import styles from "./ApplicationHero.module.css";

const images = [
  "/applications/ccl.jfif",
  "/applications/cgl.jfif",
  "/applications/crm.jfif",
  "/applications/hsm.jfif",
  "/applications/pl.jfif",
];

export default function ApplicationHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />

      <Image
        src={images[0]}
        alt="Application Areas"
        fill
        priority
        className={styles.image}
      />

      <div className="container">
        <div className={styles.content}>
          <h1>Application Areas</h1>
          <p>Delivering Industrial Automation Across Domains</p>
        </div>
      </div>
    </section>
  );
}