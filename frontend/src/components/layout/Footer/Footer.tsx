import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        © {new Date().getFullYear()} VSM Venture Control Systems Pvt. Ltd.
      </div>
    </footer>
  );
}