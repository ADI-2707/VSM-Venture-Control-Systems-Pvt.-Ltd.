import styles from "./WhyChooseUs.module.css";

const points = [
  "Proven expertise in industrial automation",
  "End-to-end solution delivery",
  "Experienced engineering team",
  "Fast and reliable commissioning",
  "Strong post-sales support",
  "Industry-standard tools & practices",
];

export default function WhyChooseUs() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Why Choose Us</h2>

      <div className={styles.grid}>
        {points.map((point, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.icon}>✓</div>
            <span className={styles.text}>{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
}