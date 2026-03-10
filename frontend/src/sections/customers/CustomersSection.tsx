import styles from "./CustomersSection.module.css";
import { customerGroups } from "./customersData";
import LogoScroller from "./components/LogoScroller/LogoScroller";

export default function CustomersSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {customerGroups.map((group, index) => (
          <div key={group.title} className={styles.group}>
            <h2 className={styles.title}>{group.title}</h2>

            <LogoScroller logos={group.logos} direction={index === 0 ? "left" : "right"} />
          </div>
        ))}
      </div>
    </section>
  );
}