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
            이 사이트는 커뮤니티에 올라온 공개 집회 정보를 수동으로 정리한
            것입니다.
          </p>
          <p>
            정보의 정확성 및 집회의 합법성은 보장하지 않으며, 문제가 있는 내용은
            giggles_passing_0b@icloud.com 으로 신고해 주세요.
          </p>
          <p>
            개인정보 보호를 위해 게시물에서 수집된 개인 정보는 저장하지 않으며,
            노출되지 않도록 주의하고 있습니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
