import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Prisma } from "../generated/prisma/client";
import { ptBR } from "date-fns/locale";
import { format, isBefore } from "date-fns";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: { include: { barbershop: true } };
    };
  }>;
}

export default function BookingItem({ booking }: BookingItemProps) {
  const isCompleted = isBefore(booking.date, new Date());
  return (
    <div className="px-5 mt-2 min-w-[90%]">
      <Card className="p-0 flex flex-row gap-2">
        <CardContent className="flex flex-col gap-2 w-full py-4">
          <Badge variant={isCompleted ? "secondary" : "default"}>
            {isCompleted ? "Finalizado" : "Confirmado"}
          </Badge>
          <h3 className="font-semibold text-lg">{booking.service.name}</h3>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={booking.service.barbershop.imageUrl} />
            </Avatar>
            <p className="text-base">{booking.service.barbershop.name}</p>
          </div>
        </CardContent>
        <CardContent className="flex flex-col text-center items-center justify-center w-[100px] border-l border-[chart-5]">
          <p className="text-sm capitalize">
            {format(booking.date, "MMMM", { locale: ptBR })}
          </p>
          <h3 className="text-3xl font-bold">{format(booking.date, "d")}</h3>
          <p className="text-base">{format(booking.date, "HH:mm")}</p>
        </CardContent>
      </Card>
    </div>
  );
}
