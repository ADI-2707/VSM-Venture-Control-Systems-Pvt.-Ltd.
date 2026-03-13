import styles from "./CTASection.module.css";

export default function CTASection() {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>

        <h2 className={styles.title}>
          Ready to build reliable industrial software systems?
        </h2>

        <p className={styles.subtitle}>
          We help engineering and manufacturing teams design and build
          scalable data platforms, automation systems, and AI solutions
          for real-world production environments.
        </p>

        <div className={styles.actions}>
          <a href="/contact" className={styles.primaryBtn}>
            Schedule a Consultation
          </a>

          <a href="/projects" className={styles.secondaryBtn}>
            View Our Work
          </a>
        </div>

      </div>
    </section>
  );
}