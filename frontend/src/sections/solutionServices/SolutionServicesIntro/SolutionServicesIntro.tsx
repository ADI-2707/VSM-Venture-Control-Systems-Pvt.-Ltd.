import styles from "./SolutionServicesIntro.module.css";

export default function SolutionServicesIntro() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Solution & Services</h1>

      <p className={styles.description}>
        VSM Venture Control Systems Pvt. Ltd. (VCS) offers a wide range of
        services in Industrial Automation & Control Systems, enabling customers
        to optimize operations. Our engineering team uses advanced tools like
        AutoCAD & EPLAN to deliver precise designs and documentation.
      </p>

      <p className={styles.description}>
        With expertise in ABB software and field execution, our engineers handle
        commissioning, PLC integration, cabling, and operator stations—ensuring
        complete project execution aligned with process requirements.
      </p>

      <h3 className={styles.subheading}>These Services Include</h3>

      <div className={styles.divider}></div>
    </div>
  );
}