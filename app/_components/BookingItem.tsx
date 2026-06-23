"use client";

import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Prisma } from "../generated/prisma/client";
import { ptBR } from "date-fns/locale";
import { format, isBefore } from "date-fns";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import PhoneItem from "./PhoneItem";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import deleteBooking from "../_actions/delete-booking";
import { toast } from "sonner";
import { useState } from "react";

interface BookingItemProps {
  booking: Omit<
    Prisma.BookingGetPayload<{
      include: {
        service: { include: { barbershop: true } };
      };
    }>,
    "service"
  > & {
    service: Omit<
      Prisma.BookingGetPayload<{
        include: {
          service: { include: { barbershop: true } };
        };
      }>["service"],
      "price"
    > & {
      price: number;
    };
  };
}

export default function BookingItem({ booking }: BookingItemProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isCompleted = isBefore(booking.date, new Date());
  const {
    service: { barbershop },
  } = booking;

  const handleDeleteBooking = async () => {
    try {
      setIsSheetOpen(false);
      await deleteBooking(booking.id);
      toast.success("Reserva cancelada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cancelar reserva. Tente novamente!");
    }
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger>
        <div className="px-5 mt-2 min-w-full">
          <Card className="p-0 flex flex-row gap-2">
            <CardContent className="flex flex-col gap-2 w-full py-4">
              <Badge variant={isCompleted ? "secondary" : "default"}>
                {isCompleted ? "Finalizado" : "Confirmado"}
              </Badge>
              <h3 className="font-semibold text-base text-start">
                {booking.service.name}
              </h3>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={barbershop.imageUrl} />
                </Avatar>
                <p className="text-sm truncate">{barbershop.name}</p>
              </div>
            </CardContent>
            <CardContent className="flex flex-col text-center items-center justify-center w-[100px] border-l border-[chart-5]">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <h3 className="text-3xl font-bold">
                {format(booking.date, "d")}
              </h3>
              <p className="text-base">{format(booking.date, "HH:mm")}</p>
            </CardContent>
          </Card>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="border-b p-5">
            <SheetTitle className="font-semibold text-base">
              Informações da Reserva
            </SheetTitle>
          </div>
        </SheetHeader>
        <div className="relative w-full h-[180px] p-5 flex items-end justify-center">
          <Image
            src="/map.png"
            alt="Map"
            fill
            className="rounded-lg object-cover px-5"
          />
          <Card className="z-10 absolute w-[80%]">
            <CardContent className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={barbershop.imageUrl} />
              </Avatar>
              <div className="flex flex-col">
                <h3 className="font-semibold">{barbershop.name}</h3>
                <h4 className="text-xs text-muted-foreground truncate">
                  {barbershop.address}
                </h4>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <div className="p-5 border-t">
            <Badge variant={isCompleted ? "secondary" : "default"}>
              {isCompleted ? "Finalizado" : "Confirmado"}
            </Badge>
          </div>
          <Card className="mx-5">
            <CardContent className="flex flex-col gap-2 justify-between items-center">
              <div className="flex justify-between items-center w-full">
                <h2 className="font-semibold text-base">
                  {booking.service.name}
                </h2>
                <h3 className="text-primary font-bold">
                  R$ {booking.service.price.toFixed(2)}
                </h3>
              </div>
              <div className="flex justify-between items-center w-full">
                <h2 className="text-sm text-muted-foreground">Data</h2>
                <h3 className="text-muted-foreground text-sm">
                  {format(booking.date, "dd 'de' MMMM", { locale: ptBR })}
                </h3>
              </div>
              <div className="flex justify-between items-center w-full">
                <h2 className="text-sm text-muted-foreground">Horário</h2>
                <h3 className="text-muted-foreground text-sm">
                  {format(booking.date, "HH:mm")}
                </h3>
              </div>
              <div className="flex justify-between items-center w-full">
                <h2 className="text-sm text-muted-foreground">Barbearia</h2>
                <h3 className="text-muted-foreground text-sm">
                  {barbershop.name}
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="p-5 flex flex-col gap-3">
          {barbershop.phones.map((phone, index) => (
            <PhoneItem key={`${phone}-${index}`} phone={phone} />
          ))}
        </div>
        <SheetFooter className="p-5">
          <div className="flex flex-row gap-3">
            <SheetClose className="flex-1">
              <Button
                className="w-full"
                variant="outline"
                render={<Link href={"/bookings"} />}
                nativeButton={false}
              >
                Voltar
              </Button>
            </SheetClose>
            {!isCompleted && (
              <AlertDialog>
                <AlertDialogTrigger
                  nativeButton={true}
                  render={
                    <Button className="flex-1" variant="destructive">
                      Cancelar reserva
                    </Button>
                  }
                />
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancelar reserva</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja cancelar a sua reserva?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">
                      Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      onClick={handleDeleteBooking}
                    >
                      Confirmar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
