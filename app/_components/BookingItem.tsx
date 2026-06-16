import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

// To-Do => receber agendamento como prop

export default function BookingItem() {
  return (
    <div className="px-5 mt-2">
      <h2 className="uppercase text-gray-500 text-sm py-4">Agendamentos</h2>
      <Card className="p-0 flex flex-row gap-2">
        <CardContent className="flex flex-col gap-2 w-full py-4">
          <Badge variant="default">Confirmado</Badge>
          <h3 className="font-semibold text-lg">Corte de Cabelo</h3>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://utfs.io/f/6b0888f8-b69f-4be7-a13b-52d1c0c9cab2-17m.png" />
            </Avatar>
            <p className="text-base">Vintage Barber</p>
          </div>
        </CardContent>
        <CardContent className="flex flex-col text-center items-center justify-center w-[100px] border-l border-[chart-5]">
          <p className="text-sm">Junho</p>
          <h3 className="text-3xl font-bold">12</h3>
          <p className="text-base">09:30</p>
        </CardContent>
      </Card>
    </div>
  );
}
