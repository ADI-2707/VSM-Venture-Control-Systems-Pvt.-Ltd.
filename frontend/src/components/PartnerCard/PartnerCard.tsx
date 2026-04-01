"use client";

import { motion, Variants } from "framer-motion";
import styles from "./PartnerCard.module.css";

interface Props {
  name: string;
  logo: string;
  description: string;
  variant: "abb" | "psr" | "metals";
}

const logoVariants: Variants = {
  rest: {
    y: 0,
    rotateX: 0,
  },
  hover: {
    y: "110%",
    rotateX: -12,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1], // premium easing (expo-like)
    },
  },
};

const textVariants: Variants = {
  rest: {
    opacity: 0.75,
    y: 6,
  },
  hover: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08,
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const cardVariants: Variants = {
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.03,
    y: -4,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function PartnerCard({ name, logo, description, variant }: Props) {
  return (
    <motion.div
      className={`${styles.card} ${styles[variant]}`}
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <div className={styles.content}>
        <div className={styles.name}>{name}</div>

        <motion.div
          className={styles.description}
          variants={textVariants}
        >
          {description}
        </motion.div>
      </div>

      <motion.div
        className={styles.logoLayer}
        variants={logoVariants}
      >
        <img src={logo} alt={name} />
      </motion.div>
    </motion.div>
  );
}