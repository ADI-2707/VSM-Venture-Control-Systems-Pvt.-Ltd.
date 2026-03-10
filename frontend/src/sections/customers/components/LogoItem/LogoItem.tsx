import Image from "next/image";
import styles from "./LogoItem.module.css";

type LogoItemProps = {
  name: string;
  src: string;
};

export default function LogoItem({ name, src }: LogoItemProps) {
  return (
    <div className={styles.logoItem}>
      <Image
        src={src}
        alt={name}
        width={140}
        height={60}
        className={styles.logoImage}
      />
    </div>
  );
}