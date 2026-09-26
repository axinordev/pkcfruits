import EnquireForm from "@/app/contact/components/enquire-form";
import Badge from "@/shared/ui/atoms/badge";
import Heading from "@/shared/ui/atoms/heading";
import Image from "next/image";

type ContactPageView = {
  badge: string;
  title: string;
  image: { src: string; alt: string } | null;
  enquireTitle: string;
  nameLabel: string;
  mobileLabel: string;
  emailLabel: string;
  messageLabel: string;
  sendLabel: string;
  success: string;
  address: string;
  email: string;
  phone: string;
  mapEmbed: string;
};

export default function ContactSection({ page }: { page: ContactPageView }) {
  const { badge, title, image, address, email, phone, mapEmbed } = page;

  return (
    <section className="bg-canvas text-ink">
      <div className="mx-auto w-full max-w-360 px-5 pt-12 pb-16 lg:px-20 lg:pt-20 lg:pb-24">
        <Badge>{badge}</Badge>
        <Heading as="h1" className="mt-5">
          {title}
        </Heading>

        <div className="mt-10 rounded-[20px] bg-white p-5 shadow-[0px_1px_8px_0px_rgba(0,0,0,0.05)]">
          <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,612fr)_minmax(0,568fr)] lg:gap-x-[50px]">
            <div className="relative aspect-[612/622] overflow-hidden rounded-2xl lg:aspect-auto lg:h-full lg:min-h-[622px]">
              {image ? <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 612px, 100vw" className="object-cover" /> : null}
            </div>
            <EnquireForm page={page} />
          </div>

          <ul className="mt-10 flex flex-col gap-4 lg:mt-[91px] lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <li className="flex items-start gap-[15px]">
              <img src="/contact/icon-pin.svg" alt="" width={15} height={20} className="mt-1 shrink-0" />
              <p className="font-riposte max-w-[555px] text-[18px] leading-7 font-light text-[#253326]/80">{address}</p>
            </li>
            <li>
              <a href={`mailto:${email}`} className="font-riposte inline-flex items-center gap-[15px] text-[18px] leading-7 font-light text-[#253326]/80">
                <img src="/contact/icon-mail.svg" alt="" width={18} height={14} />
                {email}
              </a>
            </li>
            <li>
              <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="font-riposte inline-flex items-center gap-[15px] text-[18px] leading-7 font-light whitespace-nowrap text-[#253326]/80">
                <img src="/contact/icon-phone.svg" alt="" width={18} height={18} />
                {phone}
              </a>
            </li>
          </ul>

          {mapEmbed ? (
            <iframe
              src={mapEmbed}
              title="PKC Fruits World on Google Maps"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="mt-10 w-full rounded-[15px]"
              style={{ height: 450, border: 0 }}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
