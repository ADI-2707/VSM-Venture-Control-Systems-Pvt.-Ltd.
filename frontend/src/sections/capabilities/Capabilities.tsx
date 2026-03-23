"use client";

import Image from "next/image";
import styles from "./Capabilities.module.css";

const capabilities = [
  {
    title: "Industrial Automation",
    text: "Advanced automation systems designed to optimize production efficiency and reliability across modern manufacturing environments."
  },
  {
    title: "System Integration",
    text: "End-to-end integration of PLC, HMI, SCADA and field devices to deliver seamless industrial operations."
  },
  {
    title: "Engineering Excellence",
    text: "Our engineering-driven approach ensures robust, scalable, and future-ready automation solutions."
  },
  {
    title: "Industry Experience",
    text: "Decades of experience delivering solutions across steel, cement, power, pulp & paper, and material handling industries."
  }
];

export default function Capabilities() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <h2 className={styles.title}>
          Engineering Solutions for Modern Industry
        </h2>

        <p className={styles.subtitle}>
          Delivering reliable automation and control systems that empower
          manufacturing excellence.
        </p>

        <div className={styles.grid}>
          {capabilities.map((item, index) => (
            <div key={index} className={styles.card}>

              {index === 0 && (
                <>
                  <Image
                    src="/icons/gear.svg"
                    alt="gear"
                    width={140}
                    height={140}
                    className={`${styles.gear} ${styles.gearBig}`}
                  />

                  <Image
                    src="/icons/gear.svg"
                    alt="gear"
                    width={90}
                    height={90}
                    className={`${styles.gear} ${styles.gearSmall}`}
                  />
                </>
              )}

              {index === 1 && (
                <svg className={styles.fiber} viewBox="0 0 200 200">

                  {/* Curved cables */}
                  <path d="M-20 40 C 80 20, 120 60, 220 40" className={styles.cable} />
                  <path d="M-20 100 C 60 120, 140 80, 220 100" className={styles.cable} />
                  <path d="M-20 160 C 80 140, 120 180, 220 160" className={styles.cable} />

                  {/* Flow pulse */}
                  <path d="M-20 40 C 80 20, 120 60, 220 40" className={styles.pulse} />
                  <path d="M-20 100 C 60 120, 140 80, 220 100" className={styles.pulse} />
                  <path d="M-20 160 C 80 140, 120 180, 220 160" className={styles.pulse} />

                </svg>
              )}

              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}