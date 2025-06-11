"use client";

import React from "react";
import { Button } from "../ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProtestDetailNav() {
  const router = useRouter();

  return (
    <header>
      <Button variant={"ghost"} size={"icon"} onClick={() => router.back()}>
        <ChevronLeftIcon className="size-6" />
      </Button>
    </header>
  );
}
