"use server";

import { db } from "../_lib/prisma";
import { startOfDay, endOfDay } from "date-fns";

interface CreatingBookingParams {
  userId: string;
  serviceId: string;
  date: Date;
}

export const creatingBooking = async (params: CreatingBookingParams) => {
  const bookingExists = await db.booking.findFirst({
    where: {
      serviceId: params.serviceId,
      date: params.date,
    },
  });

  if (bookingExists) {
    throw new Error("Este horário já está reservado para este serviço.");
  }

  await db.booking.create({
    data: params,
  });
};

export const getBookings = async (serviceId: string, date: Date) => {
  const bookings = await db.booking.findMany({
    where: {
      serviceId,
      date: {
        gte: startOfDay(date),
        lte: endOfDay(date),
      },
    },
  });
  return bookings;
};
