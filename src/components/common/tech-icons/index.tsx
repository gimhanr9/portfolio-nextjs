import type React from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJest,
  SiGithubactions,
  SiTailwindcss,
  SiRedux,
  SiJavascript,
  SiGit,
  SiVercel,
  SiDotnet,
  SiNestjs,
  SiAmazonwebservices,
  SiGooglecloud,
  SiNeo4J,
  SiMaterialdesign,
} from "react-icons/si";
import { FaInfinity } from "react-icons/fa";
import { DiMsqlServer } from "react-icons/di";

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
  redux: SiRedux,
  aws: SiAmazonwebservices,
  gcp: SiGooglecloud,
  cicd: FaInfinity,
  jest: SiJest,
  github: SiGithubactions,
  tailwind: SiTailwindcss,
  git: SiGit,
  vercel: SiVercel,
  netcore: SiDotnet,
  nestjs: SiNestjs,
  sqlserver: DiMsqlServer,
  neo4j: SiNeo4J,
  materialui: SiMaterialdesign,
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
