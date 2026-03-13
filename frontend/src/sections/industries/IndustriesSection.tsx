"use client";

import styles from "./IndustriesSection.module.css";
import { industries } from "./industriesData";
import Link from "next/link";
import Image from "next/image";

export default function IndustriesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.header}>
          <h2>Industries We Serve</h2>
          <p>
            Delivering automation and control solutions across a wide range
            of industrial sectors.
          </p>
        </div>

        <div className={styles.grid}>
          {industries.map((industry) => (
            <Link
              key={industry.id}
              href={`/industries/${industry.slug}`}
              className={styles.card}
            >
              <div className={styles.iconWrapper}>
                <Image
                  src={industry.icon}
                  alt={industry.name}
                  width={28}
                  height={28}
                />
              </div>

              <h3>{industry.name}</h3>
              <p>{industry.description}</p>

              <span className={styles.explore}>
                Explore Industry →
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}