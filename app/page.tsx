import { SearchIcon } from "lucide-react";
import Header from "./_components/Header";
import { Input } from "./_components/ui/input";
import { Button } from "./_components/ui/button";
import { db } from "./_lib/prisma";
import BarberShopItem from "./_components/BarberShopItem";
import FastButtons from "./_components/FastButtons";
import BannerHomePage from "./_components/BannerHomePage";
import BookingItem from "./_components/BookingItem";

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
      {/* INPUT */}
      <div className="flex gap-2 px-5 mt-3">
        <Input placeholder="Buscar Barbearias" />
        <Button size="icon">
          <SearchIcon />
        </Button>
      </div>
      <FastButtons />
      <BannerHomePage />
      <BookingItem />
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
    </main>
  );
}
