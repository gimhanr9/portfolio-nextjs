import { Badge } from "@/components/ui/badge";
import { experience } from "@/data/experience";
import { useTranslations } from "next-intl";

const ExperienceTimeline = () => {
  const t = useTranslations();
  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
      {experience?.map((exp, index) => (
        <div key={index} className="relative pl-6 sm:pl-8 md:pl-10 lg:pl-12">
          {/* Timeline connector */}
          {index < experience?.length - 1 && (
            <div className="absolute left-2 sm:left-3 md:left-4 lg:left-5 top-8 sm:top-10 md:top-12 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800"></div>
          )}

          {/* Company logo */}
          <div
            className={`absolute left-0 top-0 flex h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 items-center justify-center rounded-full ${exp.companyColor} text-white font-bold text-xs sm:text-sm md:text-base`}
          >
            {exp.companyLogo}
          </div>

          {/* Content */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 sm:mb-2">
              <h3 className="text-base md:text-lg lg:text-xl font-bold text-primary">
                {exp.company}
              </h3>
              <Badge
                variant="outline"
                className="mt-1 sm:mt-0 w-fit text-xs sm:text-sm"
              >
                {exp.period}
              </Badge>
            </div>

            <h4 className="text-sm md:text-base lg:text-lg font-medium mb-1 sm:mb-2 md:mb-3">
              {t(exp.positionKey)}
            </h4>

            <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
              {exp.descriptionKeys?.map((desc, i) => (
                <p key={i} className="text-xs sm:text-sm text-muted-foreground">
                  {t(desc)}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceTimeline;
