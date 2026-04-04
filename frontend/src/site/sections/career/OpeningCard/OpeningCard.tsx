import styles from "./OpeningCard.module.css";

export default function OpeningCard({
  title,
  location,
  type,
}: {
  title: string;
  location: string;
  type: string;
}) {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>

      <p>{location}</p>
      <p>{type}</p>

      <button>Apply Now</button>
    </div>
  );
}