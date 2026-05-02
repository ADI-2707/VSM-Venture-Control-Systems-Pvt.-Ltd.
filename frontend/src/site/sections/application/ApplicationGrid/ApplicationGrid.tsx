"use client";

import styles from "./ApplicationGrid.module.css";
import { useCTA } from "@/context/CTAContext";

const sections: Section[] = [
  {
    key: "cold",
    title: "Cold Rolling & Processing Line",
    groups: [
      {
        title: "Rolling Mills",
        items: [
          "Cold Rolling Mills",
          "Reversible Cold Rolling Mills",
          "Skin Pass Mill",
        ],
      },
      {
        title: "Processing Lines",
        items: [
          "Annealing & Pickling Lines",
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

type BaseSection = {
  key: string;
  title: string;
};

type ColdSection = BaseSection & {
  key: "cold";
  groups: {
    title: string;
    items: string[];
  }[];
};

type NormalSection = BaseSection & {
  key: Exclude<string, "cold">;
  items: string[];
};

type Section = ColdSection | NormalSection;

export default function ApplicationGrid() {
  const { openServiceModal } = useCTA();
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

              {"groups" in section ? (
                <div className={styles.groupWrapper}>
                  {section.groups.map((group) => (
                    <div key={group.title} className={styles.group}>
                      <h4 className={styles.groupTitle}>{group.title}</h4>

                      <ul>
                        {group.items.map((item) => (
                          <li key={item}>
                            <span className={styles.check}>✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>
                      <span className={styles.check}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className={`${styles.card} ${styles.cta}`}>
            <h3>Not sure your industry fits?</h3>
            <p>
              Wondering whether your industry is our expertise?
            </p>
            <button 
              className={styles.ctaBtn}
              onClick={() => openServiceModal("Book a Call")}
            >
              Book a Call
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}