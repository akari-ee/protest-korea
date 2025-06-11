import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Nav() {
  return (
    <header className="sticky top-16 p-4 border-b bg-background z-50 sm:top-10.5">
      <nav className="flex justify-between items-center container max-w-sm sm:max-w-5xl mx-auto">
        <h1 className="font-bold text-2xl">
          <Link href="/">Protest-Korea</Link>
        </h1>
        <aside>
          <Button asChild variant={"ghost"} size={"sm"}>
            <Link href={"/protest/add"}>집회 등록</Link>
          </Button>
        </aside>
      </nav>
    </header>
  );
}
