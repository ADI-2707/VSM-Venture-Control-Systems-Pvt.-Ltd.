import styles from "./AboutIntro.module.css";

export default function AboutIntro() {
  return (
    <section className={`container ${styles.section}`}>
      
      <h1 className={styles.title}>
        Engineering Automation Excellence
      </h1>

      <p className={styles.description}>
        VSM Venture Control Systems Pvt. Ltd. delivers advanced industrial 
        automation and drive control solutions tailored for modern manufacturing environments.
      </p>

      <p className={styles.description}>
        With strong engineering expertise and domain knowledge, we design and deploy 
        scalable systems that enhance productivity, precision, and operational reliability.
      </p>

      <div className={styles.highlights}>
        <span>Paper</span>
        <span>Steel</span>
        <span>Metal Processing</span>
        <span>Cement</span>
        <span>Material Handling</span>
        <span>Power</span>
      </div>

    </section>
  );
}