export interface Partner {
  name: string;
  logo: string;
  description: string;
}

export const partners: Partner[] = [
  {
    name: "ABB",
    logo: "/partners/abb.png",
    description:
      "ABB is a global leader in electrification and automation, enabling industries to improve performance while reducing environmental impact.",
  },
  {
    name: "PSR",
    logo: "/partners/psr.png",
    description:
      "PSR provides advanced automation solutions including PLC systems, industrial PCs, and embedded control technologies.",
  },
  {
    name: "metals-PAS",
    logo: "/partners/metals.png",
    description:
      "metals-PAS specializes in metallurgical automation systems for rolling mills, processing lines, and steel manufacturing.",
  },
];