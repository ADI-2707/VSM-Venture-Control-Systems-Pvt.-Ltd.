import styles from "./TestimonialsSection.module.css";

const testimonials = [
  {
    quote:
      "Their engineering discipline and ability to understand industrial systems made a huge difference to our production monitoring platform.",
    name: "Production Engineering Lead",
    company: "Steel Manufacturing Company",
  },
  {
    quote:
      "A reliable technology partner. The systems they delivered were stable, well-architected, and easy for our teams to operate.",
    name: "Automation Manager",
    company: "Industrial Automation Team",
  },
  {
    quote:
      "They approached the project with strong engineering practices and delivered a scalable system that integrated well with our production environment.",
    name: "Technical Director",
    company: "Manufacturing Technology Group",
  },
];

export default function TestimonialsSection() {
  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <h2 className={styles.title}>What our partners say</h2>

        <div className={styles.grid}>
          {testimonials.map((t, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.topLine}></div>
              <div className={styles.streak}></div>

              <p className={styles.quote}>“{t.quote}”</p>

              <div className={styles.author}>
                <span className={styles.name}>{t.name}</span>
                <span className={styles.company}>{t.company}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}