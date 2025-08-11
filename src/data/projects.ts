export interface Project {
  id: number;
  key: string;
  showGithub: boolean;
  githubUrl: string;
}

export const projects: Project[] = [
  {
    id: 1,
    key: "portfolio",
    showGithub: true,
    githubUrl: "https://github.com/gimhanr9/portfolio-nextjs",
  },
  {
    id: 2,
    key: "loyalty",
    showGithub: true,
    githubUrl: "https://github.com/gimhanr9/react-loyalty-frontend",
  },
  {
    id: 3,
    key: "doorbell",
    showGithub: true,
    githubUrl: "https://github.com/gimhanr9/doorbell_app_flutter",
  },
  {
    id: 4,
    key: "shopping-api",
    showGithub: true,
    githubUrl: "https://github.com/gimhanr9/shopping-api",
  },
  {
    id: 5,
    key: "flutter-shopping",
    showGithub: true,
    githubUrl: "https://github.com/gimhanr9/lookgood_flutter",
  },
  {
    id: 6,
    key: "android-shopping",
    showGithub: true,
    githubUrl: "https://github.com/gimhanr9/lookgood-android",
  },
  {
    id: 7,
    key: "student-enquiry",
    showGithub: true,
    githubUrl: "https://github.com/gimhanr9/student-enquiry-management",
  },
];
