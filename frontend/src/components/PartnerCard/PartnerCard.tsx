import styles from "./PartnerCard.module.css";

interface Props {
  name: string;
  logo: string;
  description: string;
  variant: "abb" | "psr" | "metals";
}

export default function PartnerCard({ name, logo, description, variant }: Props) {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>

      <div className={styles.content}>
        <div className={styles.name}>{name}</div>
        <div className={styles.description}>{description}</div>
      </div>

      <div className={styles.logoLayer}>
        <img src={logo} alt={name} />
      </div>

    </div>
  );
}