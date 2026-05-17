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
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cmd+K shortcut
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
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/[0.06]">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="flex-shrink-0">
                <rect width="28" height="28" rx="8" fill="url(#logo-grad)" />
                <path d="M8 14h12M14 8v12M10 10l8 8M18 10l-8 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
                <defs>
                  <linearGradient id="logo-grad" x1="0" y1="0" x2="28" y2="28">
                    <stop stopColor="#6366f1" />
                    <stop offset="1" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="font-semibold text-[15px] text-gray-900 tracking-[-0.01em]">Agentstore</span>
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
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {tab.name}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 h-9 px-3.5 rounded-lg border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 transition-all"
              >
                <Search className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[13px] text-gray-400 hidden sm:inline">Search...</span>
                <kbd className="hidden sm:inline text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded font-mono ml-2">
                  {"\u2318"}K
                </kbd>
              </button>
              <Link
                href="/submit"
                className="hidden sm:flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors text-[13px] font-medium"
              >
                <Plus className="w-3.5 h-3.5" /> Submit
              </Link>
              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-3 animate-fade-in-up">
              {tabs.map((tab) => {
                const isActive = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
                return (
                  <Link
                    key={tab.name}
                    href={tab.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2.5 rounded-lg text-[15px] font-medium transition-all ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {tab.name}
                  </Link>
                );
              })}
              <Link
                href="/submit"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-[15px] font-medium text-gray-700 hover:bg-gray-50"
              >
                Submit an app
              </Link>
            </div>
          )}
        </div>
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
