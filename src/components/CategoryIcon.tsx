import { Zap, Code2, PenLine, Microscope, BarChart3, Headphones, Palette, GraduationCap, Wallet, TrendingUp, Heart, ShoppingCart, Plane, Users, Lightbulb, Baby, Scale, PiggyBank } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  // B2B
  "productivity": Zap,
  "developer-tools": Code2,
  "writing": PenLine,
  "research": Microscope,
  "data-analysis": BarChart3,
  "customer-support": Headphones,
  "creative": Palette,
  "education": GraduationCap,
  "finance": Wallet,
  "sales-marketing": TrendingUp,
  // B2C
  "health-wellness": Heart,
  "shopping-home": ShoppingCart,
  "travel-lifestyle": Plane,
  "relationships-social": Users,
  "learning-skills": Lightbulb,
  "parenting-family": Baby,
  "legal-admin": Scale,
  "personal-finance": PiggyBank,
};

const colorMap: Record<string, { bg: string; text: string }> = {
  // B2B
  "productivity": { bg: "rgba(94, 106, 210, 0.12)", text: "#5e6ad2" },
  "developer-tools": { bg: "rgba(16, 185, 129, 0.12)", text: "#10b981" },
  "writing": { bg: "rgba(139, 92, 246, 0.12)", text: "#8b5cf6" },
  "research": { bg: "rgba(6, 182, 212, 0.12)", text: "#06b6d4" },
  "data-analysis": { bg: "rgba(251, 146, 60, 0.12)", text: "#fb923c" },
  "customer-support": { bg: "rgba(94, 106, 210, 0.12)", text: "#5e6ad2" },
  "creative": { bg: "rgba(236, 72, 153, 0.12)", text: "#ec4899" },
  "education": { bg: "rgba(139, 92, 246, 0.12)", text: "#8b5cf6" },
  "finance": { bg: "rgba(16, 185, 129, 0.12)", text: "#10b981" },
  "sales-marketing": { bg: "rgba(251, 146, 60, 0.12)", text: "#fb923c" },
  // B2C
  "health-wellness": { bg: "rgba(239, 68, 68, 0.12)", text: "#ef4444" },
  "shopping-home": { bg: "rgba(16, 185, 129, 0.12)", text: "#10b981" },
  "travel-lifestyle": { bg: "rgba(6, 182, 212, 0.12)", text: "#06b6d4" },
  "relationships-social": { bg: "rgba(236, 72, 153, 0.12)", text: "#ec4899" },
  "learning-skills": { bg: "rgba(251, 146, 60, 0.12)", text: "#fb923c" },
  "parenting-family": { bg: "rgba(139, 92, 246, 0.12)", text: "#8b5cf6" },
  "legal-admin": { bg: "rgba(94, 106, 210, 0.12)", text: "#5e6ad2" },
  "personal-finance": { bg: "rgba(16, 185, 129, 0.12)", text: "#10b981" },
};

interface CategoryIconProps {
  slug: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: { box: "w-7 h-7 rounded-[5px]", icon: "w-3.5 h-3.5" },
  md: { box: "w-9 h-9 rounded-[6px]", icon: "w-4 h-4" },
  lg: { box: "w-11 h-11 rounded-[8px]", icon: "w-5 h-5" },
};

export function CategoryIcon({ slug, size = "md" }: CategoryIconProps) {
  const Icon = iconMap[slug] || Zap;
  const colors = colorMap[slug] || colorMap["productivity"];
  const s = sizeClasses[size];

  return (
    <div
      className={`${s.box} flex items-center justify-center flex-shrink-0`}
      style={{ backgroundColor: colors.bg }}
    >
      <Icon className={s.icon} style={{ color: colors.text }} />
    </div>
  );
}
