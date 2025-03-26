export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: "CodeIcon",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend Development",
    icon: "ServerIcon",
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
  },
  {
    title: "DevOps & Testing",
    icon: "DevOpsIcon",
    skills: ["CI/CD", "Docker", "Jest", "GitHub Actions"],
  },
];

export const technologies = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "🔷" },
  { name: "Node.js", icon: "🟢" },
  { name: "Express", icon: "🚂" },
  { name: "MongoDB", icon: "🍃" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Jest", icon: "🃏" },
  { name: "GitHub Actions", icon: "🔄" },
  { name: "Docker", icon: "🐳" },
  { name: "AWS", icon: "☁️" },
  { name: "Tailwind CSS", icon: "🎨" },
];
