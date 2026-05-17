"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Sparkles, Plus } from "lucide-react";

const tabs = [
  { name: "Discover", href: "/discover" },
  { name: "Categories", href: "/categories" },
  { name: "Submit", href: "/submit" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-[15px] text-gray-900">every</span>
              <span className="font-bold text-[15px] bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">ai app</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => {
              const isActive = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={`px-3.5 py-2 rounded-lg text-[14px] font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {tab.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/discover"
              className="flex items-center gap-2 h-9 px-3.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Search className="w-4 h-4 text-gray-500" />
              <span className="text-[13px] text-gray-500 hidden sm:inline">Search apps...</span>
            </Link>
            <Link
              href="/submit"
              className="hidden sm:flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors text-[13px] font-medium"
            >
              <Plus className="w-3.5 h-3.5" /> Add app
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
