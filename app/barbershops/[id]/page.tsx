import { db } from "@/app/_lib/prisma";
import { Button } from "@/app/_components/ui/button";
import Image from "next/image";
import { ArrowLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import ServiceItem from "@/app/_components/ServiceItem";
import PhoneItem from "@/app/_components/PhoneItem";
import Menu from "@/app/_components/Menu";

interface BarberShopProps {
  params: Promise<{ id: string }>;
}

export default async function barberShopPage({ params }: BarberShopProps) {
  const { id } = await params;
  const barbershop = await db.barbershop.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    return null;
  }

  return (
    <div>
      <div className="relative">
        <div className="absolute top-0 left-0 z-10 p-5 flex items-center justify-between w-full">
          <Button
            variant="secondary"
            nativeButton={false}
            render={<Link href="/" />}
          >
            <ArrowLeftIcon />
          </Button>
          <Menu />
        </div>
        <div className="relative">
          <Image
            src={barbershop?.imageUrl}
            alt={barbershop?.name}
            width={400}
            height={250}
            loading="eager"
            className="w-full h-[250px] object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col p-5 border-b border-[chart-5]">
        <h1 className="text-xl font-bold">{barbershop?.name}</h1>
        <div className="flex items-center gap-1 mt-2">
          <MapPinIcon className="text-primary h-4 w-4" />
          <span className="text-sm text-muted-foreground">
            {barbershop?.address}
          </span>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <StarIcon className="text-primary fill-primary h-4 w-4" />
          <span className="text-sm text-muted-foreground">
            5,0 (457 avaliações)
          </span>
        </div>
      </div>
      <div className="p-5 border-b border-[chart-5]">
        <h2 className="uppercase text-gray-500 font-bold text-base">
          Sobre nós
        </h2>
        <p className="mt-2 text-sm">
          Bem-vindo à {barbershop.name}, onde tradição encontra estilo. Nossa
          equipe de mestres barbeiros transforma cortes de cabelo e barbas em
          obras de arte. Em um ambiente acolhedor, promovemos confiança, estilo
          e uma comunidade unida.
        </p>
      </div>
      <div className="p-5 border-b border-[chart-5] flex flex-col gap-4">
        <h2 className="uppercase text-gray-500 font-bold text-base">
          Serviços
        </h2>
        {barbershop.services.map((service) => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </div>
      <div className="p-5 pb-0 flex flex-col gap-4">
        <h2 className="uppercase text-gray-500 font-bold text-base">Contato</h2>
        <PhoneItem phone={barbershop.phones[0]} />
      </div>
    </div>
  );
}
