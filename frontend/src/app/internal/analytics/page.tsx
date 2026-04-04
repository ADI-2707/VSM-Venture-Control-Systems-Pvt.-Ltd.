import styles from "./Analytics.module.css";

const kpis = [
  { label: "Total Visits", value: "24,320" },
  { label: "Unique Users", value: "8,210" },
  { label: "Bounce Rate", value: "32%" },
  { label: "Avg. Session", value: "3m 12s" },
];

const pages = [
  { name: "Home", views: 12000, bounce: "30%" },
  { name: "About", views: 4300, bounce: "28%" },
  { name: "Products", views: 3800, bounce: "35%" },
  { name: "Gallery", views: 2200, bounce: "25%" },
];

export default function AnalyticsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Analytics</h2>

        <select className={styles.filter}>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>

      <div className={styles.kpiGrid}>
        {kpis.map((kpi) => (
          <div key={kpi.label} className={styles.card}>
            <span>{kpi.label}</span>
            <strong>{kpi.value}</strong>
          </div>
        ))}
      </div>

      <div className={styles.chart}>
        <div className={styles.chartTitle}>Traffic Overview</div>

        <div className={styles.chartBox}>
          <div className={styles.fakeChart}></div>
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.tableTitle}>Page Performance</div>

        <table>
          <thead>
            <tr>
              <th>Page</th>
              <th>Views</th>
              <th>Bounce Rate</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((p) => (
              <tr key={p.name}>
                <td>{p.name}</td>
                <td>{p.views}</td>
                <td>{p.bounce}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}