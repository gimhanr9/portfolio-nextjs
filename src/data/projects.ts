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
    title: "Portfolio Website",
    description:
      "A website showcasing my projects, skills, and experiences. Built with Next.js, TypeScript, and Tailwind CSS. Includes CI/CD pipeline with Github Actions for automated testing and deployment. Integrates with SonarQube for code quality analysis.",
    tags: [
      "Next.js",
      "Typescript",
      "Jest",
      "Tailwind CSS",
      "SonarQube",
      "GitHub Actions",
      "CI/CD",
      "Vercel",
    ],
    link: "/projects/go-loyalty",
  },
  {
    id: 2,
    title: "Loyalty App",
    description:
      "A full-stack loyalty application with React, Golang, and SQLite. Integrated with Square API for loyalty point and customer processing.",
    tags: ["React", "Golang", "SQLite", "Square API"],
    link: "/projects/go-loyalty",
  },
  {
    id: 3,
    title: "Contactless Doorbell With Masked Face Recognition",
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
    id: 4,
    title: "Shopping API",
    description:
      "An API built with MongoDB, Express, and Node.js for managing shopping lists and product inventories. Features include user authentication and real-time updates.",
    tags: ["Node.js", "Express", "MongoDB", "SendGrid", "JWT"],
    link: "/projects/shopping-api",
  },
  {
    id: 5,
    title: "Flutter Shopping Application",
    description:
      "A flutter ecommerce mobile application that includes various features including Firebase auth and forgot password, cart, purchase rating and review, view and ask product related questions from seller, read product ratings and reviews, product variants and stock management.",
    tags: ["Flutter", "Dart", "Firebase"],
    link: "/projects/flutter-shopping",
  },

  {
    id: 6,
    title: "Flutter Shopping Application",
    description:
      "An Android ecommerce mobile application developed using the MVVM architecture equipped with an admin login where products can be added while also replying to customer queries. This is a complete ecommerce application equipped with Firebase authentication.",
    tags: ["Android", "Java", "Firebase", "MVVM", "Navigation component"],
    link: "/projects/flutter-shopping",
  },

  {
    id: 7,
    title: "Student Enquiry Management System",
    description:
      "A student enquiry management system built using C++ and data structures to enable an university to maintain and update each enquiry from the time it is entered until it is resolved.",
    tags: ["C++", "Data structures"],
    link: "/projects/flutter-shopping",
  },
];
