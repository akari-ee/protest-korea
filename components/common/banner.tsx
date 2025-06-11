import React from "react";

export default function Banner() {
  return (
    <div className="dark bg-muted text-foreground px-4 py-3 sticky top-0 z-50">
      <p className="flex justify-center text-sm">
        <span className="group flex flex-col sm:flex-row items-center sm:gap-1">
          <span>
            ✨ 오른쪽 상단 집회 등록 버튼으로 집회를 등록할 수 있습니다.{" "}
          </span>
          <span>공유하고 싶은 집회가 있다면, 많은 등록 부탁드립니다.</span>
        </span>
      </p>
    </div>
  );
}
