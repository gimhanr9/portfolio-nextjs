import { SkillCategory } from "@/components/common/skill-carousel/skill-carousel.types";

export const skillCategories: SkillCategory[] = [
  {
    id: 1,
    title: "Frontend Development",
    icon: "CodeIcon",
    skills: [
      "React",
      "Next.js",
      "Redux",
      "TypeScript",
      "JavaScript",
      "Material UI",
      "Tailwind CSS",
    ],
  },
  {
    id: 2,
    title: "Backend Development",
    icon: "ServerIcon",
    skills: [
      ".Net Core",
      "NestJS",
      "Node.js",
      "Express",
      "Flask",
      "MongoDB",
      "SQL Server",
      "MySQL",
      "Neo4j",
    ],
  },
  {
    id: 3,
    title: "Cloud, DevOps & Testing",
    icon: "DevOpsIcon",
    skills: [
      "AWS",
      "GCP",
      "Firebase",
      "Git",
      "CI/CD",
      "Jest",
      "GitHub Actions",
    ],
  },
  {
    id: 4,
    title: "Mobile Development",
    icon: "CodeIcon",
    skills: ["Flutter", "Android"],
  },
  {
    id: 5,
    title: "AI/ML",
    icon: "CodeIcon",
    skills: ["Tensorflow", "Keras", "Neural Networks"],
  },
];

export const technologies = [
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextjs" },
  { name: "Redux", icon: "redux" },
  { name: "TypeScript", icon: "typescript" },
  { name: "JavaScript", icon: "javascript" },
  { name: ".Net Core", icon: "netcore" },
  { name: ".NestJS", icon: "nestjs" },
  { name: "SQL Server", icon: "sqlserver" },
  { name: "Neo4j", icon: "neo4j" },
  { name: "AWS", icon: "aws" },
  { name: "GCP", icon: "gcp" },
  { name: "Vercel", icon: "vercel" },
  { name: "Git", icon: "git" },
  { name: "Jest", icon: "jest" },
  { name: "GitHub Actions", icon: "github" },
  { name: "CI/CD", icon: "cicd" },
  { name: "Material UI", icon: "materialui" },
  { name: "Tailwind CSS", icon: "tailwind" },
];
