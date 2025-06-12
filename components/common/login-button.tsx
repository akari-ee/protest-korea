"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function LoginButton() {
  const [isLogined, setIsLogined] = React.useState(false);

  useEffect(() => {
    setIsLogined(localStorage.getItem("user_id") ? true : false);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("user_id");
    window.location.reload();
  };

  return (
    <>
      {isLogined ? (
        <Button variant={"ghost"} onClick={handleLogout}>
          로그아웃
        </Button>
      ) : (
        <Button asChild variant={"ghost"}>
          <Link href={"/login"}>로그인</Link>
        </Button>
      )}
    </>
  );
}
