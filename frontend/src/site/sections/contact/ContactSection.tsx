import styles from "./ContactSection.module.css";
import Reveal from "@/site/components/Reveal/Reveal";
import { useCTA } from "@/context/CTAContext";

export default function ContactSection() {
    const { openGeneralModal } = useCTA();
    return (
        <div className={styles.container}>

            <div className={styles.mapWrapper}>
                <iframe
                    src="https://www.google.com/maps?q=Noida%20Sector%2011&output=embed"
                    loading="lazy"
                />
            </div>

            <Reveal>
                <div className={styles.content}>

                    <div className={styles.infoCard}>
                        <p className={styles.desc}>
                            We take great pride in everything that we do, control over products allows us
                            to ensure our customers receive the best quality service.
                        </p>

                        <div className={styles.details}>
                            <p><strong>Emergency Line:</strong> 0120-4881000-49</p>
                            <p><strong>Location:</strong> W53D & W54H, Sector 11, Noida</p>
                            <p><strong>Timing:</strong> Mon - Fri: 8:00 am - 7:00 pm</p>
                        </div>

                        <button className={styles.cta}>
                            Get Started Now <span className={styles.arrow}>→</span>
                        </button>
                    </div>

                    <div className={styles.formWrapper}>
                        <h2>Get In Touch</h2>
                        <p className={styles.subText}>
                            We take great pride in everything that we do...
                        </p>

                        <div className={styles.formPlaceholder}>
                            <p>Have a specific requirement or question? Our team is ready to help.</p>
                            <button 
                                className={styles.submit}
                                onClick={() => openGeneralModal("Submit Request")}
                                style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}
                            >
                                <span className={styles.arrow}>→</span> Submit Request
                            </button>
                        </div>
                    </div>

                </div>
            </Reveal>
        </div>
    );
}