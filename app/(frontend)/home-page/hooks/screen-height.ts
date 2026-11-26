let probe: HTMLDivElement | null = null;

/**
 * The height of 100vh in pixels: the screen with a phone browser's address
 * bar and toolbar tucked away. The pinned sections are sized in vh, so their
 * scroll is measured with this rather than window.innerHeight. innerHeight
 * shrinks and grows as those bars slide in and out mid-scroll, which made
 * everything tied to it jump each time; 100vh stays put.
 */
export function screenHeight() {
  if (!probe) {
    probe = document.createElement("div");
    probe.setAttribute("aria-hidden", "true");
    probe.style.cssText =
      "position:fixed;top:0;left:0;width:0;height:100vh;visibility:hidden;pointer-events:none";
    document.body.appendChild(probe);
  }
  return probe.offsetHeight || window.innerHeight;
}
