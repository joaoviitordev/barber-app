import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function Welcome() {
  const session = await getServerSession(authOptions);
  const formattedDate = format(new Date(), "EEEE, d 'de' MMMM", {
    locale: ptBR,
  });

  const capitalizedDate = formattedDate
    .split(" ")
    .map((word) => {
      if (word === "de") return word;
      return word
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("-");
    })
    .join(" ");
  return (
    <div className="p-5">
      <h1 className="text-xl font-bold py-1">
        {session?.user ? `Olá, ${session.user.name}!` : "Olá, Faça seu Login!"}
      </h1>
      <h2 className="text-sm mt-0.5">{capitalizedDate}</h2>
    </div>
  );
}
