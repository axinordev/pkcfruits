import { getSiteContact, type SocialPlatform } from "@/lib/content";
import { footerContent } from "@/shared/constants/site";
import Badge from "@/shared/ui/atoms/badge";
import Button from "@/shared/ui/atoms/button";
import { ArrowRight, ArrowUp } from "lucide-react";
import { Manrope } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const manrope = Manrope({ subsets: ["latin"], weight: "400" });

const riposte = "font-riposte font-light";

const socialIcons: Record<SocialPlatform, ReactNode> = {
  facebook: <FacebookIcon />,
  instagram: <InstagramIcon />,
  youtube: <YouTubeIcon />,
};

const socialClassName =
  "flex size-7 items-center justify-center rounded-full bg-brand-primary text-white";

export default async function Footer() {
  const contact = await getSiteContact();
  const phoneHref = `tel:${contact.phone.replace(/[^\d+]/g, "")}`;

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
          <Badge className="h-[30px] rounded-full px-3 text-sm">
            {footerContent.badge}
          </Badge>
          <h2 className="mt-6 max-w-[18rem] text-center text-[32px] leading-tight font-bold lg:max-w-none lg:text-[40px] lg:leading-[50px] lg:whitespace-nowrap">
            {footerContent.title}
          </h2>
          <p
            className={`${riposte} mt-4 max-w-[529px] text-center text-base leading-7 text-white/80 lg:text-lg`}
          >
            {footerContent.description}
          </p>
          <Button
            href={footerContent.action.href}
            className={`${riposte} mt-8 h-12 w-auto rounded-full px-7 text-base text-[#FAF6F0]`}
          >
            {footerContent.action.label}
            <ArrowRight className="size-4" strokeWidth={2} />
          </Button>

          <div className="mt-14 w-full max-w-[1360px] rounded-3xl bg-[rgba(238,242,243,0.1)] px-6 py-8 backdrop-blur-[14px] lg:mt-16 lg:px-10 lg:pt-9 lg:pb-6">
            <div className="flex flex-col items-start gap-4 lg:flex-row lg:justify-between">
              <div className="flex flex-col items-start">
                <Link href="/" className="inline-flex">
                  <Image
                    src="/logo.png"
                    alt="PKC Fruits"
                    width={244}
                    height={75}
                    className="h-[75px] w-[244px] object-contain"
                  />
                </Link>
                <ul className="mt-8 flex items-center gap-2.5 lg:mt-20">
                  {contact.social.map((item) => (
                    <li key={item.platform}>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={item.label}
                          className={socialClassName}
                        >
                          {socialIcons[item.platform]}
                        </a>
                      ) : (
                        <span className={socialClassName}>
                          {socialIcons[item.platform]}
                          <span className="sr-only">{item.label}</span>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <nav aria-label="Useful links">
                <p className={`${riposte} text-xl leading-7`}>Useful Links</p>
                <ul className="mt-2 flex flex-col">
                  {footerContent.usefulLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`${riposte} inline-flex py-0.5 text-lg leading-7 text-white/80 hover:text-white`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <ul className="flex  flex-col gap-3.5 lg:pt-0.5 lg:pr-20">
                <li className="flex items-start gap-3.5">
                  <MapPinIcon />
                  <p
                    className={`${riposte} text-lg leading-7 whitespace-pre-line text-white/80`}
                  >
                    {contact.address}
                  </p>
                </li>
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className={`${riposte} flex items-center gap-3.5 text-lg leading-7 text-white/80 hover:text-white`}
                  >
                    <MailIcon />
                    {contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={phoneHref}
                    className={`${riposte} flex items-center gap-3.5 text-lg leading-7 text-white/80 hover:text-white`}
                  >
                    <PhoneIcon />
                    {contact.phone}
                  </a>
                </li>
              </ul>
            </div>

            <div className="mt-8 border-t border-white/20 pt-4">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <p
                  className={`${manrope.className} text-sm leading-9 text-white/50`}
                >
                  {footerContent.copyright}
                </p>
                <a href="#top" className="inline-flex items-center gap-2.5">
                  <span
                    className={`${riposte} text-lg leading-7 text-white/80`}
                  >
                    {footerContent.backToTop}
                  </span>
                  <span className="flex size-7 items-center justify-center rounded-[5px] bg-brand-primary">
                    <ArrowUp
                      className="size-3.5 text-white"
                      strokeWidth={2.5}
                    />
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

function MapPinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-1 size-6 shrink-0 fill-current text-brand-primary"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M12 2a8 8 0 0 0-8 8c0 5.4 6.6 10.8 7.45 11.48a.9.9 0 0 0 1.1 0C13.4 20.8 20 15.4 20 10a8 8 0 0 0-8-8Zm0 10.75a2.75 2.75 0 1 1 0-5.5 2.75 2.75 0 0 1 0 5.5Z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-6 shrink-0 fill-current text-brand-primary"
      aria-hidden
    >
      <path d="M2.2 7.4 12 13.3l9.8-5.9V17a2 2 0 0 1-2 2H4.2a2 2 0 0 1-2-2V7.4Z" />
      <path d="M2.2 7a2 2 0 0 1 2-2h15.6a2 2 0 0 1 2 2L12 12.9 2.2 7Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-6 shrink-0 fill-current text-brand-primary"
      aria-hidden
    >
      <path d="M7.2 2.8h2.1c.6 0 1.1.4 1.2 1l.5 2.7c.1.6-.2 1.2-.7 1.5l-1.6.9a11.6 11.6 0 0 0 6.4 6.4l.9-1.6c.3-.5.9-.8 1.5-.7l2.7.5c.6.1 1 .6 1 1.2v2.1c0 .8-.6 1.4-1.4 1.4A16.6 16.6 0 0 1 5.8 4.2c0-.8.6-1.4 1.4-1.4Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="fill-current" aria-hidden>
      <path d="M14.5 8.5H13a1 1 0 0 0-1 1V11h2.4l-.4 2.5H12V19H9.5v-5.5H7.5V11h2V9.2A3.2 3.2 0 0 1 12.8 6H14.5v2.5Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="fill-none stroke-current"
      aria-hidden
    >
      <rect x="4" y="4" width="16" height="16" rx="4" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.4" strokeWidth="1.8" />
      <circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="fill-current" aria-hidden>
      <path d="M20.2 8.4a2.2 2.2 0 0 0-1.6-1.6C17.2 6.5 12 6.5 12 6.5s-5.2 0-6.6.3a2.2 2.2 0 0 0-1.6 1.6C3.5 9.8 3.5 12 3.5 12s0 2.2.3 3.6a2.2 2.2 0 0 0 1.6 1.6c1.4.3 6.6.3 6.6.3s5.2 0 6.6-.3a2.2 2.2 0 0 0 1.6-1.6c.3-1.4.3-3.6.3-3.6s0-2.2-.3-3.6ZM10.4 14.8V9.2L15.2 12l-4.8 2.8Z" />
    </svg>
  );
}
