import styles from "./Footer.module.css";
import { socialLinks } from "@/constants/socialLinks";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.container}>

          <div className={styles.col}>
            <h4>Quick Contacts</h4>
            <p>If you have any questions or need help, feel free to contact with our team.</p>

            <div className={styles.contact}>
              <span>venture@venture-online.com</span>
            </div>

            <div className={styles.contact}>
              <span>0120-4881000-49</span>
            </div>

            <p className={styles.address}>
              W53D & W54H, Sector 11, Noida, Uttar Pradesh – 201301
            </p>
          </div>

          <div className={styles.col}>
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
              <li>Products</li>
              <li>Application Areas</li>
              <li>Gallery</li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Industries</h4>
            <ul>
              <li>Pulp & Paper</li>
              <li>Metal Processing</li>
              <li>Steel</li>
              <li>Cement</li>
              <li>Material Handling</li>
              <li>Power and Utilities</li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Solution & Services</h4>
            <ul>
              <li>Consulting Services</li>
              <li>Systems and Application Engineering</li>
              <li>Panel Manufacturing</li>
              <li>Integration Testing</li>
              <li>On-Site Services</li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Have A Project?</h4>
            <button className={styles.quote}>Get A Quote</button>

            <div className={styles.social}>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-tooltip={social.tooltip}
                  className={`${styles.icon} ${styles[social.className]}`}
                >
                  <img src={social.icon} alt={social.name} />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomContainer}>
          <span>
            © {new Date().getFullYear()} VSM Venture Control Systems Pvt. Ltd.
          </span>

          <div className={styles.links}>
            <span>Terms & Conditions</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>

    </footer>
  );
}