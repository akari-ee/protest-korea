import ProtestSubmitForm from "@/components/protest/protest-submit-form";
import React from "react";

export default function ProtestAdd() {
  return (
    <main className="grow py-6 container max-w-sm px-4 sm:max-w-3xl mx-auto">
      <header className="flex flex-col gap-2 mb-6 border-b pb-4">
        <h1 className="font-black text-2xl">집회 등록 양식</h1>
        <h2 className="text-gray-500 text-sm">
          집회에 대한 내용을 작성해 제출해주세요. 요청한 집회는 관리자에 의해
          확인 후 추가됩니다.
        </h2>
      </header>
      <ProtestSubmitForm />
    </main>
  );
}
