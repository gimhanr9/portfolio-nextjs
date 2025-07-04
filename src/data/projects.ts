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
    title: "Loyalty App",
    description:
      "A full-stack loyalty application with React, Golang, and SQLite. Integrated with Square API for loyalty point and customer processing.",
    tags: ["React", "Golang", "SQLite", "Square API"],
    link: "/projects/go-loyalty",
  },
  {
    id: 2,
    title: "Contactless Doorbell",
    description:
      "A system consisting of a mobile application, Flask REST API and a Raspberry Pi device acting as the doorbell specializing in masked face recognition.",
    tags: [
      "Flask",
      "Tensorflow",
      "Keras",
      "Flutter",
      "Firebase",
      "OneSignal",
      "SendGrid",
      "JWT",
      "GCP",
      "Masked face recognition",
      "Image processing",
    ],
    link: "/projects/contactless-doorbell",
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
