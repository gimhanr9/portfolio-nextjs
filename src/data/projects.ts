export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with React, Node.js, and MongoDB. Features CI/CD pipeline with GitHub Actions and Jest testing.",
    tags: ["React", "Node.js", "MongoDB", "Jest", "CI/CD"],
    link: "/projects/ecommerce",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates. Includes comprehensive test coverage with Jest and React Testing Library.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Jest", "GitHub Actions"],
    link: "/projects/task-manager",
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description:
      "A data visualization dashboard with real-time analytics. Built with React, D3.js, and a Node.js backend.",
    tags: ["React", "D3.js", "Node.js", "Express", "Docker"],
    link: "/projects/analytics",
  },
  {
    id: 4,
    title: "DevOps Toolkit",
    description:
      "A collection of tools for automating development workflows. Includes CI/CD templates, testing frameworks, and deployment scripts.",
    tags: ["GitHub Actions", "Docker", "Jest", "Terraform", "AWS"],
    link: "/projects/devops-toolkit",
  },
];
