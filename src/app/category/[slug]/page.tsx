import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategory, getAgentsByCategory, categories } from "@/lib/data";
import { AgentCard } from "@/components/AgentCard";
import { ChevronRight } from "lucide-react";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const categoryAgents = getAgentsByCategory(category.id);

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#8a8f98] mb-6">
        <Link href="/" className="hover:text-[#d0d6e0]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/discover" className="hover:text-[#d0d6e0]">Discover</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#d0d6e0]">{category.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <h1 className="text-3xl font-bold text-white">{category.name}</h1>
          <p className="text-[#8a8f98] mt-1">{category.description}</p>
        </div>
      </div>

      {/* Agents list */}
      {categoryAgents.length > 0 ? (
        <div className="bg-[#0f1011] rounded-[20px] divide-y divide-white/5">
          {categoryAgents.map((agent) => (
            <div key={agent.id} className="px-5 py-4">
              <AgentCard agent={agent} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-[#8a8f98] text-lg">No agents in this category yet</p>
          <Link href="/submit" className="text-[#5e6ad2] text-sm font-medium mt-2 inline-block hover:underline">
            Submit the first one
          </Link>
        </div>
      )}

      {/* Other categories */}
      <section className="mt-12">
        <h2 className="text-lg font-bold text-white mb-4">Other Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {categories
            .filter((c) => c.id !== category.id)
            .slice(0, 5)
            .map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="bg-[#0f1011] rounded-2xl p-4 hover:bg-[#101112] transition-colors"
              >
                <span className="text-2xl">{cat.icon}</span>
                <p className="font-semibold text-sm text-white mt-2">{cat.name}</p>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
