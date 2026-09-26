"use client";

import Button from "@/shared/ui/atoms/button";
import { useState, type FormEvent } from "react";

const fieldClassName =
  "w-full rounded-xl border border-[rgba(196,195,198,0.6)] bg-[rgba(244,244,244,0.4)] px-4 font-riposte text-[16px] font-light text-ink outline-none focus:border-brand-primary";

type EnquireFormProps = {
  enquireTitle: string;
  nameLabel: string;
  mobileLabel: string;
  emailLabel: string;
  messageLabel: string;
  sendLabel: string;
  success: string;
  email: string;
};

export default function EnquireForm({ page }: { page: EnquireFormProps }) {
  const [sent, setSent] = useState(false);
  const { enquireTitle, sendLabel, success, email } = page;
  const fields = [
    { name: "fullName", label: page.nameLabel, type: "text", autoComplete: "name" },
    { name: "mobile", label: page.mobileLabel, type: "tel", autoComplete: "tel" },
    { name: "email", label: page.emailLabel, type: "email", autoComplete: "email" },
    { name: "message", label: page.messageLabel, type: "textarea", autoComplete: "off" },
  ];

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("fullName") ?? "").trim();
    const mobile = String(data.get("mobile") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const body = `Name: ${name}\nMobile: ${mobile}\nEmail: ${from}\n\n${message}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
    event.currentTarget.reset();
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <h2 className="text-[24px] leading-[50px] font-bold text-ink">{enquireTitle}</h2>
      <div className="mt-[15px] flex flex-col gap-[15px]">
        {fields.map((field) => (
          <label key={field.name} className="flex flex-col gap-2.5">
            <span className="font-riposte text-[16px] leading-normal font-light text-[#253326]">{field.label}</span>
            {field.type === "textarea" ? (
              <textarea name={field.name} required rows={5} autoComplete={field.autoComplete} className={`${fieldClassName} h-[152px] resize-none py-4`} />
            ) : (
              <input
                name={field.name}
                type={field.type}
                required
                autoComplete={field.autoComplete}
                className={`${fieldClassName} h-14`}
              />
            )}
          </label>
        ))}
      </div>
      <Button type="submit" className="font-riposte mt-5 h-14 w-full rounded-full text-[20px] leading-none font-light text-[#FAF6F0]">
        {sendLabel}
      </Button>
      {sent ? (
        <p role="status" className="font-riposte mt-4 text-[16px] leading-7 font-light text-[#253326]">
          {success}
        </p>
      ) : null}
    </form>
  );
}
