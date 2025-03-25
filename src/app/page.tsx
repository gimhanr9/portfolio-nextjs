"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AnimatedText from "@/components/common/animated-text";
import ProjectCard from "@/components/project-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TechStack from "@/components/common/tech-stack";
import {
  CheckIcon,
  CICDIcon,
  CodeIcon,
  DevOpsIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  ServerIcon,
  TwitterIcon,
} from "@/lib/icons";
import ContactSection from "@/components/common/contact-section";
import StatusBadges from "@/components/common/status-badges";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section
        id="home"
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-16 bg-gradient-to-b from-background to-background/80"
      >
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge variant="outline" className="animate-fade-in">
                  Full Stack Developer
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  <AnimatedText text="Hi there! I'm" delay={0} />
                  <br />
                  <span className="bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent">
                    <AnimatedText text="Your Name" delay={0.3} />
                  </span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  <AnimatedText
                    text="Building robust, scalable applications with modern technologies. Passionate about CI/CD, testing, and delivering exceptional user experiences."
                    delay={0.6}
                  />
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  className="group"
                  onClick={() =>
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Get In Touch
                </Button>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <GithubIcon className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <LinkedinIcon className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <TwitterIcon className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                </Link>
                <Link href="mailto:your.email@example.com">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MailIcon className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative aspect-square overflow-hidden rounded-full border border-border bg-muted p-2">
                <div className="animate-morph absolute inset-0 z-10 rounded-full bg-gradient-to-r from-teal-500 to-purple-500 opacity-20"></div>
                <div className="relative z-20 h-full w-full overflow-hidden rounded-full">
                  <Image
                    src="/images/profile.jpg"
                    alt="Developer Portrait"
                    width={600}
                    height={600}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Status Badges */}
          <StatusBadges />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              About Me
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              I'm a full stack developer with expertise in building modern web
              applications. My focus is on creating scalable, maintainable code
              with robust CI/CD pipelines and comprehensive testing.
            </p>
          </div>

          <div className="mt-16">
            <Tabs defaultValue="skills" className="mx-auto max-w-4xl">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
              </TabsList>
              <TabsContent value="skills" className="mt-6 space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
                    <div className="rounded-full bg-primary/10 p-3">
                      <CodeIcon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Frontend Development</h3>
                    <p className="text-center text-sm text-muted-foreground">
                      React, Next.js, TypeScript, Tailwind CSS
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
                    <div className="rounded-full bg-primary/10 p-3">
                      <ServerIcon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Backend Development</h3>
                    <p className="text-center text-sm text-muted-foreground">
                      Node.js, Express, MongoDB, PostgreSQL
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
                    <div className="rounded-full bg-primary/10 p-3">
                      <DevOpsIcon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">DevOps & Testing</h3>
                    <p className="text-center text-sm text-muted-foreground">
                      CI/CD, Docker, Jest, GitHub Actions
                    </p>
                  </div>
                </div>
                <TechStack />
              </TabsContent>
              <TabsContent value="experience" className="mt-6 space-y-6">
                <div className="space-y-8">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">
                        Senior Full Stack Developer
                      </h3>
                      <Badge>2021 - Present</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Company Name
                    </p>
                    <p className="text-sm">
                      Led development of scalable web applications using React,
                      Node.js, and AWS. Implemented CI/CD pipelines with GitHub
                      Actions and Jest testing.
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">
                        Full Stack Developer
                      </h3>
                      <Badge>2018 - 2021</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Previous Company
                    </p>
                    <p className="text-sm">
                      Developed and maintained web applications using React,
                      Express, and MongoDB. Implemented automated testing with
                      Jest and Cypress.
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="education" className="mt-6 space-y-6">
                <div className="space-y-8">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">
                        Master of Computer Science
                      </h3>
                      <Badge>2016 - 2018</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      University Name
                    </p>
                    <p className="text-sm">
                      Specialized in Software Engineering and Distributed
                      Systems.
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">
                        Bachelor of Computer Science
                      </h3>
                      <Badge>2012 - 2016</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      University Name
                    </p>
                    <p className="text-sm">
                      Graduated with honors. Focused on algorithms and web
                      development.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-16 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Featured Projects
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Check out some of my recent work. Each project includes CI/CD
              pipelines and comprehensive test coverage.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:gap-12">
            <ProjectCard
              title="E-Commerce Platform"
              description="A full-stack e-commerce platform with React, Node.js, and MongoDB. Features CI/CD pipeline with GitHub Actions and Jest testing."
              tags={["React", "Node.js", "MongoDB", "Jest", "CI/CD"]}
              image="/images/projects/ecommerce.jpg"
              link="/projects/ecommerce"
            />
            <ProjectCard
              title="Task Management App"
              description="A collaborative task management application with real-time updates. Includes comprehensive test coverage with Jest and React Testing Library."
              tags={[
                "Next.js",
                "TypeScript",
                "PostgreSQL",
                "Jest",
                "GitHub Actions",
              ]}
              image="/images/projects/task-manager.jpg"
              link="/projects/task-manager"
            />
            <ProjectCard
              title="Analytics Dashboard"
              description="A data visualization dashboard with real-time analytics. Built with React, D3.js, and a Node.js backend."
              tags={["React", "D3.js", "Node.js", "Express", "Docker"]}
              image="/images/projects/analytics.jpg"
              link="/projects/analytics"
            />
            <ProjectCard
              title="DevOps Toolkit"
              description="A collection of tools for automating development workflows. Includes CI/CD templates, testing frameworks, and deployment scripts."
              tags={["GitHub Actions", "Docker", "Jest", "Terraform", "AWS"]}
              image="/images/projects/devops.jpg"
              link="/projects/devops-toolkit"
            />
          </div>

          <div className="flex justify-center">
            <Link href="/projects">
              <Button variant="outline" className="group">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CI/CD Section */}
      <section id="cicd" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              My CI/CD Approach
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              I believe in automating everything. Here's how I implement CI/CD
              in my projects.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <CICDIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Continuous Integration</h3>
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Automated testing with Jest and React Testing Library
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Code quality checks with ESLint and Prettier
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Type checking with TypeScript
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Pull request reviews and automated checks
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <CICDIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Continuous Deployment</h3>
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Automated deployments to Vercel
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Preview deployments for pull requests
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Environment-specific configurations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Rollback capabilities for failed deployments
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <Link href="/cicd">
                <Button variant="outline">
                  Learn More About My CI/CD Process
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Get In Touch
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Interested in working together? Feel free to reach out.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-2xl">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <ContactSection />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
