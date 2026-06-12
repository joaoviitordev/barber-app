import { SearchIcon } from "lucide-react";
import Header from "./_components/Header";
import { Input } from "./_components/ui/input";
import { Button } from "./_components/ui/button";
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { Badge } from "./_components/ui/badge";
import { Avatar, AvatarImage } from "./_components/ui/avatar";
import { db } from "./_lib/prisma";
import Footer from "./_components/Footer";
import BarberShopItem from "./_components/BarberShopItem";
import FastButtons from "./_components/FastButtons";

export default async function Home() {
  const babershop = await db.barbershop.findMany({});
  const popularBarberShop = await db.barbershop.findMany({
    take: 10,
    orderBy: {
      name: "desc",
    },
  });
  return (
    <main>
      <Header />
      <div className="p-5">
        <h1 className="text-xl font-bold py-1">Olá, Faça seu Login!</h1>
        <h2 className="text-sm mt-0.5">Sexta-Feira, 12 de Junho</h2>
      </div>

      <div className="flex gap-2 px-5 mt-3">
        <Input placeholder="Buscar Barbearias" />
        <Button size="icon">
          <SearchIcon />
        </Button>
      </div>

      <FastButtons />

      <div className="w-full px-5 mt-5">
        <Image
          src="/Banner-Hero.svg"
          alt="Agende nos melhores com FSW Barber"
          width={100}
          height={100}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      {/* AGENDAMENTOS */}
      <div className="px-5 mt-2">
        <h2 className="uppercase text-gray-500 text-sm py-4">Agendamentos</h2>
        <Card className="p-0 flex flex-row gap-2">
          <CardContent className="flex flex-col gap-2 w-full py-4">
            <Badge variant="default">Confirmado</Badge>
            <h3 className="font-semibold text-lg">Corte de Cabelo</h3>
            <div className="flex items-center gap-2">
              <Avatar className="">
                <AvatarImage src="https://utfs.io/f/6b0888f8-b69f-4be7-a13b-52d1c0c9cab2-17m.png" />
              </Avatar>
              <p className="text-base">Vintage Barber</p>
            </div>
          </CardContent>
          <CardContent className="flex flex-col text-center items-center justify-center w-[100px] border-l border-[chart-5]">
            <p className="text-sm">Junho</p>
            <h3 className="text-3xl font-bold">12</h3>
            <p className="text-base">09:30</p>
          </CardContent>
        </Card>
      </div>
      {/* RECOMENDADOS */}
      <div className="px-5 mt-2">
        <h2 className="uppercase text-gray-500 text-sm py-4">Recomendados</h2>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {babershop.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
      {/* POPULARES */}
      <div className="px-5 mt-2">
        <h2 className="uppercase text-gray-500 text-sm py-4">Populares</h2>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {popularBarberShop.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
