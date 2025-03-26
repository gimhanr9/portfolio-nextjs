import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/common/project-card";

export const metadata = {
  title: "Projects | Your Name",
  description:
    "Explore my portfolio of full stack development projects with CI/CD pipelines and comprehensive testing.",
};

const ProjectsPage = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce platform with React, Node.js, and MongoDB. Features CI/CD pipeline with GitHub Actions and Jest testing.",
      tags: ["React", "Node.js", "MongoDB", "Jest", "CI/CD"],
      image: "/placeholder.svg?height=400&width=600",
      link: "/projects/ecommerce",
    },
    {
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates. Includes comprehensive test coverage with Jest and React Testing Library.",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Jest", "GitHub Actions"],
      image: "/placeholder.svg?height=400&width=600",
      link: "/projects/task-manager",
    },
    {
      title: "Analytics Dashboard",
      description:
        "A data visualization dashboard with real-time analytics. Built with React, D3.js, and a Node.js backend.",
      tags: ["React", "D3.js", "Node.js", "Express", "Docker"],
      image: "/placeholder.svg?height=400&width=600",
      link: "/projects/analytics",
    },
    {
      title: "DevOps Toolkit",
      description:
        "A collection of tools for automating development workflows. Includes CI/CD templates, testing frameworks, and deployment scripts.",
      tags: ["GitHub Actions", "Docker", "Jest", "Terraform", "AWS"],
      image: "/placeholder.svg?height=400&width=600",
      link: "/projects/devops-toolkit",
    },
    {
      title: "Personal Blog",
      description:
        "A blog built with Next.js and MDX. Features syntax highlighting, responsive design, and SEO optimization.",
      tags: ["Next.js", "MDX", "Tailwind CSS", "Vercel"],
      image: "/placeholder.svg?height=400&width=600",
      link: "/projects/blog",
    },
    {
      title: "Weather App",
      description:
        "A weather application with location-based forecasts. Built with React and OpenWeatherMap API.",
      tags: ["React", "API Integration", "Geolocation", "Jest"],
      image: "/placeholder.svg?height=400&width=600",
      link: "/projects/weather-app",
    },
  ];

  return (
    <main className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mb-12 flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to Home</span>
          </Button>
        </Link>
        <h1 className="text-3xl font-bold md:text-4xl">My Projects</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            tags={project.tags}
            image={project.image}
            link={project.link}
          />
        ))}
      </div>
    </main>
  );
};

export default ProjectsPage;
