export interface Project {
  id: number;
  image: string;
  application: string;
  customer: string;
  location: string;
}

export const projects: Project[] = [
  {
    id: 1,
    image: "/images/projects/hot-strip.jfif",
    application: "Hot Strip Mill",
    customer: "Hira Group",
    location: "Raipur Chhattisgarh"
  },
  {
    id: 2,
    image: "/images/projects/pickling-line.jfif",
    application: "Pickling Line",
    customer: "JSOL",
    location: "Orissa"
  },
  {
    id: 3,
    image: "/images/projects/skin-pass.jfif",
    application: "Skin Pass Mill",
    customer: "AMNS",
    location: "Hazira Gujarat"
  },
  {
    id: 4,
    image: "/images/projects/paper-machine.jfif",
    application: "Paper Machine",
    customer: "Magnum Paper",
    location: "Sahibabad UP"
  }
];