import ProtestItem from "@/components/protest/protest-item";
import { supabase } from "@/config/client";
import { Database } from "@/types/database.types";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "집회, 시위 일정 확인하기",
  description: "집회, 시위 일정을 한눈에 확인할 수 있습니다.",
  openGraph: {
    title: "집회, 시위 일정 확인하기",
    description: "집회, 시위 일정을 한눈에 확인할 수 있습니다.",
    siteName: "집회, 시위 일정 확인하기",
    locale: "ko_KR",
    type: "website",
    url: "https://protest-korea.vercel.app",
  },
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: protests, error } = await supabase
    .from("protest")
    .select("*")
    .eq("is_approved", true)
    .order("start_time", { ascending: true })
    .overrideTypes<Database["public"]["Tables"]["protest"]["Row"][]>();

  if (error) {
    redirect("/not-found");
  }

  return (
    <main className="grow py-6 container max-w-sm px-4 sm:max-w-5xl mx-auto">
      <header className="rounded-md bg-gray-100 p-6 mb-4 font-medium text-sm border">
        <span>
          Protest Korea는 특정 정치적 세력과 전혀 연관이 없으며, 여러 곳에
          퍼져있는 정보를 간편하게 모아보기 위해 제작되었습니다.{" "}
        </span>
        <span className="sm:block">
          모든 집회 정보는 사용자들의 자발적인 등록으로 이루어집니다.
        </span>
      </header>
      <section>
        {(!protests || protests.length === 0) && <div>데이터가 없습니다.</div>}
        {protests && protests.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {protests.map((protest) => (
              <ProtestItem key={protest.id} data={protest} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
