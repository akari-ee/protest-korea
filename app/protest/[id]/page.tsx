import ProtestDetail from "@/components/protest/protest-detail";
import ProtestDetailNav from "@/components/protest/protest-detail-nav";
import { supabase } from "@/config/client";
import { Database } from "@/types/database.types";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("protest")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    redirect("/not-found");
  }

  const protest = data as Database["public"]["Tables"]["protest"]["Row"];

  return (
    <main className="grow py-6 container max-w-sm sm:max-w-5xl mx-auto flex flex-col gap-4">
      <ProtestDetailNav />
      {protest ? (
        <ProtestDetail data={protest} />
      ) : (
        <section className="flex flex-col items-center justify-center grow text-gray-700 font-medium">
          오류가 발생했어요.
        </section>
      )}
    </main>
  );
}
