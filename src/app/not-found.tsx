import React from "react";
import Link from "next/link";
import "./globals.css";

export default function RootNotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white font-sans p-6">
        <div className="max-w-md w-full text-center space-y-8 bg-slate-900 border border-white/10 p-8 sm:p-12 rounded-3xl shadow-2xl backdrop-blur-xl">
          <div className="space-y-3">
            <span className="text-7xl sm:text-8xl font-black text-amber-400 tracking-tight font-mono">
              404
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              الصفحة غير موجودة
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              عذراً، الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Link
              href="/ar"
              className="w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-lg transition-all text-center"
            >
              الرئيسية (العربية)
            </Link>
            
            <div className="flex items-center justify-center gap-4 pt-2 text-xs font-semibold text-slate-400">
              <Link href="/en" className="hover:text-amber-400 transition-colors">
                Home (English)
              </Link>
              <span>•</span>
              <Link href="/ckb" className="hover:text-amber-400 transition-colors">
                سەرەکی (کوردی)
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
