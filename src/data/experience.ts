import { ExperienceItem } from "@/components/common/experience-timeline/experience-timeline.types";

export const experience: ExperienceItem[] = [
  {
    company: "Oracle",
    companyLogo: "O",
    companyColor: "bg-red-500",
    position: "Member of Technical Staff - 1",
    period: "Jul 2024 - Present",
    descriptions: [
      "Working in the Database as a Service Control Plane team for Oracle Cloud Infrastructure.",
      "Developing and maintaining RESTful APIs for cloud database management.",
      "Implementing CI/CD pipelines for automated testing and deployment.",
    ],
  },
  {
    company: "Averlon",
    companyLogo: "A",
    companyColor: "bg-indigo-500",
    position: "Software Developer Intern",
    period: "Sept 2023 - Feb 2024",
    descriptions: [
      "Added support for the discoverability of Microsoft Azure assets utilizing Go and Gremlin.",
      "Extended support for Azure for reachability analysis of assets for cloud security posture management.",
      "Developed automated testing frameworks for ensuring code quality.",
    ],
  },
  {
    company: "Previous Company",
    companyLogo: "P",
    companyColor: "bg-emerald-500",
    position: "Junior Developer",
    period: "Jan 2023 - Aug 2023",
    descriptions: [
      "Worked on front-end development using React and TypeScript.",
      "Collaborated with the design team to implement responsive UI components.",
      "Participated in code reviews and agile development processes.",
    ],
  },
];
