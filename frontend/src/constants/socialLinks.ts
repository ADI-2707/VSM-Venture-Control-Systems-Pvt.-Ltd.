export interface SocialLink {
  name: string;
  href: string;
  icon: string;
  className: string;
  tooltip: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: "/icons/facebook.svg",
    className: "facebook",
    tooltip: "Follow us on Facebook",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: "/icons/instagram.svg",
    className: "instagram",
    tooltip: "Follow us on Instagram",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: "/icons/linkedin.svg",
    className: "linkedin",
    tooltip: "Connect on LinkedIn",
  },
];