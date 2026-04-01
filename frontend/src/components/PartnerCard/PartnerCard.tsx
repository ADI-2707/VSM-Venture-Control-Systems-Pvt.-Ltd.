import styles from "./PartnerCard.module.css";

interface Props {
  name: string;
  logo: string;
  description: string;
}

export default function PartnerCard({ name, logo, description }: Props) {
  return (
    <div className={styles.card}>

      {/* Center Logo */}
      <img src={logo} alt={name} className={styles.logo} />

      {/* Expanding Panel */}
      <div className={styles.expand}>
        <img src={logo} alt={name} className={styles.logo} />

        <div className={styles.text}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.description}>{description}</p>
        </div>
      </div>

    </div>
  );
}