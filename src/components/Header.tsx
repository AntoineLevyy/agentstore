"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

const tabs = [
  { name: "Home", href: "/" },
  { name: "Discover", href: "/discover" },
  { name: "MCP", href: "/mcp" },
  { name: "Developers", href: "/developers" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[#1c1c1e]/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="https://res.cloudinary.com/djklousbo/image/upload/v1775356040/logo_agentstore.png_fmokea.jpg"
              alt="Agent Store"
              className="h-8 w-auto rounded-lg"
            />
            <span className="font-semibold text-lg text-white">Agent Store</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => {
              const isActive = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#0A84FF] text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {tab.name}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/search"
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/15 transition-colors"
          >
            <Search className="w-4 h-4 text-gray-400" />
          </Link>
        </div>
      </div>
    </header>
  );
}
