import { Fragment } from "react";
import { playfair } from "../fonts";

type Part =
  | { key: string; kind: "text" | "accent"; text: string }
  | { key: string; kind: "break" };

/** Splits a title into plain text, *accented* words and line breaks. */
function titleParts(title: string): Part[] {
  const parts: Part[] = [];
  let from = 0;
  for (const match of title.matchAll(/\*([^*]+)\*|\n/g)) {
    const at = match.index;
    if (at > from) {
      parts.push({
        key: `t${from}`,
        kind: "text",
        text: title.slice(from, at),
      });
    }
    parts.push(
      match[0] === "\n"
        ? { key: `b${at}`, kind: "break" }
        : { key: `a${at}`, kind: "accent", text: match[1] },
    );
    from = at + match[0].length;
  }
  if (from < title.length) {
    parts.push({ key: `t${from}`, kind: "text", text: title.slice(from) });
  }
  return parts;
}

/**
 * A title from the CMS: words wrapped in *asterisks* are set in pink italics,
 * and a new line in the text starts a new line.
 * "Experiences *That Speak*\nfor Themselves"
 */
export default function AccentTitle({ text }: { text: string }) {
  return titleParts(text).map((part) => {
    if (part.kind === "break") return <br key={part.key} />;
    if (part.kind === "text") {
      return <Fragment key={part.key}>{part.text}</Fragment>;
    }
    return (
      <em
        key={part.key}
        className={`${playfair.className} font-semibold text-brand-primary`}
      >
        {part.text}
      </em>
    );
  });
}
