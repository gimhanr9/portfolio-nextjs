import { EducationItem } from "@/components/common/education-timeline/education-timeline.types";

export const education: EducationItem[] = [
  {
    institution: "University of Staffordshire", // Institution name stays the same
    institutionLogo: "S",
    institutionColor: "bg-red-500",
    degreeKey: "education.degrees.staffordshire", // Use translation key
    period: "2019 - 2022", // Period stays the same
    descriptions: [], // Descriptions stay empty (or add translation keys if needed)
  },
  {
    institution: "St. Nicholas' Int'l College",
    institutionLogo: "SN",
    institutionColor: "bg-blue-500",
    degreeKey: "education.degrees.stNicholas", // Use translation key
    period: "2003 - 2018",
    descriptions: [],
  },
];
