"use client";

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
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "./ui/avatar";

export default function Menu() {
  const { data: session } = useSession();

  const handleLoginWithGoogle = async () => {
    await signIn("google");
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

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
          {session ? (
            <div className="flex items-center gap-2 pt-5">
              <Avatar className="h-14 w-14 ring-2 ring-primary">
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "Avatar"}
                    width={56}
                    height={56}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <AvatarFallback className="rounded-full bg-muted flex items-center justify-center font-bold text-lg">
                    {session.user?.name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex flex-col">
                <p className="font-bold text-lg">{session.user?.name}</p>
                <p className="font-light text-sm text-muted-foreground">
                  {session.user?.email}
                </p>
              </div>
            </div>
          ) : (
            <Dialog>
              <div className="flex justify-between items-center pt-5">
                <h2 className="text-lg font-semibold">Olá, faça seu login!</h2>
                <DialogTrigger
                  render={
                    <Button variant="default">
                      <LogInIcon />
                    </Button>
                  }
                />
              </div>
              <DialogContent className="w-[90%] flex justify-center items-center">
                <DialogHeader className="gap-4">
                  <DialogTitle className="text-center text-xl">
                    Faça login na plataforma
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Conecte-se usando sua conta do Google
                  </DialogDescription>
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={handleLoginWithGoogle}
                  >
                    <Image
                      src="Google.svg"
                      alt="Google"
                      width={16}
                      height={16}
                      className="rounded-full"
                    />
                    Google
                  </Button>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
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
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            nativeButton={false}
            render={
              <Link href="/bookings" className="flex items-center gap-2" />
            }
          >
            <CalendarIcon />
            Agendamentos
          </Button>
        </div>
        <MenuBottons />
        <div className="p-5">
          {session ? (
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={handleLogout}
            >
              <LogOutIcon />
              Sair da conta
            </Button>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}
