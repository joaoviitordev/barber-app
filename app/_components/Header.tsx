import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import Menu from "./Menu";

export default function Header() {
  return (
    <Card className="rounded-none">
      <CardContent className="flex flex-row items-center justify-between">
        <Image
          src="/Logo.svg"
          alt="Logo da barbearia"
          width={120}
          height={120}
        />
        <Menu />
      </CardContent>
    </Card>
  );
}
