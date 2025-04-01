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
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  jest: SiJest,
  github: SiGithubactions,
  docker: SiDocker,
  tailwind: SiTailwindcss,
  figma: SiFigma,
  python: SiPython,
  django: SiDjango,
  vue: SiVuedotjs,
  angular: SiAngular,
  flutter: SiFlutter,
  kubernetes: SiKubernetes,
  tensorflow: SiTensorflow,
  firebase: SiFirebase,
  graphql: SiGraphql,
  redux: SiRedux,
  html: SiHtml5,
  css: SiCss3,
  sass: SiSass,
  git: SiGit,
  vercel: SiVercel,
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
