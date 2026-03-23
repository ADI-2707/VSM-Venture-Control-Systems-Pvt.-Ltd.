"use client";

import { useState } from "react";
import styles from "./IndustriesDeck.module.css";
import { industries } from "./industriesData";
import IndustryCard from "./IndustryCard";

export default function IndustriesDeck() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.deck}>
      {industries.map((industry, index) => (
        <IndustryCard
          key={industry.id}
          industry={industry}
          index={index}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      ))}
    </div>
  );
}