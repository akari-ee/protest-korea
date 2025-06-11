import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t mt-4 py-6 px-4 text-sm text-gray-500">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>
          &copy; {new Date().getFullYear()} Protest Watch. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
