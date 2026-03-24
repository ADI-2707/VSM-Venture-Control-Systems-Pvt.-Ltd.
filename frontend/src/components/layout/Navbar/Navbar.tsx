"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const primaryNav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Solutions & Services", href: "/solutions" },
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
];

const secondaryNav = [
  { label: "Application Areas", href: "/applications" },
  { label: "Gallery", href: "/gallery" },
  { label: "Clients", href: "/clients" },
  { label: "Career", href: "/career" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 20 !== scrolled) {
        setScrolled(currentScrollY > 20);
      }

      const scrollDiff = currentScrollY - lastScrollY;

      if (Math.abs(scrollDiff) > 5) {
        if (scrollDiff > 0 && currentScrollY > 80) {
          setShowNavbar(false);
        } else {
          setShowNavbar(true);
        }

        lastScrollY = currentScrollY;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrolled]);

  return (
    <>
      <header
        className={`${styles.navbar}
        ${scrolled ? styles.scrolled : ""}
        ${showNavbar ? styles.show : styles.hide}
      `}
      >
        <div className={styles.inner}>
          <div className={styles.left}>
            <Link href="/" className={styles.logo}>
              <Image src="/logo2.png" alt="VSM" width={130} height={45} priority />
            </Link>
          </div>

          <nav className={`${styles.center} ${menuOpen ? styles.open : ""}`}>
            {primaryNav.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`${styles.link} ${isActive ? styles.active : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className={styles.mobileOnly}>
              {secondaryNav.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`${styles.link} ${isActive ? styles.active : ""}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className={styles.desktopOnly}>
              <div className={styles.more}>
                <button className={`${styles.link} ${styles.moreTrigger}`}>
                  More
                  <span className={styles.chevron}>▾</span>
                </button>

                <div className={styles.moreMenu}>
                  {secondaryNav.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={styles.dropdownItem}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <div className={styles.right}>
            <button className={styles.phoneButton}>
              <Image src="/icons/phone.svg" alt="Contact" width={22} height={22} />
            </button>

            <button
              className={`${styles.menuButton} ${menuOpen ? styles.open : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ""}`}
        onClick={() => setMenuOpen(false)}
      />
    </>
  );
}