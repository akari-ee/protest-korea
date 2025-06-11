import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t mt-4 py-6 px-4 text-sm text-gray-500">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mx-4">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          {"Protest-Korea. All rights reserved."}
        </p>
        <div className="text-xs">
          <p>
            본 사이트는 집회 정보 제공 목적으로 개발된 사이트이며, 특정 정치적
            세력과 전혀 연관이 없습니다.
          </p>
          <p>
            다양한 사이트에 퍼져있어 찾기 어려운 집회 정보를 한 곳에 모아보는
            목적으로 제작되었습니다.
          </p>
          <p>
            만약, 정보가 틀리거나 문제가 있는 내용은
            <Link
              href={"mailto:giggles_passing_0b@icloud.com"}
              className="pl-1 underline"
            >
              giggles_passing_0b@icloud.com
            </Link>
            으로 링크와 함께 제보해 주세요.
          </p>
          <p>
            본 사이트는 어떠한 개인정보도 수집하지 않고 있으며, 가입없이 누구나 이용
            가능합니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
