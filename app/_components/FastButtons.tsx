import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

interface FastButtonsProps {
  imageUrl: string;
  title: string;
}

export const fastButtonsList: FastButtonsProps[] = [
  {
    imageUrl: "/tesoura.svg",
    title: "Cabelo",
  },
  {
    imageUrl: "/barba.svg",
    title: "Barba",
  },
  {
    imageUrl: "/navalha.svg",
    title: "Acabamento",
  },
  {
    imageUrl: "/hidratacao.svg",
    title: "Hidratação",
  },
  {
    imageUrl: "/massagem.svg",
    title: "Massagem",
  },
  {
    imageUrl: "/sobrancelha.svg",
    title: "Sobrancelhas",
  },
];

export default function FastButtons() {
  return (
    <div className="px-5 mt-6 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
      {fastButtonsList.map((item: FastButtonsProps) => (
        <Button variant="outline" key={item.title}>
          <Link
            href={`/barbershops?search=${item.title}`}
            className="flex items-center gap-2"
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={20}
              height={20}
            />
            <p className="text-sm">{item.title}</p>
          </Link>
        </Button>
      ))}
    </div>
  );
}
