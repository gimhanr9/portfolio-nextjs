export interface SkillCategory {
  id: number;
  title: string;
  icon: string;
  skills: string[];
}
export interface SkillCarouselProps {
  skills: Array<SkillCategory>;
}
