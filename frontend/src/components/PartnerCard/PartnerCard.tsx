import styles from "./PartnerCard.module.css";

interface Props {
  name: string;
  logo: string;
  description: string;
}

export default function PartnerCard({ name, logo, description }: Props) {
  return (
    <div className={styles.card}>

      <div className={styles.preview}>
        <img src={logo} alt={name} className={styles.logo} />
      </div>

      <div className={styles.expand}>
        <div className={styles.expandInner}>
          
          {/* Column 1 → Logo */}
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