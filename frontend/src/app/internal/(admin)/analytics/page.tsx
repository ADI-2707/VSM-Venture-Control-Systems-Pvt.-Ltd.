import styles from "./Analytics.module.css";

const kpis = [
  { label: "Total Visits", value: "24,320", change: "+12%" },
  { label: "Unique Users", value: "8,210", change: "+5%" },
  { label: "Bounce Rate", value: "32%", change: "-2%" },
  { label: "Avg. Session", value: "3m 12s", change: "+8%" },
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

        <div>
          <h1 className={styles.title}>Analytics</h1>
          <p className={styles.subtitle}>
            Track performance, engagement and traffic trends
          </p>
        </div>

        <select className={styles.filter}>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>

      <div className={styles.kpiGrid}>
        {kpis.map((kpi) => (
          <div key={kpi.label} className={styles.card}>
            <span className={styles.kpiLabel}>{kpi.label}</span>
            <strong className={styles.kpiValue}>{kpi.value}</strong>
            <span className={styles.kpiChange}>{kpi.change}</span>
          </div>
        ))}
      </div>

      <div className={styles.chart}>
        <div className={styles.sectionHeader}>
          <h3>Traffic Overview</h3>
        </div>

        <div className={styles.chartBox}>
          <div className={styles.fakeChart}></div>
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.sectionHeader}>
          <h3>Page Performance</h3>
        </div>

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
                <td className={styles.pageName}>{p.name}</td>
                <td>{p.views.toLocaleString()}</td>
                <td>
                  <span className={styles.badge}>{p.bounce}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}