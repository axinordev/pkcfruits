import Button from "@/shared/ui/atoms/button";
import { ArrowRight, ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { Manrope } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const manrope = Manrope({ subsets: ["latin"], weight: "400" });

const riposte = "font-['Riposte','Helvetica_Neue',Helvetica,Arial,sans-serif] font-light";

const usefulLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/product" },
  { label: "Awards", href: "/awards" },
  { label: "News and Events", href: "/news" },
  { label: "Contact Us", href: "/contact" },
] as const;

const socialLinks: { label: string; href?: string; icon: ReactNode }[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/pkcfruits/",
    icon: <FacebookIcon />,
  },
  {
    label: "Instagram",
    icon: <InstagramIcon />,
  },
  {
    label: "YouTube",
    icon: <YouTubeIcon />,
  },
];

const socialClassName =
  "flex size-7 items-center justify-center rounded-full bg-brand-primary text-white";

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden text-white">
      <Image
        src="/footer.gif"
        alt=""
        fill
        unoptimized
        sizes="100vw"
        className="object-cover object-center"
      />
      <div aria-hidden className="absolute inset-0 bg-black/65" />
      <div className="relative border-b border-white/10">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-6 py-16 lg:px-10 lg:pt-16 lg:pb-12">
          <p className={`${riposte} inline-flex h-[30px] items-center rounded-full bg-[#FED7E4] px-3 text-sm leading-5 text-brand-primary/80`}>
            Contact
          </p>
          <h2 className="mt-6 max-w-[18rem] text-center text-[32px] leading-tight font-bold lg:max-w-none lg:text-[40px] lg:leading-[50px] lg:whitespace-nowrap">
            Let’s Bring Good Things Together
          </h2>
          <p className={`${riposte} mt-4 max-w-[529px] text-center text-base leading-7 text-white/80 lg:text-lg`}>
            Whether you’re looking to source premium fruits or explore a partnership, we’d love to hear from you.
          </p>
          <Button
            href="/contact"
            className={`${riposte} mt-8 h-12 w-auto rounded-full px-7 text-base text-[#FAF6F0]`}
          >
            Contact Us
            <ArrowRight className="size-4" strokeWidth={2} />
          </Button>

          <div className="mt-14 w-full max-w-[1360px] rounded-3xl bg-[rgba(238,242,243,0.1)] px-6 py-8 backdrop-blur-[14px] lg:mt-16 lg:px-10 lg:pt-9 lg:pb-6">
            <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_auto_minmax(280px,1fr)] lg:gap-x-16">
              <div className="flex flex-col items-start">
                <Link href="/" className="inline-flex">
                  <Image src="/logo.png" alt="PKC Fruits" width={244} height={75} className="h-[75px] w-[244px] object-contain" />
                </Link>
                <ul className="mt-8 flex items-center gap-2.5 lg:mt-20">
                  {socialLinks.map((item) => (
                    <li key={item.label}>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noreferrer" aria-label={item.label} className={socialClassName}>
                          {item.icon}
                        </a>
                      ) : (
                        <span role="img" aria-label={item.label} className={socialClassName}>
                          {item.icon}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <nav aria-label="Useful links">
                <p className={`${riposte} text-xl leading-7`}>Useful Links</p>
                <ul className="mt-2 flex flex-col">
                  {usefulLinks.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={`${riposte} inline-flex py-0.5 text-lg leading-7 text-white/80 hover:text-white`}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <ul className="flex max-w-[420px] flex-col gap-3.5 lg:pt-0.5">
                <li className="flex items-start gap-3.5">
                  <MapPin className="mt-1 size-[18px] shrink-0 text-brand-primary" strokeWidth={2} aria-hidden />
                  <p className={`${riposte} text-lg leading-7 text-white/80`}>
                    17/2279, Alakapuri Building, MM Ali Road,
                    <br />
                    Kozhikode, Kerala 673002
                  </p>
                </li>
                <li>
                  <a href="mailto:pkcfruitsworld@gmail.com" className={`${riposte} flex items-center gap-3.5 text-lg leading-7 text-white/80 hover:text-white`}>
                    <Mail className="size-[18px] shrink-0 text-brand-primary" strokeWidth={2} aria-hidden />
                    pkcfruitsworld@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+919947858586" className={`${riposte} flex items-center gap-3.5 text-lg leading-7 text-white/80 hover:text-white`}>
                    <Phone className="size-[18px] shrink-0 text-brand-primary" strokeWidth={2} aria-hidden />
                    +91 9947858586
                  </a>
                </li>
              </ul>
            </div>

            <div className="mt-8 border-t border-white/20 pt-4">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <p className={`${manrope.className} text-sm leading-9 text-white/50`}>© 2026 PKC Fruits - All rights reserved</p>
                <a href="#top" className="inline-flex items-center gap-2.5">
                  <span className={`${riposte} text-lg leading-7 text-white/80`}>Back to top</span>
                  <span className="flex size-7 items-center justify-center rounded-[5px] bg-brand-primary">
                    <ArrowUp className="size-3.5 text-white" strokeWidth={2.5} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
      <path d="M14.5 8.5H13a1 1 0 0 0-1 1V11h2.4l-.4 2.5H12V19H9.5v-5.5H7.5V11h2V9.2A3.2 3.2 0 0 1 12.8 6H14.5v2.5Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 fill-none stroke-current" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="4" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.4" strokeWidth="1.8" />
      <circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
      <path d="M20.2 8.4a2.2 2.2 0 0 0-1.6-1.6C17.2 6.5 12 6.5 12 6.5s-5.2 0-6.6.3a2.2 2.2 0 0 0-1.6 1.6C3.5 9.8 3.5 12 3.5 12s0 2.2.3 3.6a2.2 2.2 0 0 0 1.6 1.6c1.4.3 6.6.3 6.6.3s5.2 0 6.6-.3a2.2 2.2 0 0 0 1.6-1.6c.3-1.4.3-3.6.3-3.6s0-2.2-.3-3.6ZM10.4 14.8V9.2L15.2 12l-4.8 2.8Z" />
    </svg>
  );
}
