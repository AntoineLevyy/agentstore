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
    <header className="sticky top-0 z-50 bg-[#08090a]/80 backdrop-blur-xl border-b border-[rgba(255,255,255,0.05)]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="flex items-center justify-between h-12">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="https://res.cloudinary.com/djklousbo/image/upload/v1775356040/logo_agentstore.png_fmokea.jpg"
              alt="Agent Store"
              className="h-7 w-auto rounded-[4px]"
            />
            <span className="font-medium text-[14px] text-[#f7f8f8] tracking-[-0.01em]">Agent Store</span>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            {tabs.map((tab) => {
              const isActive = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={`px-3 py-1.5 rounded-[5px] text-[13px] font-[510] transition-all duration-[0.16s] ${
                    isActive
                      ? "bg-[rgba(255,255,255,0.05)] text-[#f7f8f8]"
                      : "text-[#8a8f98] hover:text-[#d0d6e0] hover:bg-[rgba(255,255,255,0.03)]"
                  }`}
                >
                  {tab.name}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/search"
            className="w-8 h-8 rounded-[6px] bg-[rgba(255,255,255,0.03)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.05)] transition-all duration-[0.16s]"
          >
            <Search className="w-3.5 h-3.5 text-[#8a8f98]" />
          </Link>
        </div>
      </div>
    </header>
  );
}
