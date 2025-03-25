// Custom icon components for the portfolio
import type { SVGProps } from "react";

type IconProps = Readonly<SVGProps<SVGSVGElement>>;

export const CodeIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  );
};

export const ServerIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <line x1="6" y1="6" x2="6.01" y2="6"></line>
      <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
  );
};

export const DevOpsIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
    </svg>
  );
};

// Social Media Icons
export const GithubIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  );
};

export const LinkedinIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );
};

export const TwitterIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
    </svg>
  );
};

export const MailIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
  );
};

export const CheckIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 6 9 17l-5-5"></path>
    </svg>
  );
};

export const SonarQubeIcon = (props: IconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 512 512"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zm-85.6 325.8c-30.3-30.3-46.2-71-46.2-113.8 0-42.8 15.9-83.5 46.2-113.8 30.3-30.3 71-46.2 113.8-46.2 42.8 0 83.5 15.9 113.8 46.2 30.3 30.3 46.2 71 46.2 113.8 0 42.8-15.9 83.5-46.2 113.8-30.3 30.3-71 46.2-113.8 46.2-42.8 0-83.5-15.9-113.8-46.2z" />
      <path d="M256 128c-70.7 0-128 57.3-128 128s57.3 128 128 128 128-57.3 128-128-57.3-128-128-128zm0 224c-52.9 0-96-43.1-96-96s43.1-96 96-96 96 43.1 96 96-43.1 96-96 96z" />
    </svg>
  );
};

export const CICDIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
};

export const JestIcon = (props: IconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 398 439"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M334.2 218.8c-14.5-8-31.3-12.5-49.9-13.8l-.3-1.8c2.1-.8 4.2-1.7 6.2-2.7 11.5-5.6 20.3-13.2 26.2-22.8 6.3-10.3 9.7-22.3 9.7-35.5 0-13.2-3.4-25.2-9.7-35.5-5.9-9.6-14.7-17.2-26.2-22.8-11.5-5.6-25.1-8.5-40.1-8.5-15 0-28.6 2.9-40.1 8.5-11.5 5.6-20.3 13.2-26.2 22.8-6.3 10.3-9.7 22.3-9.7 35.5 0 13.2 3.4 25.2 9.7 35.5 5.9 9.6 14.7 17.2 26.2 22.8 2 1 4.1 1.9 6.2 2.7l-.3 1.8c-18.6 1.3-35.4 5.8-49.9 13.8-15.5 8.6-27.7 20.7-36 35.9-8.2 15-12.4 32.5-12.4 51.5 0 19 4.2 36.5 12.4 51.5 8.3 15.2 20.5 27.3 36 35.9 15.5 8.6 33.7 13 53.7 13 20 0 38.2-4.4 53.7-13 15.5-8.6 27.7-20.7 36-35.9 8.2-15 12.4-32.5 12.4-51.5 0-19-4.2-36.5-12.4-51.5-8.3-15.2-20.5-27.3-36-35.9zm-62.3-89.1c-8.7-4.3-19-6.5-30.7-6.5-11.7 0-22 2.2-30.7 6.5-8.6 4.2-15.3 10.1-19.8 17.5-4.6 7.5-7 16.1-7 25.5 0 9.4 2.4 18 7 25.5 4.5 7.4 11.2 13.3 19.8 17.5 8.7 4.3 19 6.5 30.7 6.5 11.7 0 22-2.2 30.7-6.5 8.6-4.2 15.3-10.1 19.8-17.5 4.6-7.5 7-16.1 7-25.5 0-9.4-2.4-18-7-25.5-4.5-7.4-11.2-13.3-19.8-17.5zm44.4 175.9c-6.8 12.4-16.8 22.2-29.4 29.3-12.6 7-27.3 10.6-43.7 10.6-16.4 0-31.1-3.6-43.7-10.6-12.6-7-22.6-16.9-29.4-29.3-6.8-12.4-10.3-26.8-10.3-42.8 0-16 3.5-30.4 10.3-42.8 6.8-12.4 16.8-22.2 29.4-29.3 12.6-7 27.3-10.6 43.7-10.6 16.4 0 31.1 3.6 43.7 10.6 12.6 7 22.6 16.9 29.4 29.3 6.8 12.4 10.3 26.8 10.3 42.8 0 16-3.5 30.4-10.3 42.8z"
        fill="currentColor"
      />
      <path
        d="M335.6 249.4c-9.9-18.1-24.4-32.4-43-42.5-18.6-10.1-40.5-15.4-64.4-15.4-23.9 0-45.8 5.3-64.4 15.4-18.6 10.1-33.1 24.4-43 42.5-9.9 18.1-15 39.1-15 62.3 0 23.2 5.1 44.2 15 62.3 9.9 18.1 24.4 32.4 43 42.5 18.6 10.1 40.5 15.4 64.4 15.4 23.9 0 45.8-5.3 64.4-15.4 18.6-10.1 33.1-24.4 43-42.5 9.9-18.1 15-39.1 15-62.3 0-23.2-5.1-44.2-15-62.3zm-107.4 155.4c-20 0-38.2-4.4-53.7-13-15.5-8.6-27.7-20.7-36-35.9-8.2-15-12.4-32.5-12.4-51.5 0-19 4.2-36.5 12.4-51.5 8.3-15.2 20.5-27.3 36-35.9 14.5-8 31.3-12.5 49.9-13.8l.3-1.8c-2.1-.8-4.2-1.7-6.2-2.7-11.5-5.6-20.3-13.2-26.2-22.8-6.3-10.3-9.7-22.3-9.7-35.5 0-13.2 3.4-25.2 9.7-35.5 5.9-9.6 14.7-17.2 26.2-22.8 11.5-5.6 25.1-8.5 40.1-8.5 15 0 28.6 2.9 40.1 8.5 11.5 5.6 20.3 13.2 26.2 22.8 6.3 10.3 9.7 22.3 9.7 35.5 0 13.2-3.4 25.2-9.7 35.5-5.9 9.6-14.7 17.2-26.2 22.8-2 1-4.1 1.9-6.2 2.7l.3 1.8c18.6 1.3 35.4 5.8 49.9 13.8 15.5 8.6 27.7 20.7 36 35.9 8.2 15 12.4 32.5 12.4 51.5 0 19-4.2 36.5-12.4 51.5-8.3 15.2-20.5 27.3-36 35.9-15.5 8.6-33.7 13-53.7 13z"
        fill="currentColor"
      />
    </svg>
  );
};
