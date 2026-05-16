import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import car4 from "@/assets/car-4.jpg";
import car5 from "@/assets/car-5.jpg";
import car6 from "@/assets/car-6.jpg";

export type Car = {
  id: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  km: number;
  transmission: "Automático" | "Manual" | "CVT";
  fuel: "Flex" | "Gasolina" | "Diesel" | "Híbrido";
  price: number;
  category: "economico" | "sedan" | "suv" | "seminovo" | "picape";
  badge?: "Destaque" | "Mais procurado" | "Recém-chegado" | "Oportunidade";
  image: string;
  color: string;
  doors: number;
  description: string;
};

export const cars: Car[] = [
  {
    id: "onix-2022",
    brand: "Chevrolet",
    model: "Onix",
    version: "1.0 LT",
    year: 2022,
    km: 28400,
    transmission: "Manual",
    fuel: "Flex",
    price: 72900,
    category: "economico",
    badge: "Mais procurado",
    image: car1,
    color: "Branco",
    doors: 4,
    description: "Onix 1.0 LT em estado impecável, único dono, todas as revisões em concessionária.",
  },
  {
    id: "serie5-2021",
    brand: "BMW",
    model: "Série 5",
    version: "530i M Sport",
    year: 2021,
    km: 41200,
    transmission: "Automático",
    fuel: "Gasolina",
    price: 329900,
    category: "sedan",
    badge: "Destaque",
    image: car2,
    color: "Preto",
    doors: 4,
    description: "Sedan executivo com pacote M Sport, teto solar, bancos em couro e revisões completas.",
  },
  {
    id: "gle-2023",
    brand: "Mercedes-Benz",
    model: "GLE 450",
    version: "4MATIC Híbrido",
    year: 2023,
    km: 18900,
    transmission: "Automático",
    fuel: "Híbrido",
    price: 589000,
    category: "suv",
    badge: "Recém-chegado",
    image: car3,
    color: "Cinza Grafite",
    doors: 5,
    description: "SUV premium com tração 4MATIC, interior em couro nappa e tecnologia híbrida.",
  },
  {
    id: "hb20-2021",
    brand: "Hyundai",
    model: "HB20",
    version: "1.0 Vision",
    year: 2021,
    km: 36500,
    transmission: "Manual",
    fuel: "Flex",
    price: 64900,
    category: "seminovo",
    badge: "Oportunidade",
    image: car4,
    color: "Prata",
    doors: 4,
    description: "HB20 Vision econômico, ideal para o dia a dia urbano, baixa quilometragem.",
  },
  {
    id: "hb20s-2022",
    brand: "Hyundai",
    model: "HB20",
    version: "1.0 Sport Turbo",
    year: 2022,
    km: 22100,
    transmission: "Automático",
    fuel: "Flex",
    price: 89900,
    category: "economico",
    image: car5,
    color: "Vermelho",
    doors: 4,
    description: "HB20 turbo esportivo, câmbio automático, multimídia e rodas de liga 16''.",
  },
  {
    id: "ranger-2022",
    brand: "Ford",
    model: "Ranger",
    version: "XLT 3.2 4x4",
    year: 2022,
    km: 47800,
    transmission: "Automático",
    fuel: "Diesel",
    price: 239900,
    category: "picape",
    badge: "Destaque",
    image: car6,
    color: "Branco",
    doors: 4,
    description: "Picape Ranger XLT diesel, tração 4x4, ideal para trabalho e lazer.",
  },
];

export const findCar = (id: string) => cars.find((c) => c.id === id);

export const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export const formatKm = (n: number) => `${n.toLocaleString("pt-BR")} km`;
