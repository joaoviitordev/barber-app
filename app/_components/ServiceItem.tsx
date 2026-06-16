import { BarbershopService } from "../generated/prisma/client";
import Image from "next/image";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface ServiceItemProps {
  service: BarbershopService;
}

export default function ServiceItem({ service }: ServiceItemProps) {
  return (
    <Card className="p-5">
      <div className="flex gap-3">
        <div className="relative min-w-[110px] max-w-[110px] min-h-[110px] max-h-[110px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            width={120}
            height={120}
            className="rounded-xl"
          />
        </div>
        <div className="flex flex-col w-full gap-1">
          <h3 className="font-bold text-base">{service.name}</h3>
          <p className="text-muted-foreground">{service.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-primary font-bold">
              R$ {service.price.toFixed(2)}
            </span>
            <Button variant="secondary">Reservar</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
