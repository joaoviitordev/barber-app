import Header from "./_components/Header";
import { db } from "./_lib/prisma";
import BarberShopItem from "./_components/BarberShopItem";
import FastButtons from "./_components/FastButtons";
import BannerHomePage from "./_components/BannerHomePage";
import BookingItem from "./_components/BookingItem";
import SearchItem from "./_components/SearchItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import Welcome from "./_components/Welcome";

export default async function Home() {
  const session = await getServerSession(authOptions);

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
      <Welcome />
      <SearchItem />
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
