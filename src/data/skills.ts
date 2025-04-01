import { SkillCategory } from "@/components/common/skill-carousel/skill-carousel.types";
import { SiReact } from "react-icons/si";

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
      "Javascript",
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
  { name: "TypeScript", icon: "typescript" },
  { name: "Node.js", icon: "nodejs" },
  { name: "Express", icon: "express" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "Jest", icon: "jest" },
  { name: "GitHub Actions", icon: "github" },
  { name: "Docker", icon: "docker" },
  { name: "AWS", icon: "aws" },
  { name: "Tailwind CSS", icon: "tailwind" },
  { name: "React Native", icon: "react" },
  { name: "Figma", icon: "figma" },
];
