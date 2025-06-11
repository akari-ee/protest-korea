import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <main className="grow py-6 container max-w-sm px-4 sm:max-w-5xl mx-auto flex flex-col items-center justify-center gap-4">
      <div className="font-medium text-lg">오류가 발생했어요.</div>
      <Button asChild size={"sm"}>
        <Link href="/">홈으로 이동</Link>
      </Button>
    </main>
  );
}
