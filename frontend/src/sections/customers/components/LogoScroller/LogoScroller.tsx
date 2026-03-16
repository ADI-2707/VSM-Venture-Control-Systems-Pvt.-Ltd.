import styles from "./LogoScroller.module.css";
import LogoItem from "../LogoItem/LogoItem";
import { CSSProperties } from "react";

type Logo = {
  name: string;
  src: string;
};

type LogoScrollerProps = {
  logos: Logo[];
  direction?: "left" | "right";
  speed?: number;
  play?: boolean;
};

export default function LogoScroller({
  logos,
  direction = "left",
  speed = 35,
  play = true
}: LogoScrollerProps) {
  const duplicatedLogos = [...logos, ...logos];

  const directionClass =
    direction === "right" ? styles.scrollRight : styles.scrollLeft;

  const playClass = play ? styles.play : styles.pause;

  return (
    <div className={styles.scrollerWrapper}>
      <div
        className={`${styles.scrollerTrack} ${directionClass} ${playClass}`}
        style={{ ["--scroll-duration" as keyof CSSProperties]: `${speed}s` }}
      >
        {duplicatedLogos.map((logo, index) => (
          <LogoItem key={index} name={logo.name} src={logo.src} />
        ))}
      </div>
    </div>
  );
}