export interface SkillCarouselProps {
  skills: {
    title: string;
    icon: "CodeIcon" | "ServerIcon" | "DevOpsIcon" | string;
    description: string;
  }[];
}
