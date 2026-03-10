import styles from "./LogoScroller.module.css";
import LogoItem from "../LogoItem/LogoItem";

type Logo = {
  name: string;
  src: string;
};

type LogoScrollerProps = {
  logos: Logo[];
  direction?: "left" | "right";
  speed?: number;
};

export default function LogoScroller({ logos, direction = "left", speed = 35 }: LogoScrollerProps) {
  const duplicatedLogos = [...logos, ...logos];

  const directionClass =
    direction === "right" ? styles.scrollRight : styles.scrollLeft;

  return (
    <div className={styles.scrollerWrapper}>
      <div className={`${styles.scrollerTrack} ${directionClass}`}
        style={{ ["--scroll-duration" as any]: `${speed}s` }}>
        {duplicatedLogos.map((logo, index) => (
          <LogoItem key={index} name={logo.name} src={logo.src} />
        ))}
      </div>
    </div>
  );
}