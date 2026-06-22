"use client";

import {
  Barbershop,
  BarbershopService,
  Booking,
} from "../generated/prisma/client";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { creatingBooking, getBookings } from "../_actions/creating-booking";
import { toast } from "sonner";

interface ServiceItemProps {
  service: Omit<BarbershopService, "price"> & {
    price: number;
  };
  barbershop: Barbershop;
}

const TIME_LIST = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

export default function ServiceItem({ service, barbershop }: ServiceItemProps) {
  const { data } = useSession();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);

  const handleDateSelect = async (date: Date | undefined) => {
    setDate(date);
    setSelectedTime(undefined);
    if (date) {
      try {
        const bookings = await getBookings(service.id, date);
        setDayBookings(bookings);
      } catch (error) {
        console.error("Erro ao carregar agendamentos:", error);
      }
    } else {
      setDayBookings([]);
    }
  };

  const handleBookingCreate = async () => {
    const hours = selectedTime?.split(":")[0];
    const minutes = selectedTime?.split(":")[1];

    if (!date || !hours || !minutes) {
      return;
    }

    const user = data?.user as { id: string } | undefined;
    if (!user) {
      // Return or handle sign-in/error if user is not authenticated
      return;
    }

    const bookingDate = new Date(date);
    bookingDate.setHours(Number(hours));
    bookingDate.setMinutes(Number(minutes));
    bookingDate.setSeconds(0);
    bookingDate.setMilliseconds(0);

    try {
      await creatingBooking({
        serviceId: service.id,
        userId: user.id,
        date: bookingDate,
      });
      toast.success("Reserva realizada com sucesso!");

      // Refresh bookings for the day
      const bookings = await getBookings(service.id, date);
      setDayBookings(bookings);
      setSelectedTime(undefined);
      setDate(undefined);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao realizar reserva!");
    }
  };

  const isTimeBooked = (time: string) => {
    if (!date) return false;
    const [hours, minutes] = time.split(":").map(Number);
    return dayBookings.some((booking) => {
      const bookingDate = new Date(booking.date);
      return (
        bookingDate.getHours() === hours && bookingDate.getMinutes() === minutes
      );
    });
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

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
            <Sheet>
              <SheetTrigger
                render={<Button variant="secondary">Reservar</Button>}
              ></SheetTrigger>
              <SheetContent>
                <SheetHeader className="border-b">
                  <SheetTitle>Fazer Reserva</SheetTitle>
                  <SheetDescription>
                    Selecione a data e hora para agendar o serviço.
                  </SheetDescription>
                  <div className="flex w-full items-center justify-center pt-2">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      className="rounded-md border w-full"
                      selected={date}
                      onSelect={handleDateSelect}
                    />
                  </div>
                </SheetHeader>
                {date && (
                  <div className="flex items-center gap-3 p-5 pt-1 border-b overflow-x-auto [&::-webkit-scrollbar]:hidden">
                    {TIME_LIST.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="rounded-full"
                        disabled={isTimeBooked(time)}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}

                {date && selectedTime && (
                  <Card className="mx-5">
                    <CardContent className="flex flex-col gap-2 justify-between items-center">
                      <div className="flex justify-between items-center w-full">
                        <h2 className="font-semibold text-base">
                          {service.name}
                        </h2>
                        <h3 className="text-primary font-bold">
                          R$ {service.price.toFixed(2)}
                        </h3>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <h2 className="text-sm text-muted-foreground">Data</h2>
                        <h3 className="text-muted-foreground text-sm">
                          {format(date, "dd 'de' MMMM", { locale: ptBR })}
                        </h3>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <h2 className="text-sm text-muted-foreground">
                          Horário
                        </h2>
                        <h3 className="text-muted-foreground text-sm">
                          {selectedTime}
                        </h3>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <h2 className="text-sm text-muted-foreground">
                          Barbearia
                        </h2>
                        <h3 className="text-muted-foreground text-sm">
                          {barbershop.name}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                )}
                <SheetFooter className="px-5">
                  <SheetClose
                    render={
                      <Button
                        variant={date && selectedTime ? "default" : "outline"}
                        className="w-full"
                        disabled={!date || !selectedTime}
                        onClick={handleBookingCreate}
                      >
                        Confirmar Reserva
                      </Button>
                    }
                  ></SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </Card>
  );
}
