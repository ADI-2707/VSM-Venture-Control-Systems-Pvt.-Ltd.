import Reveal from "@/site/components/Reveal/Reveal";
import styles from "./GalleryPage.module.css";

import GallerySection from "@/site/sections/gallery/GallerySection/GallerySection";
import {
  workplaceImages,
  teamImages,
  projectImages,
} from "@/site/sections/gallery/galleryData";

export default function GalleryPage() {
  return (
    <div className={styles.page}>
      <section className={`${styles.section} section-divider`}>
        <div className="container">
          <Reveal>
            <GallerySection
              title="Our Workplace"
              subtitle="Built for precision, reliability, and industrial excellence"
              images={workplaceImages}
            />
          </Reveal>
        </div>
      </section>

      <section className={`${styles.section} section-divider`}>
        <div className="container">
          <Reveal>
            <GallerySection
              title="Our Teams"
              subtitle="Driven by expertise, collaboration, and engineering discipline"
              images={teamImages}
            />
          </Reveal>
        </div>
      </section>

      <section className={`${styles.section} section-divider`}>
        <div className="container">
          <Reveal>
            <GallerySection
              title="Our Projects"
              subtitle="From concept to commissioning, delivering scalable automation systems"
              images={projectImages}
            />
          </Reveal>
        </div>
      </section>
    </div>
  );
}