import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { HomeIcon, MenuIcon, CalendarIcon, LogOutIcon } from "lucide-react";
import MenuBottons from "./MenuBottons";
import { Avatar } from "./ui/avatar";
import Image from "next/image";
import Link from "next/link";

export default function Menu() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="secondary" size="icon">
            <MenuIcon />
          </Button>
        }
      />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <div className="flex items-center gap-2 pt-5">
            <Avatar className="h-14 w-14 ring-2 ring-primary">
              <Image
                src="/joaoBlack.jpeg"
                alt="João Vitor"
                width={56}
                height={56}
                className="rounded-full object-cover"
              />
            </Avatar>
            <div className="flex flex-col">
              <p className="font-bold text-lg">João Vitor</p>
              <p className="font-light">teste@gmail.com</p>
            </div>
          </div>
        </SheetHeader>
        <div className="p-5 flex flex-col gap-2 border-b border-t border-[chart-5]">
          <Button
            variant="default"
            className="w-full justify-start gap-2"
            nativeButton={false}
            render={
              <Link href="/" className="flex items-center gap-2">
                <HomeIcon />
                Início
              </Link>
            }
          />
          <Button variant="ghost" className="w-full justify-start gap-2">
            <CalendarIcon />
            Agendamentos
          </Button>
        </div>
        <MenuBottons />
        <div className="p-5">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <LogOutIcon />
            Sair da conta
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
