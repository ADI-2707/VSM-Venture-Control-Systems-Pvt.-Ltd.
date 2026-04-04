"use client";

import styles from "./CustomersSection.module.css";
import { customerGroups } from "./customersData";
import LogoScroller from "./components/LogoScroller/LogoScroller";
import useInView from "@/site/hooks/useInView";

export default function CustomersSection() {
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <section ref={ref} className={`${styles.section} section-divider`}>
      <div className="container">
        {customerGroups.map((group, index) => (
          <div key={group.title} className={styles.group}>
            <h2 className={styles.title}>{group.title}</h2>

            <LogoScroller
              logos={group.logos}
              direction={index === 0 ? "left" : "right"}
              speed={index === 0 ? 40 : 30}
              play={isVisible}
            />
          </div>
        ))}
      </div>
    </section>
  );
}