import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Header from "../_components/Header";
import BookingItem from "../_components/BookingItem";

export default async function Bookings() {
  const session = await getServerSession(authOptions);

  if (!session?.user) return redirect("/");

  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: session.user.id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
  });

  const finishedBookings = await db.booking.findMany({
    where: {
      userId: session.user.id,
      date: {
        lte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
  });

  return (
    <>
      <Header />
      <div>
        <h2 className="text-xl font-semibold p-5 pb-0">Agendamentos</h2>
        <div className="flex flex-col gap-3 mt-5">
          <h3 className="uppercase text-gray-500 text-sm px-5">Confirmados</h3>
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
        <div className="flex flex-col gap-3 mt-5">
          <h3 className="uppercase text-gray-500 text-sm px-5">Finalizados</h3>
          {finishedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  );
}
