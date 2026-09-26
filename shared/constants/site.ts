export const navContent = {
  links: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Products", href: "/product" },
    { label: "Awards", href: "/awards" },
    { label: "Gallery", href: "/gallery" },
    { label: "News & Events", href: "/news" },
  ],
  action: { label: "Contact Us", href: "/contact" },
} as const;

export const footerContent = {
  badge: "Contact",
  title: "Let’s Bring Good Things Together",
  description:
    "Whether you’re looking to source premium fruits or explore a partnership, we’d love to hear from you.",
  action: { label: "Contact Us", href: "/contact" },
  usefulLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Products", href: "/product" },
    { label: "Awards", href: "/awards" },
    { label: "News and Events", href: "/news" },
    { label: "Contact Us", href: "/contact" },
  ],
  address: ["17/2279, Alakapuri Building, MM Ali Road,", "Kozhikode, Kerala 673002"],
  email: "pkcfruitsworld@gmail.com",
  phone: { label: "+91 9947858586", href: "tel:+919947858586" },
  social: [
    { label: "Facebook", href: "https://www.facebook.com/pkcfruits/" },
    { label: "Instagram", href: "" },
    { label: "YouTube", href: "" },
  ],
  copyright: "© 2026 PKC Fruits - All rights reserved",
  backToTop: "Back to top",
} as const;
