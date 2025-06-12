import ProtestSubmitForm from "@/components/protest/protest-submit-form";
import { supabase } from "@/config/client";
import { Database } from "@/types/database.types";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditPage({ params }: Props) {
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
    <main className="grow py-6 container max-w-sm px-4 sm:max-w-3xl mx-auto">
      <header className="flex flex-col gap-2 mb-6 border-b pb-4">
        <h1 className="font-black text-2xl">집회 등록 양식</h1>
        <h2 className="text-gray-500 text-sm">
          집회에 대한 내용을 작성해 제출해주세요. 요청한 집회는 관리자에 의해
          확인 후 추가됩니다.
        </h2>
      </header>
      <ProtestSubmitForm data={protest} isEdit={true} />
    </main>
  );
}
