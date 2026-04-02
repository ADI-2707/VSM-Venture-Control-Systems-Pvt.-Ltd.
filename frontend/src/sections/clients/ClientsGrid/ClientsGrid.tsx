"use client";

import styles from "./ClientsGrid.module.css";
import { clientSections } from "@/constants/clients";

export default function ClientsGrid() {
  return (
    <section className={styles.section}>
      <div className="container">

        {/* Header */}
        <div className={styles.header}>
          <h1>Our Clients</h1>
          <p>
            Trusted by leading steel, paper and industrial enterprises across domains.
          </p>
        </div>

        {/* Sections */}
        {clientSections.map((section) => (
          <div key={section.title} className={styles.block}>

            <h2 className={styles.title}>{section.title}</h2>

            <div className={styles.grid}>
              {section.clients.map((client) => (
                <div key={client.name} className={styles.card}>
                  <img src={client.logo} alt={client.name} />
                  <p>{client.name}</p>
                </div>
              ))}
            </div>

          </div>
        ))}

      </div>
    </section>
  );
}