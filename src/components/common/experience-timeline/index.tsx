import { Badge } from "@/components/ui/badge";
import { ExperienceItem } from "./experience-timeline.types";

const experiences: ExperienceItem[] = [
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

const ExperienceTimeline = () => {
  return (
    <div className="space-y-12">
      {experiences.map((exp, index) => (
        <div key={index} className="relative pl-12">
          {/* Timeline connector */}
          {index < experiences.length - 1 && (
            <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800"></div>
          )}

          {/* Company logo */}
          <div
            className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full ${exp.companyColor} text-white font-bold`}
          >
            {exp.companyLogo}
          </div>

          {/* Content */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-primary">{exp.company}</h3>
              <Badge variant="outline" className="mt-1 sm:mt-0 w-fit">
                {exp.period}
              </Badge>
            </div>

            <h4 className="text-lg font-medium mb-3">{exp.position}</h4>

            <div className="space-y-2">
              {exp.descriptions.map((desc, i) => (
                <p key={i} className="text-muted-foreground">
                  {desc}
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
