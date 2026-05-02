import styles from "./CTA.module.css";
import { useCTA } from "@/context/CTAContext";

export default function CTA() {
  const { openServiceModal } = useCTA();
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h2 className={styles.heading}>Have a Project in Mind?</h2>

        <p className={styles.subtext}>
          Let’s build reliable and scalable automation solutions tailored to your industry.
        </p>

        <button 
          className={styles.button}
          onClick={() => openServiceModal("Get a Quote")}
        >
          Get a Quote
        </button>
      </div>
    </div>
  );
}