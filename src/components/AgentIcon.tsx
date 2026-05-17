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

// Generate a consistent color from a string
function getColorFromName(name: string): string {
  const colors = [
    "bg-indigo-100 text-indigo-700",
    "bg-purple-100 text-purple-700",
    "bg-pink-100 text-pink-700",
    "bg-rose-100 text-rose-700",
    "bg-orange-100 text-orange-700",
    "bg-amber-100 text-amber-700",
    "bg-emerald-100 text-emerald-700",
    "bg-teal-100 text-teal-700",
    "bg-cyan-100 text-cyan-700",
    "bg-blue-100 text-blue-700",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

interface AgentIconProps {
  name: string;
  websiteUrl: string;
  iconUrl?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "w-9 h-9 text-sm",
  md: "w-12 h-12 text-lg",
  lg: "w-16 h-16 text-2xl",
  xl: "w-20 h-20 text-3xl",
};

export function AgentIcon({ name, websiteUrl, iconUrl, size = "md", className = "" }: AgentIconProps) {
  const [imgError, setImgError] = useState(false);
  const [fallbackError, setFallbackError] = useState(false);

  const primaryUrl = iconUrl && iconUrl.trim() ? iconUrl : null;
  const fallbackUrl = getFaviconUrl(websiteUrl);
  const colorClass = getColorFromName(name);

  return (
    <div className={`${sizeClasses[size]} rounded-xl bg-gray-100 border border-black/[0.04] flex-shrink-0 overflow-hidden flex items-center justify-center ${className}`}>
      {primaryUrl && !imgError ? (
        <img
          src={primaryUrl}
          alt={`${name} icon`}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : fallbackUrl && !fallbackError ? (
        <img
          src={fallbackUrl}
          alt={`${name} icon`}
          className="w-full h-full object-contain p-2"
          onError={() => setFallbackError(true)}
        />
      ) : (
        <div className={`w-full h-full flex items-center justify-center font-bold ${colorClass}`}>
          {name[0]}
        </div>
      )}
    </div>
  );
}
