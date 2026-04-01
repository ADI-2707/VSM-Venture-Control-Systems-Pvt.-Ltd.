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

      <div className={styles.preview}>
        <img src={logo} alt={name} className={styles.logo} />
      </div>

      <div className={styles.expand}>
        <div className={styles.expandInner}>
          
          <div className={styles.logoCol}>
            <img src={logo} alt={name} />
          </div>

          <div className={styles.textCol}>
            <div className={styles.name}>{name}</div>
            <div className={styles.description}>{description}</div>
          </div>

        </div>
      </div>

    </div>
  );
}