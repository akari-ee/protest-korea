/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useProtestForm } from "@/lib/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import ProtestDatePicker from "./protest-date-picker";
import { Button } from "../ui/button";
import ProtestLocation from "./protest-location";
import { Database } from "@/types/database.types";

interface ProtestSubmitFormProps {
  data?: Database["public"]["Tables"]["protest"]["Row"];
  isEdit?: boolean;
}

export default function ProtestSubmitForm({
  data,
  isEdit = false,
}: ProtestSubmitFormProps) {
  const { form, onSubmit } = useProtestForm({ data, isEdit });
  const [isLogined, setIsLogined] = React.useState(false);

  useEffect(() => {
    setIsLogined(localStorage.getItem("user_id") ? true : false);
  }, []);

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex justify-between items-start gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="basis-1/2">
                  <FormLabel>
                    집회명 <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="집회명" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organizer"
              render={({ field }) => (
                <FormItem className="basis-1/2">
                  <FormLabel>
                    주최자 <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="주최자" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">
                    주최자명이 없다면 일반인으로 작성해 주세요.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  집회 설명
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="집회 설명을 입력해 주세요."
                    className="min-h-52"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="poster_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>집회 포스터</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    multiple={false}
                    accept="image/jpg, image/jpeg, image/png, image/webp"
                    {...{ ...field, value: undefined }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      console.log(file);
                      field.onChange(file);
                    }}
                  />
                </FormControl>
                <FormDescription className="text-xs flex flex-col">
                  <span>jpg, jpeg, png, webp 형식만 허용됩니다.</span>
                  <span>파일 크기는 3MB를 넘을 수 없습니다.</span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <ProtestLocation control={form.control} onSetValue={form.setValue} />
          <div className="flex flex-col gap-6 sm:flex-row">
            <ProtestDatePicker
              control={form.control}
              label="집회 시작일"
              type="start"
            />
            <ProtestDatePicker
              control={form.control}
              label="집회 종료일"
              type="end"
            />
          </div>
          <footer className="sticky bottom-0 bg-background py-4">
            <Button
              type="submit"
              className="w-full drop-shadow-md"
              disabled={!isLogined}
            >
              {isLogined
                ? isEdit
                  ? "수정하기"
                  : "등록하기"
                : "로그인 후 이용 가능합니다."}
            </Button>
          </footer>
        </form>
      </Form>
    </section>
  );
}
