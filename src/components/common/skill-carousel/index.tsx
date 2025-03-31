"use client";

// Create a new component for the skill cards carousel using Embla Carousel
import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeIcon, ServerIcon, DevOpsIcon } from "@/lib/icons";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { SkillCarouselProps } from "./skill-carousel.types";

const SkillCarousel = (props: SkillCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "CodeIcon":
        return <CodeIcon className="h-6 w-6 text-primary" />;
      case "ServerIcon":
        return <ServerIcon className="h-6 w-6 text-primary" />;
      case "DevOpsIcon":
        return <DevOpsIcon className="h-6 w-6 text-primary" />;
      default:
        return <CodeIcon className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <div className="relative mb-8">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6">
          {props.skills?.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 rounded-lg border p-4 md:p-6 shadow-sm transition-all hover:shadow-md min-w-[280px] sm:min-w-[220px] flex-shrink-0"
            >
              <div className="rounded-full bg-primary/10 p-3">
                {getIconComponent(skill.icon)}
              </div>
              <h3 className="text-lg md:text-xl font-bold line-clamp-1">
                {skill.title}
              </h3>
              <p className="text-center text-xs sm:text-sm text-muted-foreground">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "rounded-full bg-background/80 backdrop-blur-sm shadow-md pointer-events-auto -translate-x-1/2",
            prevBtnDisabled && "opacity-30 cursor-not-allowed"
          )}
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
          aria-label="Previous"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "rounded-full bg-background/80 backdrop-blur-sm shadow-md pointer-events-auto translate-x-1/2",
            nextBtnDisabled && "opacity-30 cursor-not-allowed"
          )}
          onClick={scrollNext}
          disabled={nextBtnDisabled}
          aria-label="Next"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              index === selectedIndex ? "bg-primary" : "bg-muted-foreground/30"
            )}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillCarousel;
