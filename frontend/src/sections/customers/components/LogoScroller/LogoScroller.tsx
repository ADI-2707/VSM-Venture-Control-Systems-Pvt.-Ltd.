import styles from "./LogoScroller.module.css";
import LogoItem from "../LogoItem/LogoItem";

type Logo = {
  name: string;
  src: string;
};

type LogoScrollerProps = {
  logos: Logo[];
};

export default function LogoScroller({ logos }: LogoScrollerProps) {
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className={styles.scrollerWrapper}>
      <div className={styles.scrollerTrack}>
        {duplicatedLogos.map((logo, index) => (
          <LogoItem key={index} name={logo.name} src={logo.src} />
        ))}
      </div>
    </div>
  );
}