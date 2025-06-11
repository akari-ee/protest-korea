/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Database } from "@/types/database.types";
import { formatDdayLabel, formatKoreanDateTime } from "@/lib/time";
import Link from "next/link";
import { ChevronDownIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import Image from "next/image";

interface ProtestItemProps {
  data: Database["public"]["Tables"]["protest"]["Row"];
}

export default function ProtestItem({
  data: {
    id,
    title,
    description,
    location,
    start_time,
    end_time,
    organizer,
    poster_image,
    created_at,
    updated_at,
  },
}: ProtestItemProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <Badge className="rounded-full border border-[#F67280]">
          {formatDdayLabel(start_time)}
        </Badge>
        <CardTitle className="font-bold text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-sm flex flex-col gap-1.5">
        <div className="relative h-[400px] sm:h-[500px] mb-4 overflow-hidden rounded-lg">
          {poster_image ? (
            <Image
              src={poster_image}
              width={100}
              height={100}
              quality={100}
              alt={title + " 포스터"}
              className="w-full h-full bg-cover"
            />
          ) : (
            <div className="flex justify-center items-center bg-stone-200 w-full h-full text-xl font-black text-stone-400">
              포스터 없음
            </div>
          )}
        </div>
        <div>
          <span className="font-bold">일시: </span>
          <span>
            {formatKoreanDateTime(start_time)} ~{" "}
            {formatKoreanDateTime(end_time)}
          </span>
        </div>
        <div>
          <span className="font-bold">위치: </span>
          <span>{location}</span>
        </div>
        <div>
          <span className="font-bold">주최자: </span>
          <span>{organizer ?? "명시 안됨"}</span>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          asChild
          size={"sm"}
          className="w-full"
        >
          <Link href={`/protest/${id}`}>
            자세히 보기
            <ChevronDownIcon />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
