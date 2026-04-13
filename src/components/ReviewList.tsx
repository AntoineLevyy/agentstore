import { Star } from "lucide-react";
import { Review } from "@/lib/db";

export function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null;

  return (
    <div className="space-y-4 mt-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-[#0f1011] rounded-[8px] p-5 border border-[rgba(255,255,255,0.05)]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-3.5 h-3.5 ${
                      s <= review.rating ? "fill-[#fb923c] text-[#fb923c]" : "fill-[#62666d]/30 text-[#62666d]/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[13px] font-[510] text-[#d0d6e0]">{review.user_name}</span>
            </div>
            <span className="text-[11px] text-[#62666d]">
              {new Date(review.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
          <h4 className="text-[14px] font-[510] text-[#f7f8f8]">{review.title}</h4>
          <p className="text-[13px] text-[#8a8f98] mt-1 leading-[20px]">{review.body}</p>
        </div>
      ))}
    </div>
  );
}
