"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, Plus, Menu, X } from "lucide-react";
import { SearchModal } from "./SearchModal";

const tabs = [
  { name: "Discover", href: "/discover" },
  { name: "Categories", href: "/categories" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 glass border-b border-white/20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-center justify-between h-[60px]">
            <Link href="/" className="flex items-center gap-2.5">
              <svg width="26" height="26" viewBox="0 0 28 28" fill="none" className="flex-shrink-0">
                <rect width="28" height="28" rx="8" fill="url(#logo-grad)" />
                <path d="M8 14h12M14 8v12M10 10l8 8M18 10l-8 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
                <defs>
                  <linearGradient id="logo-grad" x1="0" y1="0" x2="28" y2="28">
                    <stop stopColor="#6366f1" />
                    <stop offset="1" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="font-bold text-[15px] text-gray-900 tracking-[-0.02em]">Agentstore</span>
            </Link>

            <nav className="hidden md:flex items-center gap-0.5">
              {tabs.map((tab) => {
                const isActive = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
                return (
                  <Link
                    key={tab.name}
                    href={tab.href}
                    className={`px-4 py-2 rounded-xl text-[14px] font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gray-900/5 text-gray-900"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-900/[0.03]"
                    }`}
                  >
                    {tab.name}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2.5 h-9 pl-3.5 pr-3 rounded-xl border border-gray-200/80 bg-white/50 hover:bg-white hover:border-gray-300 transition-all duration-200 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[13px] text-gray-400 hidden sm:inline">Search...</span>
                <kbd className="hidden sm:inline text-[10px] font-semibold text-gray-300 bg-gray-100 px-1.5 py-0.5 rounded-md border border-gray-200">
                  &#8984;K
                </kbd>
              </button>
              <Link
                href="/submit"
                className="hidden sm:flex items-center gap-1.5 h-9 px-4 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-all duration-200 text-[13px] font-semibold"
              >
                <Plus className="w-3.5 h-3.5" /> Submit
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                {mobileOpen ? <X className="w-4 h-4 text-gray-600" /> : <Menu className="w-4 h-4 text-gray-600" />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-xl animate-fade-in">
            <div className="px-5 py-3 space-y-1">
              {tabs.map((tab) => (
                <Link
                  key={tab.name}
                  href={tab.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-[15px] font-medium text-gray-700 hover:bg-gray-50"
                >
                  {tab.name}
                </Link>
              ))}
              <Link
                href="/submit"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-[15px] font-medium text-indigo-600"
              >
                Submit an app
              </Link>
            </div>
          </div>
        )}
      </header>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
