"use client";

import { newsDetailContent, type ShareNetworkId } from "@/app/news/constants";
import { useSyncExternalStore } from "react";

const shareUrl = {
  linkedin: (url: string) =>
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  facebook: (url: string) =>
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  x: (url: string, title: string) =>
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
} satisfies Record<ShareNetworkId, (url: string, title: string) => string>;

function subscribe(onStoreChange: () => void) {
  window.addEventListener("popstate", onStoreChange);
  return () => window.removeEventListener("popstate", onStoreChange);
}

function getPageUrl() {
  return window.location.href;
}

function getServerPageUrl() {
  return "";
}

export default function ShareLinks({ title }: { title: string }) {
  const pageUrl = useSyncExternalStore(subscribe, getPageUrl, getServerPageUrl);

  return (
    <ul
      aria-label={newsDetailContent.shareLabel}
      className="flex flex-row flex-wrap gap-x-5 gap-y-2 lg:flex-col lg:items-end lg:gap-2"
    >
      {newsDetailContent.shareNetworks.map((network) => (
        <li key={network.id}>
          <a
            href={pageUrl ? shareUrl[network.id](pageUrl, title) : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="font-riposte text-[16px] leading-6 font-light text-brand-primary"
          >
            {network.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
