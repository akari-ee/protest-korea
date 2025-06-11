/* eslint-disable @typescript-eslint/no-unused-vars */
import { Database } from "@/types/database.types";
import React from "react";
import { Badge } from "../ui/badge";
import { formatDdayLabel, formatKoreanDateTime } from "@/lib/time";
import ProtestMap from "./protest-map";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";

interface ProtestDetailProps {
  data: Database["public"]["Tables"]["protest"]["Row"];
}

export default function ProtestDetail({
  data: {
    id,
    title,
    description,
    poster_image,
    location,
    detail_location,
    start_time,
    end_time,
    organizer,
    created_at,
    updated_at,
  },
}: ProtestDetailProps) {
  return (
    <section className="px-2">
      <header className="flex flex-col gap-4 border-b pb-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Badge className="rounded-full border border-[#F67280] text-sm">
              {formatDdayLabel(start_time)}
            </Badge>
            <div className="text-gray-700">
              주최: {organizer ?? "명시 안됨"}
            </div>
          </div>
          <h1 className="font-black text-3xl">{title}</h1>
        </div>
        <aside className="text-sm text-gray-500 text-right">
          <p>
            <span>등록일: </span>
            <span>{formatKoreanDateTime(created_at)}</span>
          </p>
          <p>
            <span>수정일: </span>
            <span>{formatKoreanDateTime(updated_at)}</span>
          </p>
        </aside>
      </header>
      <article className="py-6 space-y-4">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-lg">상세 내용</h2>
          {poster_image && (
            <div className="relative w-full sm:w-3/7 h-[600px] mb-4 overflow-hidden rounded-lg">
              <Image
                src={poster_image || ""}
                width={100}
                height={100}
                alt={title}
                className="w-full h-full bg-contain"
              />
            </div>
          )}
          <div className="font-medium">{description}</div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-lg">일시</h2>
          <div className="font-medium">
            {formatKoreanDateTime(start_time)} ~{" "}
            {formatKoreanDateTime(end_time)}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="flex flex-col gap-1">
            <div className="flex items-center">
              <div className="font-bold flex items-center">
                <span className="text-lg shrink-0">위치</span>
                <ChevronRightIcon className="size-4" />
              </div>
              <div className="font-light text-sm">
                {detail_location + " (" + location + ")"}
              </div>
            </div>
            <div className="text-xs text-gray-500">
              마커가 부정확하게 표시될 수 있습니다. 상단 주소를 꼭 확인해
              주세요.
            </div>
          </h2>
          <ProtestMap location={location} />
        </div>
      </article>
    </section>
  );
}
