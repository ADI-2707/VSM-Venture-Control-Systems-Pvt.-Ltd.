import styles from "./CTA.module.css";
import Link from "next/link";

export default function CTA() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h2 className={styles.heading}>Have a Project in Mind?</h2>

        <p className={styles.subtext}>
          Let’s build reliable and scalable automation solutions tailored to your industry.
        </p>

        <Link href="/contact" className={styles.button}>
          Get a Quote
        </Link>
      </div>
    </div>
  );
}