import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Solutions & Services", href: "/solutions" },
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "Application Areas", href: "/applications" },
  { label: "Gallery", href: "/gallery" },
  { label: "Clients", href: "/clients" },
  { label: "Career", href: "/career" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>

        <Link href="/" className={styles.logo}>
          <Image
            src="/logo.png"
            alt="VSM Venture Control Systems"
            width={160}
            height={50}
            priority
          />
        </Link>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ))}
        </nav>

      </div>
    </header>
  );
}