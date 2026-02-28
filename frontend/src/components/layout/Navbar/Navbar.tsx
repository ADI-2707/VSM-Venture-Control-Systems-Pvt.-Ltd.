import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <span className={styles.logo}>VSM</span>
      </div>
    </header>
  );
}