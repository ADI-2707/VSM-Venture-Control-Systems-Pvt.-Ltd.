import styles from "./CareerForm.module.css";

export default function CareerForm() {
  return (
    <div className={styles.wrapper}>
      <h2>Apply Now</h2>

      <form className={styles.form}>
        <div className={styles.row}>
          <input placeholder="Name" />
          <input placeholder="Email" />
        </div>

        <div className={styles.row}>
          <input placeholder="Phone" />
          <input placeholder="Subject" />
        </div>

        <input type="file" />

        <textarea placeholder="Additional Details" />

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}