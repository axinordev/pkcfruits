import { footerContent } from "@/shared/constants/site";

export const contactPageContent = {
  metadata: {
    title: "Contact Us | PKC Fruits",
    description:
      "Enquire with PKC Fruits. Send your name, mobile number, email, and message, or visit us at Alakapuri Building, Kozhikode.",
  },
  badge: "Contact",
  title: "Contact Us",
  image: {
    src: "/contact/enquire-strawberry.png",
    alt: "A ripe strawberry on a black background",
  },
  enquireTitle: "Enquire Now",
  sendLabel: "Send",
  success: "Thank you. Your email app should open with this enquiry so you can send it to us.",
  fields: [
    { name: "fullName", label: "Full Name", type: "text", autoComplete: "name" },
    { name: "mobile", label: "Mobile Number", type: "tel", autoComplete: "tel" },
    { name: "email", label: "E mail", type: "email", autoComplete: "email" },
    { name: "message", label: "Message", type: "textarea", autoComplete: "off" },
  ],
  map: {
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.1505243604092!2d75.78374607504881!3d11.250335338928696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65940ff03e57f%3A0x18625710aabe44e1!2sPKC%20Fruits%20World!5e0!3m2!1sen!2sin!4v1790446908017!5m2!1sen!2sin",
    title: "PKC Fruits World on Google Maps",
  },
  address: `${footerContent.address[0]} ${footerContent.address[1]}`,
  email: footerContent.email,
  phone: footerContent.phone,
} as const;
