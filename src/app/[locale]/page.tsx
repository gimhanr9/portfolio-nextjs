"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AnimatedText from "@/components/common/animated-text";
import ProjectCard from "@/components/common/project-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TechStack from "@/components/common/tech-stack";
import { GithubIcon, LinkedinIcon, MailIcon, TwitterIcon } from "@/lib/icons";
import ContactSection from "@/components/common/contact-section";
import StatusBadges from "@/components/common/status-badges";
import ExperienceTimeline from "@/components/common/experience-timeline";
import EducationTimeline from "@/components/common/education-timeline";
import { useTranslations } from "next-intl";
import VoiceRecital from "@/components/common/voice-recital";
import { projects } from "@/data/projects";
import SkillCarousel from "@/components/common/skill-carousel";
import { siteConfig } from "@/config/site";

const Home = ({ params }: { params: { locale: string } }) => {
  const t = useTranslations();
  const locale = params.locale || "en";

  // Introduction text for voice recital
  const introText = `${t("hero.greeting")} ${t("hero.name")}. ${t(
    "hero.description"
  )}`;

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section
        id="home"
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-24 bg-gradient-to-b from-background to-background/80"
      >
        <div className="site-container">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge className="animate-fade-in bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300 border-teal-200 dark:border-teal-800">
                  {t("hero.badge")}
                </Badge>
                <h1 className="font-bold tracking-tighter">
                  <AnimatedText text={t("hero.greeting")} delay={0} />

                  {/* Add space between greeting and name */}
                  <div className="h-4"></div>

                  <span className="bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent">
                    <AnimatedText text={t("hero.name")} delay={0.3} />
                  </span>
                </h1>
                <div className="flex items-center gap-2">
                  <p className="max-w-[600px] text-sm md:text-base text-muted-foreground">
                    <AnimatedText text={t("hero.description")} delay={0.6} />
                  </p>
                  {/* Add speaker icon after description */}
                  <VoiceRecital text={introText} language={locale} />
                </div>
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
                  {t("buttons.viewWork")}
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
                  {t("buttons.getInTouch")}
                </Button>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <Link
                  href={siteConfig.urls.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <GithubIcon className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link
                  href={siteConfig.urls.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <LinkedinIcon className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link
                  href={siteConfig.urls.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <TwitterIcon className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                </Link>
                <Link href={`mailto:${siteConfig.contactEmail}`}>
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
      <section id="about">
        <div className="site-container">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading">{t("about.title")}</h2>
            <p className="max-w-[85%] text-muted-foreground">
              {t("about.description")}
            </p>
          </div>

          <div className="mt-12">
            <Tabs defaultValue="skills" className="mx-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="skills">{t("tabs.skills")}</TabsTrigger>
                <TabsTrigger value="experience">
                  {t("tabs.experience")}
                </TabsTrigger>
                <TabsTrigger value="education">
                  {t("tabs.education")}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="skills" className="mt-6 space-y-6">
                {/* Skill Carousel for the cards */}
                <SkillCarousel
                  skills={[
                    {
                      title: "Frontend Development",
                      icon: "CodeIcon",
                      description: "React, Next.js, TypeScript, Tailwind CSS",
                    },
                    {
                      title: "Backend Development",
                      icon: "ServerIcon",
                      description: "Node.js, Express, MongoDB, PostgreSQL",
                    },
                    {
                      title: "DevOps & Testing",
                      icon: "DevOpsIcon",
                      description: "CI/CD, Docker, Jest, GitHub Actions",
                    },
                    {
                      title: "Mobile Development",
                      icon: "CodeIcon",
                      description: "React Native, Flutter, iOS, Android",
                    },
                    {
                      title: "UI/UX Design",
                      icon: "CodeIcon",
                      description: "Figma, Adobe XD, Responsive Design",
                    },
                  ]}
                />
                <TechStack />
              </TabsContent>
              <TabsContent value="experience" className="mt-6 space-y-6">
                <ExperienceTimeline />
              </TabsContent>
              <TabsContent value="education" className="mt-6 space-y-6">
                <EducationTimeline />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="bg-muted/50">
        <div className="site-container">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading">{t("projects.title")}</h2>
            <p className="max-w-[85%] text-muted-foreground">
              {t("projects.description")}
            </p>
          </div>

          <div className="mx-auto grid grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:gap-12">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                tags={project.tags}
                link={project.link}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <Link href="/projects">
              <Button variant="outline" className="group">
                {t("projects.viewAll")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <ContactSection />
      </section>
    </main>
  );
};

export default Home;
