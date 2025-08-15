export interface SkillCategory {
  id: number;
  titleKey: string;
  icon: string;
  skills: string[];
}
export interface SkillCarouselProps {
  skills: Array<SkillCategory>;
}
