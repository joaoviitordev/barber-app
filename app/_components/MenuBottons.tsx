import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { SheetClose } from "./ui/sheet";

interface MenuBottonsProps {
  imageUrl: string;
  title: string;
}

export const menuBottons: MenuBottonsProps[] = [
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

export default function MenuBottons() {
  return (
    <div className="p-5 pt-0 flex flex-col gap-2 border-b border-[chart-5]">
      {menuBottons.map((item: MenuBottonsProps) => (
        <SheetClose
          key={item.title}
          nativeButton={false}
          render={
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              nativeButton={false}
              render={<Link href={`/barbershops?search=${item.title}`} />}
            />
          }
        >
          <Image src={item.imageUrl} alt={item.title} width={20} height={20} />
          <p>{item.title}</p>
        </SheetClose>
      ))}
    </div>
  );
}
