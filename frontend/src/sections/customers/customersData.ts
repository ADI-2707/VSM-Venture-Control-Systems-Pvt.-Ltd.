export type Logo = {
  name: string;
  src: string;
};

export type CustomerGroup = {
  title: string;
  logos: Logo[];
};

export const customerGroups: CustomerGroup[] = [
  {
    title: "Our Customers",
    logos: [
      { name: "Aarti", src: "/customers/aarti.png" },
      { name: "Agrawal", src: "/customers/agrawal.png" },
      { name: "Anand", src: "/customers/anand.png" },
      { name: "Empower Steel", src: "/customers/empower_steel.png" },
      { name: "Genus", src: "/customers/genus.png" },
      { name: "Gupta Steels", src: "/customers/gupta_steels.png" },
      { name: "Jindal", src: "/customers/jindal.png" },
      { name: "JSL", src: "/customers/jsl.png" },
      { name: "JSW", src: "/customers/jsw.png" },
      { name: "KDS", src: "/customers/kds.png" },
      { name: "Khanna", src: "/customers/khanna.png" },
      { name: "KR Pulp", src: "/customers/kr_pulp.png" },
      { name: "Orient", src: "/customers/orient.png" },
      { name: "RCS", src: "/customers/rcs.png" },
      { name: "Sri", src: "/customers/sri.png" },
      { name: "Super", src: "/customers/super.png" },
      { name: "Tata Steel", src: "/customers/tata_steel.png" },
      { name: "Uttam", src: "/customers/uttam.png" },
      { name: "Westrock", src: "/customers/westrock.png" }
    ]
  },
  {
    title: "OEM & Consultants",
    logos: [
      { name: "Esmech", src: "/consultants/esmech.png" },
      { name: "Hardayal Engineering", src: "/consultants/hardayal.png" },
      { name: "Innov Engineering", src: "/consultants/innov.png" },
      { name: "Kibos", src: "/consultants/kibos.png" },
      { name: "Korus", src: "/consultants/korus.png" },
      { name: "Magadh", src: "/consultants/magadh.png" },
      { name: "MAS", src: "/consultants/mas.png" },
      { name: "MMC", src: "/consultants/mmc.png" },
      { name: "RC Paper Machines", src: "/consultants/rcpaper.png" },
      { name: "Tenova", src: "/consultants/tenova.png" }
    ]
  }
];