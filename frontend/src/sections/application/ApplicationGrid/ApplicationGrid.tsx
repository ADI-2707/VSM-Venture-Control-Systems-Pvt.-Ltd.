import styles from "./ApplicationGrid.module.css";

const sections = [
  {
    key: "cold",
    title: "Cold Rolling & Processing Line",
    items: [
      "Cold Rolling Mills",
      "Reversible Cold Rolling Mills",
      "Annealing & Pickling Lines",
      "Skin Pass Mill",
      "Continuous Galvanizing Line",
      "Continuous Tinning Line",
      "Colour Coating Line",
      "Cut-to-Length",
      "HR Slitting & CR Slitting Lines",
      "Edge Trimming Lines",
      "Rewinding Lines",
      "Tension Leveling Lines",
      "Acid Regeneration Plant",
    ],
  },
  {
    key: "hot",
    title: "Hot Rolling",
    items: ["Hot Strip Mills", "Wire & Rod Mills"],
  },
  {
    key: "material",
    title: "Material Handling",
    items: [
      "Stacker Reclaimer",
      "Wagon Loader",
      "Material Handling Plants",
      "Ship Loader",
      "EOT Cranes",
      "Down Hill Conveyor",
    ],
  },
  {
    key: "cement",
    title: "Cement Industry",
    items: ["Kiln", "Classifier", "Dynamic Separator, ID / FD Fan"],
  },
  {
    key: "paper",
    title: "Paper Industry",
    items: [
      "Sectional Paper Machine",
      "Rewinding Machine",
      "On/Off Line Coaters",
      "De-inking Plant",
    ],
  },
];

export default function ApplicationGrid() {
  return (
    <section className={styles.section}>
      <div className="container">

        <div className={styles.header}>
          <h2>Application Areas</h2>
          <p>
            Venture never hesitates in exploring challenging processes and delivering engineering excellence.
          </p>
        </div>

        <div className={styles.grid}>
          {sections.map((section) => (
            <div
              key={section.key}
              className={`${styles.card} ${styles[section.key]}`}
            >
              <h3>{section.title}</h3>
              <div className={styles.divider} />

              <ul>
                {section.items.map((item) => (
                  <li key={item}>
                    <span className={styles.check}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}