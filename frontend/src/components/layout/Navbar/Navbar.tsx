import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>

        {/* LEFT — LOGO */}
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/logo.png"
              alt="VSM Venture Control Systems"
              width={160}
              height={50}
              priority
            />
          </Link>
        </div>

        {/* CENTER — NAV LINKS */}
        <nav className={styles.center}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`${styles.link} ${isActive ? styles.active : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT — PHONE BUTTON */}
        <div className={styles.right}>
          <button className={styles.phoneButton}>
            <Image
              src="/icons/phone.svg"
              alt="Contact"
              width={22}
              height={22}
            />
          </button>
        </div>

      </div>
    </header>
  );
}