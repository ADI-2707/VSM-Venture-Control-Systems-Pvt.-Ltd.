"use client";

import styles from "./Footer.module.css";
import { socialLinks } from "@/constants/socialLinks";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.6
      }
    );

    if (footerRef.current) observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.container}>

          <div className={styles.col}>
            <h4>Quick Contacts</h4>
            <p>If you have any questions or need help, feel free to contact with our team.</p>

            <div className={styles.contact}>
              <svg className={`${styles.contactIcon} ${styles.mailIcon}`} viewBox="0 0 24 24">
                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5z" />
              </svg>
              venture@venture-online.com
            </div>

            <div className={styles.contact}>
              <svg className={`${styles.contactIcon} ${styles.phoneIcon}`} viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.466 15.466 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.24 11.72 11.72 0 0 0 3.69.59 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.72 11.72 0 0 0 .59 3.69 1 1 0 0 1-.25 1z" />
              </svg>
              0120-4881000-49
            </div>

            <div className={styles.contact}>
              <svg className={`${styles.contactIcon} ${styles.locationIcon}`} viewBox="0 0 24 24">
                <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
              </svg>
              W53D & W54H, Sector 11, Noida, Uttar Pradesh – 201301
            </div>
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

            <motion.div
              className={styles.quoteArea}
              initial={{
                rotateX: -145,
                y: -80,
                z: -60,
                opacity: 0,
                scaleY: 0.92
              }}
              animate={
                visible
                  ? {
                    rotateX: [-145, 28, -10, 4, 0],
                    y: [-95, 18, -6, 2, 0],
                    z: [-60, 40, -10, 0],
                    scaleY: [0.92, 1.05, 0.97, 1],
                    opacity: 1
                  }
                  : {}
              }
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1]
              }}
            >

              <div className={styles.pin}></div>

              <motion.div
                className={styles.string}
                animate={
                  visible
                    ? {
                      scaleY: [1, 1.38, 0.92, 1.06, 1],
                      rotateZ: [0, 5, -3, 1.5, 0],
                      scaleX: [1, 0.82, 1.05, 0.96, 1]
                    }
                    : {}
                }
                transition={{
                  duration: 1.45,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
              />

              <motion.div
                className={styles.shadow}
                initial={{ opacity: 0, scaleX: 0.6, scaleY: 0.6 }}
                animate={
                  visible
                    ? {
                      opacity: [0, 0.5, 0.35],
                      scaleX: [0.6, 1.2, 1],
                      scaleY: [0.6, 0.9, 0.8]
                    }
                    : {}
                }
                transition={{
                  duration: 1.2,
                  ease: "easeOut"
                }}
              />

              <motion.button
                className={styles.quote}
                animate={
                  visible
                    ? {
                      rotateZ: [0, 7, -5, 3, -1.5, 0],
                      y: [0, 4, -3, 1.5, 0]
                    }
                    : {}
                }
                transition={{
                  duration: 2,
                  ease: "easeOut"
                }}
              >
                Get A Quote
              </motion.button>

            </motion.div>

            <h4 className={styles.projectTitle}>Have A Project?</h4>

            <div className={styles.social}>
              {socialLinks.map((social) => (
                <div key={social.name} className={styles.socialItem}>

                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.icon} ${styles[social.className]}`}
                  >
                    <Image
                      src={social.icon}
                      alt={social.name} />
                  </a>

                  <div className={`${styles.tooltip} ${styles[social.className]}`}>
                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                      {social.tooltip}
                    </a>
                  </div>

                </div>
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