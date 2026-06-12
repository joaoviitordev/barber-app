import { Barbershop } from "@/app/generated/prisma/client";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";
import Image from "next/image";

interface BarberShopItemProps {
  barbershop: Barbershop;
}

export default function BarberShopItem({ barbershop }: BarberShopItemProps) {
  return (
    <Card className="min-w-[167px] max-w-[167px] p-0 mt-2">
      <CardContent className="p-0 border-l border-[chart-5]">
        <div className="relative h-[125px] w-full p-1">
          <div className="absolute top-2 left-2 z-10">
            <Badge
              variant="secondary"
              className="opacity-90 flex items-center gap-1 bg-black/60 text-white border-none backdrop-blur-xs mt-1 ml-1"
            >
              <StarIcon className="fill-primary text-primary h-3 w-3" />
              <span className="text-xs font-semibold">5,0</span>
            </Badge>
          </div>
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            width={167}
            height={159}
            className="object-cover rounded-2xl p-1"
          />
        </div>
        <div className="px-3 pb-2 flex flex-col items-start">
          <h3 className="font-semibold text-sm truncate text-foreground">
            {barbershop.name}
          </h3>
          <p className="text-xs text-muted-foreground truncate mt-1">
            {barbershop.address}
          </p>
          <Button
            variant="secondary"
            className="w-full mt-3 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
