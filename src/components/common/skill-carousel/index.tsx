"use client";

// Create a new component for the skill cards carousel using Embla Carousel
import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeIcon, ServerIcon, DevOpsIcon } from "@/lib/icons";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { SkillCarouselProps } from "./skill-carousel.types";
import { useMediaQuery } from "@/hooks/use-media-query";

const SkillCarousel = (props: SkillCarouselProps) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px)");

  // Calculate slides per view based on screen size
  const slidesPerView = isDesktop ? 3 : isTablet ? 2 : 1;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    containScroll: "trimSnaps",
    slidesToScroll: slidesPerView,
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

    // When screen size changes, we need to reinitialize
    emblaApi.reInit();

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect, isDesktop, isTablet]);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "CodeIcon":
        return <CodeIcon className="h-5 w-5 text-primary" />;
      case "ServerIcon":
        return <ServerIcon className="h-5 w-5 text-primary" />;
      case "DevOpsIcon":
        return <DevOpsIcon className="h-5 w-5 text-primary" />;
      default:
        return <CodeIcon className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="relative mb-8">
      {/* Carousel container with padding for the navigation buttons */}
      <div className="px-10">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {props.skills?.map((skill, index) => (
              <div
                key={skill.id}
                className={`flex-grow flex-shrink-0 basis-full sm:basis-1/2 lg:basis-1/3 p-2`}
              >
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 shadow-sm transition-all hover:shadow-md h-full">
                  <div className="rounded-full bg-primary/10 p-3">
                    {getIconComponent(skill.icon)}
                  </div>
                  <h3 className="text-base md:text-lg font-bold line-clamp-1">
                    {skill.title}
                  </h3>
                  <p className="text-center text-xs sm:text-sm text-muted-foreground">
                    {skill.skills.join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons - positioned outside the carousel */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-full bg-background/80 backdrop-blur-sm shadow-md absolute left-0 top-1/2 -translate-y-1/2 z-10",
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
          "rounded-full bg-background/80 backdrop-blur-sm shadow-md absolute right-0 top-1/2 -translate-y-1/2 z-10",
          nextBtnDisabled && "opacity-30 cursor-not-allowed"
        )}
        onClick={scrollNext}
        disabled={nextBtnDisabled}
        aria-label="Next"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

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
