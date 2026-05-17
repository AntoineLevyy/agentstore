"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

const tabs = [
  { name: "Apps", href: "/discover" },
  { name: "Categories", href: "/#categories" },
  { name: "Submit app", href: "/submit" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#fbfaf7]/88 backdrop-blur-xl">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="https://res.cloudinary.com/djklousbo/image/upload/v1775356040/logo_agentstore.png_fmokea.jpg"
              alt="App Store"
              className="h-9 w-9 rounded-[11px] object-cover shadow-sm"
            />
            <div className="leading-tight">
              <span className="block text-[15px] font-[720] tracking-[-0.02em] text-[#171411]">App Store</span>
              <span className="hidden text-[11px] font-[520] text-[#7b7369] sm:block">AI apps for real jobs</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {tabs.map((tab) => {
              const isActive = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={`rounded-full px-4 py-2 text-[13px] font-[620] transition ${
                    isActive
                      ? "bg-[#171411] text-white shadow-sm"
                      : "text-[#6e665d] hover:bg-[#f0ece5] hover:text-[#171411]"
                  }`}
                >
                  {tab.name}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/discover"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[13px] font-[650] text-[#171411] shadow-sm ring-1 ring-black/[0.08] transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Search className="h-4 w-4 text-[#ff6b35]" />
            Find an app
          </Link>
        </div>
      </div>
    </header>
  );
}
