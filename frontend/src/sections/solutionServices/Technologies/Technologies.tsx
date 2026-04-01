import styles from "./Technologies.module.css";

const techs = [
  "Siemens",
  "ABB",
  "Allen-Bradley",
  "Schneider Electric",
  "EPLAN",
  "AutoCAD",
];

export default function Technologies() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Technologies We Work With</h2>

      <div className={styles.grid}>
        {techs.map((tech, index) => (
          <div key={index} className={styles.card}>
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
}