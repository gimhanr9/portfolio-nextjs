import { EducationItem } from "@/components/common/education-timeline/education-timeline.types";

export const education: EducationItem[] = [
  {
    institution: "University Name",
    institutionLogo: "U",
    institutionColor: "bg-blue-500",
    degree: "Master of Computer Science",
    period: "2016 - 2018",
    descriptions: [
      "Specialized in Software Engineering and Distributed Systems.",
      "Graduated with distinction, GPA: 3.8/4.0",
      "Thesis: 'Optimizing Microservice Architecture for Cloud Deployments'",
    ],
  },
  {
    institution: "University Name",
    institutionLogo: "U",
    institutionColor: "bg-blue-500",
    degree: "Bachelor of Computer Science",
    period: "2012 - 2016",
    descriptions: [
      "Graduated with honors. Focused on algorithms and web development.",
      "Participated in ACM programming competitions.",
      "Completed capstone project on real-time data visualization systems.",
    ],
  },
];
