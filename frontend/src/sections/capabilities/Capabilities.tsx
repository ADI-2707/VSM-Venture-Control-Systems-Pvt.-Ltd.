"use client";

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
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}