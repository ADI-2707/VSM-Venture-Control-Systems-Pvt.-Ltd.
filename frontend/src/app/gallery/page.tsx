import Reveal from "@/components/Reveal/Reveal";
import styles from "./GalleryPage.module.css";

import GallerySection from "@/sections/gallery/GallerySection/GallerySection";
import {
  workplaceImages,
  teamImages,
  projectImages,
} from "@/sections/gallery/galleryData";

export default function GalleryPage() {
  return (
    <div className={styles.page}>

      <section className={styles.section}>
        <div className="container">
          <Reveal>
            <GallerySection
              title="Our Workplace"
              images={workplaceImages}
            />
          </Reveal>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <Reveal>
            <GallerySection
              title="Our Teams"
              images={teamImages}
            />
          </Reveal>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <Reveal>
            <GallerySection
              title="Our Projects"
              images={projectImages}
            />
          </Reveal>
        </div>
      </section>

    </div>
  );
}