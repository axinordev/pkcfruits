import Button from "@/shared/ui/atoms/button";
import { ArrowRight } from "lucide-react";

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
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center text-white max-lg:gap-4 max-lg:px-5">
      <h2 className="text-[48px] leading-tight font-bold tracking-normal max-lg:!text-[32px]">
        {title}
      </h2>
      <p className="font-riposte text-center text-[25px] leading-[45px] font-light tracking-normal max-lg:!text-base max-lg:!leading-7">
        {description}
      </p>
      <Button href="/about" variant="primary">
        {button}
        <ArrowRight className="size-6 shrink-0 opacity-100" aria-hidden />
      </Button>
    </div>
  );
}
