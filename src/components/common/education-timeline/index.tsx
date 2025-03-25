import { Badge } from "@/components/ui/badge";
import { EducationItem } from "./education-timeline.types";

const educations: EducationItem[] = [
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

const EducationTimeline = () => {
  return (
    <div className="space-y-12">
      {educations.map((edu, index) => (
        <div key={index} className="relative pl-12">
          {/* Timeline connector */}
          {index < educations.length - 1 && (
            <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800"></div>
          )}

          {/* Institution logo */}
          <div
            className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full ${edu.institutionColor} text-white font-bold`}
          >
            {edu.institutionLogo}
          </div>

          {/* Content */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-primary">
                {edu.institution}
              </h3>
              <Badge variant="outline" className="mt-1 sm:mt-0 w-fit">
                {edu.period}
              </Badge>
            </div>

            <h4 className="text-lg font-medium mb-3">{edu.degree}</h4>

            <div className="space-y-2">
              {edu.descriptions.map((desc, i) => (
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

export default EducationTimeline;
