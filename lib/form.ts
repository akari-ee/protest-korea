/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { supabase } from "@/config/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { Control, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod/v4";
import { TZDate } from "@date-fns/tz";

const formSchema = z.object({
  title: z.string().min(1, { message: "집회명을 작성해 주세요." }),
  description: z.string().min(1, { message: "집회 설명을 작성해 주세요." }),
  organizer: z.string().min(1, { message: "주최자를 작성해 주세요." }),
  location: z.object({
    base: z.string().min(1, { message: "주소를 설정해 주세요." }),
    detail: z.string().min(1, { message: "상세주소를 입력해 주세요." }),
  }),
  start_time: z.date({ error: "시작일을 설정해 주세요." }),
  end_time: z.date().optional(),
  poster_image: z
    .file()
    .optional()
    .refine(
      (file) => {
        if (!file) return true; // 파일이 없으면 통과
        return file.size <= 5 * 1024 * 1024; // 5MB
      },
      {
        message: "파일 크기는 5MB 이하여야 합니다.",
      }
    )
    .refine(
      (file) => {
        if (!file) return true; // 파일이 없으면 통과
        return ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type
        );
      },
      {
        message: "지원되는 파일 형식: JPG, JPEG, PNG, WEBP",
      }
    ),
});

export type FormSchemaType = z.infer<typeof formSchema>;
export type FormControlType = Control<z.infer<typeof formSchema>, any>;

export const useProtestForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      organizer: "",
      location: {
        base: "",
        detail: "",
      },
      poster_image: undefined,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const {
      title,
      description,
      organizer,
      location: { base, detail },
      start_time,
      end_time,
      poster_image,
    } = values;

    const formData = new FormData();
    formData.append("file", poster_image as File);

    try {
      if (poster_image) {
        await fetch("/api/r2", {
          method: "POST",
          body: formData,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("이미지 업로드에 실패했습니다.", {
        description: "잠시 후 다시 시도해 주세요.",
      });
    }

    const startTime = new TZDate(start_time);
    const endTime = end_time ? new TZDate(end_time) : null;

    const { error } = await supabase.from("protest").insert({
      title,
      description,
      organizer,
      location: base,
      detail_location: detail,
      start_time: startTime,
      end_time: endTime,
      poster_image: poster_image
        ? `https://pub-1b6611ed726848ab9429e4d885b9bd05.r2.dev/${poster_image.name}`
        : null,
    });

    if (error) {
      console.error(error);
      toast.error("등록에 실패했습니다.", {
        description: "잠시 후 다시 시도해 주세요.",
      });
    } else {
      // 에러가 없으면 성공으로 처리
      toast.success("등록을 요청했습니다.", {
        description: "관리자 승인 후 등록됩니다.",
      });
      form.reset();
      redirect("/");
    }

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return { form, onSubmit };
};
