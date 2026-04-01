import styles from "./PartnerCard.module.css";

interface Props {
  name: string;
  logo: string;
  description: string;
}

export default function PartnerCard({ name, logo, description }: Props) {
  return (
    <div className={styles.card}>
      <img src={logo} alt={name} className={styles.logo} />

      <div className={styles.expand}>
        <div className={styles.text}>
          <div className={styles.name}>{name}</div>
          <div className={styles.description}>{description}</div>
        </div>
      </div>

    </div>
  );
}