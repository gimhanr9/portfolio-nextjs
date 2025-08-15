import { ExperienceItem } from "@/components/common/experience-timeline/experience-timeline.types";

export const experience: ExperienceItem[] = [
  {
    company: "H2Compute",
    companyLogo: "H2",
    companyColor: "bg-blue-500",
    positionKey: "experience.positions.h2compute",
    period: "Apr 2023 - Present",
    descriptionKeys: [
      // Use array of translation keys
      "experience.descriptions.h2compute.desc1",
      "experience.descriptions.h2compute.desc2",
      "experience.descriptions.h2compute.desc3",
      "experience.descriptions.h2compute.desc4",
      "experience.descriptions.h2compute.desc5",
      "experience.descriptions.h2compute.desc6",
    ],
  },
  {
    company: "EatMe",
    companyLogo: "EM",
    companyColor: "bg-orange-800",
    positionKey: "experience.positions.eatme",
    period: "Jul 2021 - Jul 2022",
    descriptionKeys: [
      "experience.descriptions.eatme.desc1",
      "experience.descriptions.eatme.desc2",
      "experience.descriptions.eatme.desc3",
      "experience.descriptions.eatme.desc4",
      "experience.descriptions.eatme.desc5",
    ],
  },
];
