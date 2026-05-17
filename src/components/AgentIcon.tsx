"use client";

import { useState } from "react";

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "";
  }
}

function getFaviconUrl(websiteUrl: string): string | null {
  const domain = getDomain(websiteUrl);
  if (!domain) return null;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

// Generate a consistent gradient from a string
function getGradientFromName(name: string): string {
  const gradients = [
    "from-indigo-400 to-purple-500",
    "from-purple-400 to-pink-500",
    "from-pink-400 to-rose-500",
    "from-rose-400 to-orange-500",
    "from-orange-400 to-amber-500",
    "from-amber-400 to-yellow-500",
    "from-emerald-400 to-teal-500",
    "from-teal-400 to-cyan-500",
    "from-cyan-400 to-blue-500",
    "from-blue-400 to-indigo-500",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
}

interface AgentIconProps {
  name: string;
  websiteUrl: string;
  iconUrl?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  glowColor?: string;
}

const sizeClasses = {
  sm: "w-9 h-9 text-sm",
  md: "w-14 h-14 text-xl",
  lg: "w-18 h-18 text-2xl",
  xl: "w-22 h-22 text-3xl",
};

export function AgentIcon({ name, websiteUrl, iconUrl, size = "md", className = "", glowColor }: AgentIconProps) {
  const [imgError, setImgError] = useState(false);
  const [fallbackError, setFallbackError] = useState(false);

  const primaryUrl = iconUrl && iconUrl.trim() ? iconUrl : null;
  const fallbackUrl = getFaviconUrl(websiteUrl);
  const gradient = getGradientFromName(name);

  const glowStyle = glowColor
    ? { boxShadow: `0 0 20px ${glowColor}30, 0 0 40px ${glowColor}15` }
    : undefined;

  return (
    <div
      className={`${sizeClasses[size]} rounded-2xl bg-gray-100 border border-black/[0.04] flex-shrink-0 overflow-hidden flex items-center justify-center relative ${className}`}
      style={glowStyle}
    >
      {glowColor && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${glowColor}10 0%, transparent 70%)`,
          }}
        />
      )}
      {primaryUrl && !imgError ? (
        <img
          src={primaryUrl}
          alt={`${name} icon`}
          className="w-full h-full object-cover relative z-[1]"
          onError={() => setImgError(true)}
        />
      ) : fallbackUrl && !fallbackError ? (
        <img
          src={fallbackUrl}
          alt={`${name} icon`}
          className="w-full h-full object-contain p-2.5 relative z-[1]"
          onError={() => setFallbackError(true)}
        />
      ) : (
        <div className={`w-full h-full flex items-center justify-center font-bold text-white bg-gradient-to-br ${gradient} relative z-[1]`}>
          {name[0]}
        </div>
      )}
    </div>
  );
}
