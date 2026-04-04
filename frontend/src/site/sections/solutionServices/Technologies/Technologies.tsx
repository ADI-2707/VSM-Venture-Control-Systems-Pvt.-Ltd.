import styles from "./Technologies.module.css";

const techs = [
  { name: "Siemens", type: "pulse", color: "#009999" },
  { name: "ABB", type: "rotate", color: "#ff0000" },
  { name: "Allen-Bradley", type: "wave", color: "#cc0000" },
  { name: "Schneider Electric", type: "flicker", color: "#3dcd58" },
  { name: "EPLAN", type: "draw", color: "#f7c600" },
  { name: "AutoCAD", type: "spin", color: "#e51050" },
];

export default function Technologies() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Technologies We Work With</h2>

      <div className={styles.grid}>
        {techs.map((tech, index) => (
          <div
            key={index}
            className={`${styles.card} ${styles[tech.type]}`}
            style={{ "--brand-color": tech.color } as React.CSSProperties}
          >
            <div className={styles.icon}>
              {getIcon(tech.name)}
            </div>

            <span className={styles.text}>{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function getIcon(name: string) {
  switch (name) {
    case "Siemens":
      return (
        <svg viewBox="0 0 24 24">
          <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="8" cy="12" r="1" fill="currentColor"/>
          <circle cx="12" cy="12" r="1" fill="currentColor"/>
          <circle cx="16" cy="12" r="1" fill="currentColor"/>
        </svg>
      );

    case "ABB":
      return (
        <svg viewBox="0 0 24 24">
          <path d="M6 12h12M12 6v12" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      );

    case "Allen-Bradley":
      return (
        <svg viewBox="0 0 24 24">
          <path d="M4 12c2-4 6-4 8 0s6 4 8 0" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
      );

    case "Schneider Electric":
      return (
        <svg viewBox="0 0 24 24">
          <path d="M12 4v8l4-2-4 8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
      );

    case "EPLAN":
      return (
        <svg viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="4" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1"/>
          <line x1="10" y1="4" x2="10" y2="20" stroke="currentColor" strokeWidth="1"/>
        </svg>
      );

    case "AutoCAD":
      return (
        <svg viewBox="0 0 24 24">
          <path d="M12 4l4 16h-2l-1-4H11l-1 4H8l4-16z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      );

    default:
      return null;
  }
}