import styles from "./LogoScroller.module.css";
import LogoItem from "../LogoItem/LogoItem";

type Logo = {
  name: string;
  src: string;
};

type LogoScrollerProps = {
  logos: Logo[];
  direction?: "left" | "right";
};

export default function LogoScroller({ logos, direction = "left" }: LogoScrollerProps) {
  const duplicatedLogos = [...logos, ...logos];

  const directionClass =
    direction === "right" ? styles.scrollRight : styles.scrollLeft;

  return (
    <div className={styles.scrollerWrapper}>
      <div className={`${styles.scrollerTrack} ${directionClass}`}>
        {duplicatedLogos.map((logo, index) => (
          <LogoItem key={index} name={logo.name} src={logo.src} />
        ))}
      </div>
    </div>
  );
}