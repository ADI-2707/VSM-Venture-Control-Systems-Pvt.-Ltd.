import styles from "./AboutIntro.module.css";

export default function AboutIntro() {
  return (
    <section className={`container ${styles.section}`}>
      
      <h1 className={styles.title}>
        Engineering Automation Excellence
      </h1>

      <p className={styles.description}>
        VSM Venture Control Systems Pvt. Ltd. (VCS) is based in the National Capital Region of India and solutions and services in the Industry Drive Controls segment in the Industrial Controls and Factory Automation market since 2001. VSM has a presence in the local markets in India as well as in markets such as SE Asia, Africa, Middle East and Central Asia. Currently, nearly half of VCS revenues come from international customers. VCS now is already a reputed name in the field of Industrial Automation.
      </p>

      <p className={styles.description}>
        A critical factor in the success of VSM Venture Control Systems Pvt. Ltd. (VCS) inacquiring customers has been a deep understanding of the business and technological challenges that our customers face while considering, designing and deploying drive control systems. Developing domain knowledge, working and partnering closely with customers has been a mantra for operations across VCS. Some of the industries that have been covered by VCS include:
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