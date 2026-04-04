import styles from "./KPIGrid.module.css";

const kpis = [
  { label: "Total Visitors", value: "12,430" },
  { label: "Media Uploaded", value: "320" },
  { label: "Active Sessions", value: "18" },
  { label: "System Status", value: "Operational" },
];

export default function KPIGrid() {
  return (
    <div className={styles.grid}>
      {kpis.map((kpi) => (
        <div key={kpi.label} className={styles.card}>
          <div className={styles.label}>{kpi.label}</div>
          <div className={styles.value}>{kpi.value}</div>
        </div>
      ))}
    </div>
  );
}