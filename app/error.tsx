"use client";

import { useEffect } from "react";
import { Button } from "@/app/_components/ui/button";
import { AlertTriangleIcon, HomeIcon, RefreshCwIcon } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Erro capturado pela página de erro:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-5 text-center flex-1">
      <div className="bg-destructive/10 p-4 rounded-full text-destructive mb-6 animate-pulse">
        <AlertTriangleIcon size={48} />
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        Ops, algo deu errado!
      </h1>
      <p className="text-muted-foreground mt-2 max-w-md">
        Ocorreu um erro ao processar a página. Por favor, tente novamente ou
        volte para a página inicial.
      </p>

      {error.digest && (
        <div className="mt-4 px-3 py-1.5 bg-muted/50 rounded-lg text-xs font-mono text-muted-foreground select-all border border-border/40">
          ID do Erro: {error.digest}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full max-w-xs justify-center">
        <Button
          onClick={() => reset()}
          variant="default"
          className="gap-2 w-full flex items-center justify-center"
        >
          <RefreshCwIcon className="h-4 w-4" />
          Tentar novamente
        </Button>
        <Button
          variant="outline"
          className="gap-2 w-full flex items-center justify-center"
          render={<Link href="/" />}
          nativeButton={false}
        >
          <HomeIcon className="h-4 w-4" />
          Voltar ao Início
        </Button>
      </div>
    </div>
  );
}
