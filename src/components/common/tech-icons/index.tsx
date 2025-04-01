import type React from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiJest,
  SiGithubactions,
  SiDocker,
  SiTailwindcss,
  SiFigma,
  SiPython,
  SiDjango,
  SiVuedotjs,
  SiAngular,
  SiFlutter,
  SiKubernetes,
  SiTensorflow,
  SiFirebase,
  SiGraphql,
  SiRedux,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiSass,
  SiGit,
  SiVercel,
  SiDotnet,
  SiNestjs,
} from "react-icons/si";
import { TechIconProps } from "./tech-icons.types";

// Map of icon identifiers to their corresponding components
export const techIconsMap: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  react: SiReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  nodejs: SiNodedotjs,
  express: SiExpress,
  redux: SiRedux,
  jest: SiJest,
  github: SiGithubactions,
  tailwind: SiTailwindcss,
  git: SiGit,
  vercel: SiVercel,
  netcore:SiDotnet,
  nestjs:SiNestjs,
  sqlserver:
};

const TechIcon = (props: TechIconProps) => {
  const IconComponent = techIconsMap[props.name?.toLowerCase()];

  if (!IconComponent) {
    // Fallback for missing icons
    return <span className={`inline-block ${props.className}`}>•</span>;
  }

  return <IconComponent className={props.className} />;
};

export default TechIcon;
