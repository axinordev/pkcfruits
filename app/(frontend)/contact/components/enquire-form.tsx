"use client";

import { submitEnquiry } from "@/app/contact/actions";
import {
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryFields,
} from "@/app/contact/validate-enquiry";
import Button from "@/shared/ui/atoms/button";
import { Check } from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";

const fieldClassName =
  "w-full rounded-xl border bg-[rgba(244,244,244,0.4)] px-4 font-riposte text-[16px] font-light text-ink outline-none";

const fieldOrder: EnquiryField[] = ["fullName", "mobile", "email", "message"];

function valuesFrom(form: HTMLFormElement): EnquiryFields {
  const data = new FormData(form);
  return {
    fullName: String(data.get("fullName") ?? ""),
    mobile: String(data.get("mobile") ?? ""),
    email: String(data.get("email") ?? ""),
    message: String(data.get("message") ?? ""),
  };
}

type EnquireFormProps = {
  enquireTitle: string;
  nameLabel: string;
  mobileLabel: string;
  emailLabel: string;
  messageLabel: string;
  sendLabel: string;
  success: string;
};

export default function EnquireForm({ page }: { page: EnquireFormProps }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [fieldErrors, setFieldErrors] = useState<EnquiryErrors>({});
  const [formError, setFormError] = useState("");
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const { enquireTitle, sendLabel, success } = page;
  const fields: {
    name: EnquiryField;
    label: string;
    type: string;
    autoComplete: string;
  }[] = [
    {
      name: "fullName",
      label: page.nameLabel,
      type: "text",
      autoComplete: "name",
    },
    {
      name: "mobile",
      label: page.mobileLabel,
      type: "tel",
      autoComplete: "tel",
    },
    {
      name: "email",
      label: page.emailLabel,
      type: "email",
      autoComplete: "email",
    },
    {
      name: "message",
      label: page.messageLabel,
      type: "textarea",
      autoComplete: "off",
    },
  ];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onBackdropClick = (event: Event) => {
      if (event.target === dialog) dialog.close();
    };

    dialog.addEventListener("click", onBackdropClick);
    if (status === "sent" && !dialog.open) dialog.showModal();
    return () => dialog.removeEventListener("click", onBackdropClick);
  }, [status]);

  function closeModal() {
    dialogRef.current?.close();
    setStatus("idle");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = valuesFrom(form);
    const errors = validateEnquiry(values);
    setFieldErrors(errors);
    setFormError("");
    if (Object.keys(errors).length > 0) {
      setStatus("error");
      const firstInvalid = fieldOrder.find((name) => errors[name]);
      const control = firstInvalid
        ? form.elements.namedItem(firstInvalid)
        : null;
      if (control instanceof HTMLElement) control.focus();
      return;
    }

    setStatus("sending");
    const result = await submitEnquiry(values);
    if (!result.ok) {
      setStatus("error");
      setFieldErrors(result.errors ?? {});
      setFormError(result.error ?? "");
      return;
    }
    form.reset();
    setFieldErrors({});
    setStatus("sent");
  }

  return (
    <>
      <form noValidate onSubmit={onSubmit} className="flex flex-col">
        <h2 className="text-[24px] leading-[50px] font-bold text-ink">
          {enquireTitle}
        </h2>
        <div className="mt-[15px] flex flex-col gap-[15px]">
          {fields.map((field) => {
            const error = fieldErrors[field.name];
            const describedBy = error ? `${field.name}-error` : undefined;
            const controlClassName = `${fieldClassName} ${error ? "border-brand-primary" : "border-[rgba(196,195,198,0.6)] focus:border-brand-primary"}`;
            return (
              <label key={field.name} className="flex flex-col gap-2.5">
                <span className="font-riposte text-[16px] leading-normal font-light text-[#253326]">
                  {field.label}
                </span>
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    rows={5}
                    autoComplete={field.autoComplete}
                    aria-invalid={Boolean(error)}
                    aria-describedby={describedBy}
                    onChange={() =>
                      setFieldErrors((current) => ({
                        ...current,
                        [field.name]: undefined,
                      }))
                    }
                    className={`${controlClassName} h-[152px] resize-none py-4`}
                  />
                ) : (
                  <input
                    name={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    aria-invalid={Boolean(error)}
                    aria-describedby={describedBy}
                    onChange={() =>
                      setFieldErrors((current) => ({
                        ...current,
                        [field.name]: undefined,
                      }))
                    }
                    className={`${controlClassName} h-14`}
                  />
                )}
                {error ? (
                  <p
                    id={`${field.name}-error`}
                    role="alert"
                    className="font-riposte text-[14px] leading-5 font-light text-brand-primary"
                  >
                    {error}
                  </p>
                ) : null}
              </label>
            );
          })}
        </div>
        <Button
          type="submit"
          disabled={status === "sending"}
          className="font-riposte mt-5 h-14 w-full rounded-full text-[20px] leading-none font-light text-[#FAF6F0] disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : sendLabel}
        </Button>
        {formError ? (
          <p
            role="alert"
            className="font-riposte mt-4 text-[16px] leading-7 font-light text-brand-primary"
          >
            {formError}
          </p>
        ) : null}
      </form>

      {mounted
        ? createPortal(
            <dialog
              ref={dialogRef}
              aria-labelledby={titleId}
              onClose={() => setStatus("idle")}
              className="m-auto w-[min(100%-2.5rem,440px)] rounded-[20px] border-0 bg-white p-8 text-center shadow-[0px_8px_32px_rgba(0,0,0,0.12)] backdrop:bg-ink/50"
            >
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-blush text-brand-primary">
                <Check className="size-8" strokeWidth={2.25} aria-hidden />
              </div>
              <h2
                id={titleId}
                className="mt-5 text-[24px] leading-8 font-bold text-ink"
              >
                Enquiry sent
              </h2>
              <p className="font-riposte mt-3 text-[16px] leading-7 font-light text-[#253326]">
                {success}
              </p>
              <Button
                type="button"
                onClick={closeModal}
                className="font-riposte mt-6 h-14 w-full rounded-full text-[20px] leading-none font-light text-[#FAF6F0]"
              >
                Close
              </Button>
            </dialog>,
            document.body,
          )
        : null}
    </>
  );
}
