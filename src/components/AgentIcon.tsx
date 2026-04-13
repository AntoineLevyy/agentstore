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

interface AgentIconProps {
  name: string;
  websiteUrl: string;
  iconUrl?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "w-10 h-10 text-lg",
  md: "w-16 h-16 text-2xl",
  lg: "w-20 h-20 text-3xl",
  xl: "w-32 h-32 text-5xl",
};

export function AgentIcon({ name, websiteUrl, iconUrl, size = "md", className = "" }: AgentIconProps) {
  const [imgError, setImgError] = useState(false);
  const [fallbackError, setFallbackError] = useState(false);

  // Priority: icon_url > favicon > letter
  const primaryUrl = iconUrl && iconUrl.trim() ? iconUrl : null;
  const fallbackUrl = getFaviconUrl(websiteUrl);

  return (
    <div className={`${sizeClasses[size]} rounded-[8px] bg-[#0f1011] border border-[rgba(255,255,255,0.05)] flex-shrink-0 overflow-hidden flex items-center justify-center ${className}`}>
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
        <span className="font-[510] text-[#62666d]">{name[0]}</span>
      )}
    </div>
  );
}
