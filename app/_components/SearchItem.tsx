"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";

export default function SearchItem() {
  return (
    <div className="flex gap-2 px-5 mt-3">
      <Input placeholder="Buscar Barbearias" className="w-full" />
      <Button>
        <SearchIcon />
      </Button>
    </div>
  );
}
