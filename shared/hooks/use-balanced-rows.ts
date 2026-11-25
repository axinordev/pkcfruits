"use client";

import { useLayoutEffect, useRef, useState } from "react";

// Where each row would start if the items were wrapped greedily into rows no
// wider than `limit`.
function wrap(widths: number[], gap: number, limit: number) {
  const breaks: number[] = [];
  let line = -gap;
  widths.forEach((width, index) => {
    if (index > 0 && line + gap + width > limit) {
      breaks.push(index);
      line = width;
    } else {
      line += gap + width;
    }
  });
  return breaks;
}

// The same number of rows the items need anyway, but with the rows as even as
// possible (like `text-wrap: balance`), so the last row is never left with a
// single item.
function balance(widths: number[], gap: number, width: number) {
  const rows = wrap(widths, gap, width).length;
  let low = Math.max(0, ...widths);
  let high = width;
  while (high - low > 1) {
    const mid = (low + high) / 2;
    if (wrap(widths, gap, mid).length <= rows) high = mid;
    else low = mid;
  }
  return wrap(widths, gap, high);
}

/**
 * Balanced rows for a `flex flex-wrap` list whose items grow to fill each row.
 * Returns a ref for the list and the indexes of the items that start a new
 * row; render an empty `<span data-row-break className="basis-full" />`
 * before each of those items. Until the list is measured there are no breaks
 * and the items wrap on their own.
 */
export function useBalancedRows<T extends HTMLElement>(key: string) {
  const ref = useRef<T>(null);
  const [breaks, setBreaks] = useState<number[]>([]);

  useLayoutEffect(() => {
    const list = ref.current;
    if (!list) return;
    let active = true;

    function measure() {
      if (!active || !list) return;
      const items = Array.from(list.children).filter(
        (child): child is HTMLElement =>
          child instanceof HTMLElement && !child.hasAttribute("data-row-break"),
      );
      // Each item's own width, before it grows into the row.
      for (const item of items) item.style.flexGrow = "0";
      const widths = items.map((item) => item.getBoundingClientRect().width);
      for (const item of items) item.style.flexGrow = "";

      const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
      // A pixel of slack so rounding never pushes an item onto its own row.
      const width = list.getBoundingClientRect().width - 1;
      const next = balance(widths, gap, width);
      setBreaks((prev) =>
        prev.length === next.length && prev.every((b, i) => b === next[i])
          ? prev
          : next,
      );
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    // The pill font can arrive after the first measure and change the widths.
    document.fonts?.ready.then(measure);
    return () => {
      active = false;
      observer.disconnect();
    };
    // `key` changes when the items do, which needs a new measure even when
    // the list keeps its size and the observer stays quiet.
    // oxlint-disable-next-line react/exhaustive-effect-dependencies
  }, [key]);

  return [ref, breaks] as const;
}
