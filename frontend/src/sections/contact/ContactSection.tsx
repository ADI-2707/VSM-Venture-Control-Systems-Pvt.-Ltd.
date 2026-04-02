import styles from "./ContactSection.module.css";

export default function ContactSection() {
    return (
        <div className={styles.container}>

            <div className={styles.mapWrapper}>
                <iframe
                    src="https://www.google.com/maps?q=Noida%20Sector%2011&output=embed"
                    loading="lazy"
                />
            </div>

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

                    <form className={styles.form}>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />

                        <input type="text" placeholder="Phone" />
                        <input type="text" placeholder="Subject" />

                        <textarea placeholder="Message" rows={5}></textarea>

                        <button type="submit" className={styles.submit}>
                            <span className={styles.arrow}>→</span> Submit Request
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}