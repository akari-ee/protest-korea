/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControlType, FormSchemaType } from "@/lib/form";
import React from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { UseFormSetValue } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface ProtestLocationProps {
  control: FormControlType;
  onSetValue: UseFormSetValue<FormSchemaType>;
}

const DAUM_POSTCODE_SCRIPT_URL =
  "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

export default function ProtestLocation({
  control,
  onSetValue,
}: ProtestLocationProps) {
  const open = useDaumPostcodePopup(DAUM_POSTCODE_SCRIPT_URL);
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    onSetValue("location.base", fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div className="space-y-2">
      <FormLabel>
        위치<span className="text-destructive">*</span>
      </FormLabel>
      <div className="flex flex-col gap-2">
        <FormField
          control={control}
          name="location.base"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div onClick={handleClick}>
                  <Input placeholder="주소 찾기" {...field} readOnly />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="location.detail"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="상세 주소 입력 (e.g. 신촌역 7번 출구)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
