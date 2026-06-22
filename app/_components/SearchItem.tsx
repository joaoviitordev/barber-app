"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function SearchItem() {
  const router = useRouter();

  const formSchema = z.object({
    search: z.string().trim().min(1, "Digite algo para buscar"),
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/barbershops?search=${data.search}`);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  return (
    <form
      className="flex gap-2 px-5 mt-3"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <Controller
        control={form.control}
        name="search"
        render={({ field }) => (
          <Input
            placeholder="Buscar Barbearias"
            className="w-full"
            {...field}
          />
        )}
      />
      <Button type="submit">
        <SearchIcon />
      </Button>
    </form>
  );
}
