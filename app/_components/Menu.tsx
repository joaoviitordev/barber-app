import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import {
  HomeIcon,
  MenuIcon,
  CalendarIcon,
  LogOutIcon,
  LogInIcon,
} from "lucide-react";
import MenuBottons from "./MenuBottons";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

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
          <Dialog>
            <div className="flex justify-between items-center pt-5">
              <h2 className="text-lg font-semibold">Olá, faça seu login!</h2>
              <DialogTrigger>
                <Button variant="default">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
            </div>
            <DialogContent className="w-[90%] flex justify-center items-center">
              <DialogHeader className="gap-4">
                <DialogTitle className="text-center text-xl">
                  Faça login na plataforma
                </DialogTitle>
                <DialogDescription className="text-center">
                  Conecte-se usando sua conta do Google
                </DialogDescription>
                <DialogTrigger>
                  <Button variant="outline" className="w-full">
                    <Image
                      src="Google.svg"
                      alt="Google"
                      width={16}
                      height={16}
                      className="rounded-full"
                    />
                    Google
                  </Button>
                </DialogTrigger>
              </DialogHeader>
            </DialogContent>
          </Dialog>
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
