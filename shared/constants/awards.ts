export type Award = {
  id: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  imageClass: string;
  width: number;
  height: number;
  overlay?: boolean;
};

export const awards = [
  {
    id: "youth",
    title: "Icon Of Youth In Business Award 2017",
    summary:
      "Mr Navas And Majeed (Director Pkc Fruits) Received Icon Of Youth In Business Award-2017 From Hon. Minister TP Ramakrishnan.",
    image: "/awards/youth-award.jpg",
    imageAlt: "Mr. Navas receiving the Icon of Youth in Business Award 2017",
    imageClass: "object-[70%_center]",
    width: 960,
    height: 720,
    overlay: true,
  },
  {
    id: "secretary",
    title:
      "Mr Navas Has Been Selected as a Secrectary of the “Federation of Business Organiszations North Zone” Kerala",
    summary: "",
    image: "/awards/navas-portrait.jpg",
    imageAlt: "Portrait of Mr. Navas",
    imageClass: "object-center",
    width: 778,
    height: 664,
    overlay: false,
  },
  {
    id: "logistica",
    title: "Fruit Logistica Innovation Award 2022",
    summary:
      "A new tomato variety by Granada La Palma from Spain won this year’s FRUIT LOGISTICA Innovation Award.",
    image: "/awards/fruit-logistica.jpg",
    imageAlt: "Handshake at the Asia Fruit Logistica stand",
    imageClass: "object-center",
    width: 2048,
    height: 957,
    overlay: false,
  },
] as const satisfies readonly Award[];

export type AwardId = (typeof awards)[number]["id"];
