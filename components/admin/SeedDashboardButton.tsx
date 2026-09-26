"use client";

import { useState } from "react";

export default function SeedDashboardButton() {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function seed() {
    setPending(true);
    setMessage("");
    try {
      const response = await fetch("/api/seed-site", { method: "POST", credentials: "include" });
      const body = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(body.message || "Could not seed content.");
      setMessage(body.message || "Default content is ready.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not seed content.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div style={{ marginBottom: 24, padding: 16, border: "1px solid var(--theme-elevation-150)", borderRadius: 8 }}>
      <p style={{ margin: "0 0 12px" }}>
        Load the default pages, products, news, gallery, and awards. Anything already saved is left as it is.
      </p>
      <button type="button" disabled={pending} onClick={seed}>
        {pending ? "Seeding…" : "Seed default content"}
      </button>
      {message ? <p style={{ margin: "12px 0 0" }}>{message}</p> : null}
    </div>
  );
}
