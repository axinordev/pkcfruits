const videoIdPattern = /^[\w-]{11}$/;

export function youtubeVideoId(input: string | null | undefined) {
  const value = input?.trim();
  if (!value) return null;
  if (videoIdPattern.test(value)) return value;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, "").replace(/^m\./, "");
  if (host === "youtu.be") {
    const id = url.pathname.split("/").filter(Boolean)[0];
    return id && videoIdPattern.test(id) ? id : null;
  }

  if (
    host !== "youtube.com" &&
    host !== "youtube-nocookie.com" &&
    host !== "music.youtube.com"
  ) {
    return null;
  }

  if (url.pathname === "/watch") {
    const id = url.searchParams.get("v");
    return id && videoIdPattern.test(id) ? id : null;
  }

  const [section, id] = url.pathname.split("/").filter(Boolean);
  if (
    id &&
    ["embed", "shorts", "live", "v"].includes(section) &&
    videoIdPattern.test(id)
  ) {
    return id;
  }

  return null;
}

export function youtubeEmbed(input: string | null | undefined) {
  const id = youtubeVideoId(input);
  if (!id) return null;
  return {
    id,
    src: `https://www.youtube-nocookie.com/embed/${id}`,
  };
}
