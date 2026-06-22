import Header from "../_components/Header";
import { db } from "../_lib/prisma";
import BarberShopItem from "../_components/BarberShopItem";
import SearchItem from "../_components/SearchItem";

interface BarberShopSearchProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function BarberShopSearch({
  searchParams,
}: BarberShopSearchProps) {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams.search;

  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive", // para não considerar letra maiuscula e minuscula
      },
    },
  });

  return (
    <>
      <Header />
      <div className="mt-6">
        <SearchItem />
      </div>
      <div className="p-5">
        <h2 className="uppercase text-gray-500 text-sm py-4">
          Resultados para: &quot;{search}&quot;
        </h2>
      </div>
      <div className="grid grid-cols-2 px-5 pt-0 pb-3 gap-3">
        {barbershops.map((barbershop) => (
          <BarberShopItem
            key={barbershop.id}
            barbershop={barbershop}
            className="min-w-0 w-full"
          />
        ))}
      </div>
    </>
  );
}
