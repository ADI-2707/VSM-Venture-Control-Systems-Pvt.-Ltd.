import styles from "./Partners.module.css";

export default function Partners() {
  return (
    <section className={`container ${styles.section}`}>

      <h2 className={styles.title}>Technology Partnerships</h2>

      <p className={styles.description}>
        We collaborate with global technology leaders to deliver reliable, 
        high-performance industrial automation solutions.
      </p>

      <div className={styles.grid}>
        <div className={styles.item}>ABB</div>
        <div className={styles.item}>PSR</div>
        <div className={styles.item}>metals-PAS</div>
      </div>

    </section>
  );
}