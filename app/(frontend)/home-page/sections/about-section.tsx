import Button from "@/shared/ui/atoms/button";
import { ArrowRight } from "lucide-react";
import { playfair } from "../fonts";

export default function AboutSection({
  title,
  description,
  button,
}: {
  title: string;
  description: string;
  button: string;
}) {
  return (
    // box-content keeps the 895px measure from the design for the text itself,
    // with the side padding added outside it.
    <div className="mx-auto box-content flex max-w-[895px] flex-col items-center px-6 text-center text-white max-lg:px-5">
      <h2
        className={`${playfair.className} text-hero-heading font-semibold tracking-normal uppercase`}
      >
        {title}
      </h2>
      <p className="font-riposte mt-3 text-center text-hero-body font-light tracking-normal text-white/80 lg:mt-4">
        {description}
      </p>
      <Button
        href="/about"
        variant="primary"
        className="mt-8 h-12 w-48 text-[15px] lg:mt-12 [&_svg]:size-5"
      >
        {button}
        <ArrowRight className="size-6 shrink-0 opacity-100" aria-hidden />
      </Button>
    </div>
  );
}
