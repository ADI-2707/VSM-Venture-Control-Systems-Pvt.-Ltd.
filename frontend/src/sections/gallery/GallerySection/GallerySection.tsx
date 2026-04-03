"use client";

import styles from "./GallerySection.module.css";

type GalleryImage = {
  src: string;
  alt: string;
};

type Props = {
  title: string;
  images: GalleryImage[];
};

export default function GallerySection({ title, images }: Props) {
  if (images.length !== 7) {
    console.warn("GallerySection requires exactly 7 images");
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>{title}</h2>

      <div className={styles.grid}>

        <div className={styles.small}>
          <img src={images[0].src} alt={images[0].alt} />
        </div>
        <div className={styles.small}>
          <img src={images[1].src} alt={images[1].alt} />
        </div>
        <div className={styles.small}>
          <img src={images[2].src} alt={images[2].alt} />
        </div>

        <div className={styles.big}>
          <img src={images[3].src} alt={images[3].alt} />
        </div>

        <div className={styles.small}>
          <img src={images[4].src} alt={images[4].alt} />
        </div>
        <div className={styles.small}>
          <img src={images[5].src} alt={images[5].alt} />
        </div>
        <div className={styles.small}>
          <img src={images[6].src} alt={images[6].alt} />
        </div>
      </div>
    </div>
  );
}