import styles from "./PartnerCard.module.css";

interface Props {
  name: string;
  logo: string;
  description: string;
}

export default function PartnerCard({ name, logo, description }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.logoWrapper}>
        <img src={logo} alt={name} className={styles.logo} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}