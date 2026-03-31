import styles from "./Leadership.module.css";
import Image from "next/image";

export default function Leadership() {
  return (
    <section className={`container ${styles.section}`}>

      <h2 className={styles.title}>Leadership</h2>

      <div className={styles.grid}>

        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image
              src="/founders/1.png"
              alt="Munish Sharma"
              fill
              className={styles.image}
            />
          </div>

          <h3>Mr. Munish Sharma</h3>
          <span>Director</span>

          <p>
            Co-founder with extensive experience in industrial automation,
            drives, and large-scale system integration across multiple industries.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image
              src="/founders/2.png"
              alt="Sandeep Bhat"
              fill
              className={styles.image}
            />
          </div>

          <h3>Mr. Sandeep Bhat</h3>
          <span>Director</span>

          <p>
            Expert in process automation, commissioning, and industrial control systems,
            with strong execution experience in rolling mills and manufacturing plants.
          </p>
        </div>

      </div>

    </section>
  );
}