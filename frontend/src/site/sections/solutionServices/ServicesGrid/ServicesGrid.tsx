import styles from "./ServicesGrid.module.css";

const services = [
  "Consulting Services",
  "Systems and Application Engineering",
  "Panel Manufacturing",
  "Integration Testing",
  "On-Site Services",
  "System Documentation",
  "Application Support",
  "Pre & Post-Sales Technical Support",
];

export default function ServicesGrid() {
  return (
    <div className={styles.grid}>
      {services.map((service, index) => (
        <div key={index} className={styles.item}>
          <div className={styles.icon}>✓</div>
          <span className={styles.text}>{service}</span>
        </div>
      ))}
    </div>
  );
}