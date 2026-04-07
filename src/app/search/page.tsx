"use client";

import { useSearchParams } from "next/navigation";
import { searchAgents } from "@/lib/data";
import { AgentCard } from "@/components/AgentCard";
import { SearchBar } from "@/components/SearchBar";
import { Suspense } from "react";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const results = query ? searchAgents(query) : [];

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-8">
      <div className="max-w-2xl mx-auto mb-8">
        <SearchBar autoFocus />
      </div>

      {query && (
        <div className="mb-6">
          <h1 className="text-xl font-bold text-white">
            Results for &ldquo;{query}&rdquo;
          </h1>
          <p className="text-sm text-gray-500 mt-1">{results.length} agent{results.length !== 1 ? "s" : ""} found</p>
        </div>
      )}

      {!query && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">Search for agents by name, capability, or tool</p>
        </div>
      )}

      {query && results.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No agents found for &ldquo;{query}&rdquo;</p>
          <p className="text-gray-400 text-sm mt-2">Try different keywords or browse categories</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="bg-[#1c1c1e] rounded-[20px] divide-y divide-white/5">
          {results.map((agent) => (
            <div key={agent.id} className="px-5 py-4">
              <AgentCard agent={agent} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-[1200px] mx-auto px-5 py-8"><p className="text-gray-400">Loading...</p></div>}>
      <SearchResults />
    </Suspense>
  );
}
