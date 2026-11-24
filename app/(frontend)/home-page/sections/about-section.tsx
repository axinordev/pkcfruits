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
    <div className="mx-auto flex max-w-[900px] flex-col items-center px-6 text-center text-white max-lg:px-5">
      <h2
        className={`${playfair.className} text-[28px] leading-tight font-semibold tracking-normal uppercase lg:text-[40px]`}
      >
        {title}
      </h2>
      <p className="font-riposte mt-3 text-center text-[15px] leading-7 font-light tracking-normal text-white/85 lg:mt-4 lg:text-[19px] lg:leading-8">
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
