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

                  <path d="M-20 40 C 80 20, 120 60, 220 40" className={styles.cable} />
                  <path d="M-20 100 C 60 120, 140 80, 220 100" className={styles.cable} />
                  <path d="M-20 160 C 80 140, 120 180, 220 160" className={styles.cable} />

                  <path d="M-20 40 C 80 20, 120 60, 220 40" className={styles.pulse} />
                  <path d="M-20 100 C 60 120, 140 80, 220 100" className={styles.pulse} />
                  <path d="M-20 160 C 80 140, 120 180, 220 160" className={styles.pulse} />

                </svg>
              )}

              {index === 2 && (
                <svg className={styles.blueprint} viewBox="0 0 200 200">

                  <g className={styles.gridLines}>
                    <path d="M0 50 H200" />
                    <path d="M0 100 H200" />
                    <path d="M0 150 H200" />
                    <path d="M50 0 V200" />
                    <path d="M100 0 V200" />
                    <path d="M150 0 V200" />
                  </g>

                  <path d="M20 130 H180" className={styles.pipeMain} />

                  <path d="M60 130 V90" className={styles.pipeBranch} />
                  <path d="M120 130 V80" className={styles.pipeBranch} />

                  <rect x="100" y="60" width="40" height="20" rx="3" className={styles.unit} />

                  <path d="M150 130 l6 -4 l0 8 z" className={styles.arrow} />

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