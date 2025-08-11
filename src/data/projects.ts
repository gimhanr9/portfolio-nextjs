export interface Project {
  id: number;
  key: string;
  link: string;
}

export const projects: Project[] = [
  {
    id: 1,
    key: "portfolio",
    link: "/projects/portfolio",
  },
  {
    id: 2,
    key: "loyalty",
    link: "/projects/go-loyalty",
  },
  {
    id: 3,
    key: "doorbell",
    link: "/projects/contactless-doorbell",
  },
  {
    id: 4,
    key: "shopping-api",
    link: "/projects/shopping-api",
  },
  {
    id: 5,
    key: "flutter-shopping",
    link: "/projects/flutter-shopping",
  },
  {
    id: 6,
    key: "android-shopping",
    link: "/projects/android-shopping",
  },
  {
    id: 7,
    key: "student-enquiry",
    link: "/projects/student-enquiry",
  },
];
