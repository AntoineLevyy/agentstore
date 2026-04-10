"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { searchAgents } from "@/lib/data";
import { Agent } from "@/lib/types";
import Link from "next/link";
import { AgentIcon } from "./AgentIcon";

export function SearchBar({ autoFocus = false }: { autoFocus?: boolean }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Agent[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      const found = searchAgents(query);
      setResults(found.slice(0, 6));
      setIsOpen(found.length > 0);
    }, 300);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [query]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8a8f98]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => results.length > 0 && setIsOpen(true)}
            placeholder="Search agents, tools, capabilities..."
            className="w-full h-12 pl-12 pr-12 bg-[#0f1011] rounded-2xl text-[15px] text-white placeholder:text-[#8a8f98] outline-none focus:ring-2 focus:ring-[#5e6ad2]/30 transition-shadow"
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(""); setIsOpen(false); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#62666d] flex items-center justify-center hover:bg-[#8a8f98] transition-colors"
            >
              <X className="w-3 h-3 text-white" />
            </button>
          )}
        </div>
      </form>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#101112] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] overflow-hidden z-50 border border-[rgba(255,255,255,0.08)]">
          {results.map((agent) => (
            <Link
              key={agent.id}
              href={`/agent/${agent.slug}`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
            >
              <AgentIcon name={agent.name} websiteUrl={agent.website_url} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[14px] text-white truncate">{agent.name}</p>
                <p className="text-[12px] text-[#8a8f98] truncate">{agent.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
