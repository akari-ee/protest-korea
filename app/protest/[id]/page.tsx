import ProtestDetail from "@/components/protest/protest-detail";
import ProtestDetailNav from "@/components/protest/protest-detail-nav";
import { supabase } from "@/config/client";
import { Database } from "@/types/database.types";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const { data, error } = await supabase
    .from("protest")
    .select("*")
    .eq("id", id)
    .single();

  const protest = data as Database["public"]["Tables"]["protest"]["Row"];

  if (error) {
    return {
      title: "집회, 시위 일정 확인하기",
      description: "집회, 시위 일정을 한눈에 확인할 수 있습니다.",
      openGraph: {
        title: "집회, 시위 일정 확인하기",
        description: "집회, 시위 일정을 한눈에 확인할 수 있습니다.",
        siteName: "집회, 시위 일정 확인하기",
        locale: "ko_KR",
        type: "website",
        url: "",
      },
    };
  }

  return {
    title: protest.title,
    description: protest.description,
    openGraph: {
      title: protest.title,
      description: protest.description,
      siteName: "집회, 시위 일정 확인하기",
      locale: "ko_KR",
      type: "website",
      images: protest.poster_image || undefined,
      url: `https://protest-korea.vercel.app/protest/${protest.id}`,
    },
    twitter: {
      title: protest.title,
      description: protest.description,
      images: protest.poster_image || undefined,
    },
  };
}

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
