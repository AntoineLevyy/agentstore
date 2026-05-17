"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Sparkles } from "lucide-react";

const tabs = [
  { name: "Discover", href: "/discover" },
  { name: "Categories", href: "/categories" },
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
            <span className="font-semibold text-[15px] text-gray-900">Consumer AI</span>
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

          <Link
            href="/discover"
            className="flex items-center gap-2 h-9 px-3.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Search className="w-4 h-4 text-gray-500" />
            <span className="text-[13px] text-gray-500 hidden sm:inline">Search apps...</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
