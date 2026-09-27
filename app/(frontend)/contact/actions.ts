"use server";

import {
  validateEnquiry,
  trimEnquiry,
  type EnquiryErrors,
  type EnquiryFields,
} from "@/app/contact/validate-enquiry";
import { getCMS } from "@/lib/content";

type EnquiryResult =
  | { ok: true }
  | { ok: false; errors?: EnquiryErrors; error?: string };

export async function submitEnquiry(
  input: EnquiryFields,
): Promise<EnquiryResult> {
  const values = trimEnquiry(input);
  const errors = validateEnquiry(values);
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  try {
    const payload = await getCMS();
    await payload.create({
      collection: "enquiries",
      overrideAccess: true,
      data: values,
    });
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "We could not send your enquiry. Please try again.",
    };
  }
}
