import { aboutSectionContent } from "@/app/home-page/constants";
import Button from "@/shared/ui/atoms/button";

export default function AboutSection() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center text-white">
      <h2 className="text-[48px] leading-tight font-bold tracking-normal">{aboutSectionContent.title}</h2>
      <p className="text-center font-['Riposte','Helvetica_Neue',Helvetica,Arial,sans-serif] text-[25px] leading-[45px] font-light tracking-normal">
        {aboutSectionContent.description}
      </p>
      <Button href={aboutSectionContent.href} variant="primary">
        {aboutSectionContent.action}
      </Button>
    </div>
  );
}
