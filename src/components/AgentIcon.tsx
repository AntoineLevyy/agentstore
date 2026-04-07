"use client";

import { useState } from "react";

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "";
  }
}

function getLogoUrl(websiteUrl: string): string | null {
  const domain = getDomain(websiteUrl);
  if (!domain) return null;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

interface AgentIconProps {
  name: string;
  websiteUrl: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "w-10 h-10 text-lg",
  md: "w-16 h-16 text-2xl",
  lg: "w-20 h-20 text-3xl",
  xl: "w-32 h-32 text-5xl",
};

export function AgentIcon({ name, websiteUrl, size = "md", className = "" }: AgentIconProps) {
  const [imgError, setImgError] = useState(false);
  const logoUrl = getLogoUrl(websiteUrl);

  return (
    <div className={`${sizeClasses[size]} rounded-[22.5%] bg-[#2c2c2e] flex-shrink-0 overflow-hidden shadow-sm flex items-center justify-center ${className}`}>
      {logoUrl && !imgError ? (
        <img
          src={logoUrl}
          alt={`${name} icon`}
          className="w-full h-full object-contain p-2"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="font-bold text-gray-400">{name[0]}</span>
      )}
    </div>
  );
}
