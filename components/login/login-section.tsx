"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/config/client";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function LoginSection() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: undefined, // 이메일 확인 리디렉션 비활성화
      },
    });

    console.log(data);

    if (error) {
      toast.error("가입 중 오류가 발생했습니다.", {
        description: error.message,
      });
    } else {
      toast.success("가입이 완료되었습니다.", {
        description: "이어서 로그인을 진행해 주세요.",
      });
    }
  };

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("로그인 중 오류가 발생했습니다.", {
        description: error.message,
      });
    } else {
      localStorage.setItem("user_id", data.user.id);
      toast.success("로그인이 완료되었습니다.");
      window.location.reload();
      redirect("/");
    }
  };
  return (
    <section className="flex flex-col items-center justify-center grow gap-4">
      <div className="max-w-sm">
        <header className="text-sm font-medium mb-4">
          <p>아무 이메일이나 입력해도 가입이 가능합니다.</p>
          <p>
            가입한 적이 없다면, 아래 양식을 채운 후 회원가입을 진행해 주세요.
          </p>
          <p>회원가입 후에 집회 등록이 가능합니다.</p>
        </header>
        <div className="flex flex-col gap-4">
          <div className="*:not-first:mt-2">
            <Label htmlFor={"email"}>이메일</Label>
            <Input
              id={"email"}
              placeholder="이메일"
              type="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="*:not-first:mt-2">
            <Label htmlFor={"password"}>비밀번호</Label>
            <Input
              id={"password"}
              placeholder="비밀번호"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <p className="text-gray-500 text-xs">
              비밀번호는 6자 이상이어야 합니다.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={"secondary"}
              className="border"
              onClick={handleSignup}
            >
              회원가입
            </Button>
            <Button onClick={handleLogin}>로그인</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
