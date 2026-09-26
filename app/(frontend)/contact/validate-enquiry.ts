export type EnquiryFields = {
  fullName: string;
  mobile: string;
  email: string;
  message: string;
};

export type EnquiryField = keyof EnquiryFields;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

const namePattern = /^[A-Za-z\u00C0-\u024F\u0900-\u097F\u0D00-\u0D7F]+(?:[ '\-.][A-Za-z\u00C0-\u024F\u0900-\u097F\u0D00-\u0D7F]+)*$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function trimEnquiry(input: EnquiryFields): EnquiryFields {
  return {
    fullName: input.fullName.trim(),
    mobile: input.mobile.trim(),
    email: input.email.trim(),
    message: input.message.trim(),
  };
}

export function validateEnquiry(input: EnquiryFields): EnquiryErrors {
  const values = trimEnquiry(input);
  const errors: EnquiryErrors = {};

  if (!values.fullName) errors.fullName = "Enter your full name.";
  else if (values.fullName.length < 2 || values.fullName.length > 80 || !namePattern.test(values.fullName)) {
    errors.fullName = "Enter a valid name.";
  }

  const digits = values.mobile.replace(/\D/g, "");
  if (!values.mobile) errors.mobile = "Enter your mobile number.";
  else if (!/^[+\d][\d\s()-]*$/.test(values.mobile) || digits.length < 10 || digits.length > 15) {
    errors.mobile = "Enter a valid mobile number.";
  }

  if (!values.email) errors.email = "Enter your email address.";
  else if (values.email.length > 200 || !emailPattern.test(values.email)) errors.email = "Enter a valid email address.";

  if (!values.message) errors.message = "Enter a message.";
  else if (values.message.length < 10) errors.message = "Write at least 10 characters.";
  else if (values.message.length > 5000) errors.message = "Keep the message under 5000 characters.";

  return errors;
}
