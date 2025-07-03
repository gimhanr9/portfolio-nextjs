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
import { skillCategories } from "@/data/skills";

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
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-24"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20">
          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              >
                <div className="w-1 h-1 bg-primary/30 rounded-full"></div>
              </div>
            ))}
          </div>

          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-teal-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px] xl:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <Badge className="animate-fade-in bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300 border-teal-200 dark:border-teal-800 shadow-lg">
                  {t("hero.badge")}
                </Badge>

                <div className="space-y-2">
                  <h1 className="font-bold tracking-tighter">
                    <AnimatedText text={t("hero.greeting")} delay={0} />
                  </h1>

                  <h1 className="font-bold tracking-tighter">
                    <span className="bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent">
                      <AnimatedText text={t("hero.name")} delay={0.3} />
                    </span>
                  </h1>
                </div>

                <div className="flex items-start gap-3">
                  <p className="max-w-[600px] text-sm md:text-base text-muted-foreground leading-relaxed">
                    <AnimatedText text={t("hero.description")} delay={0.6} />
                  </p>
                  <VoiceRecital text={introText} language={locale} />
                </div>
              </div>

              <div className="flex flex-col gap-3 min-[400px]:flex-row">
                <Button
                  className="group shadow-lg hover:shadow-xl transition-all duration-300"
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
                  className="shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {t("buttons.getInTouch")}
                </Button>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-primary/10 transition-colors"
                  >
                    <GithubIcon className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-primary/10 transition-colors"
                  >
                    <LinkedinIcon className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-primary/10 transition-colors"
                  >
                    <TwitterIcon className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                </Link>
                <Link href="mailto:your.email@example.com">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-primary/10 transition-colors"
                  >
                    <MailIcon className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Enhanced Profile Image Container */}
            <div className="flex items-center justify-center">
              <div className="relative">
                {/* Outer glow effect */}
                <div className="absolute inset-0 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full bg-gradient-to-r from-teal-500/20 to-purple-500/20 blur-2xl animate-pulse"></div>

                {/* Main image container */}
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-72 lg:h-72 xl:w-80 xl:h-80">
                  {/* Rotating border */}
                  <div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 to-purple-500 p-1 animate-spin"
                    style={{ animationDuration: "8s" }}
                  >
                    <div className="w-full h-full rounded-full bg-background"></div>
                  </div>

                  {/* Image container */}
                  <div className="absolute inset-2 rounded-full border-2 border-border bg-muted overflow-hidden shadow-2xl">
                    {/* Animated gradient overlay */}
                    <div className="animate-morph absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 to-purple-500 opacity-10 z-10"></div>

                    {/* Image */}
                    <div className="relative w-full h-full">
                      <Image
                        src="/images/my_image.png"
                        alt="Developer Portrait"
                        fill
                        className="object-cover object-center"
                        priority
                        sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, (max-width: 1280px) 288px, 320px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Status Badges */}
          <div className="mt-16 sm:mt-20 md:mt-24">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent blur-xl"></div>
              <StatusBadges />
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
                {t("about.title")}
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
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
                  <SkillCarousel skills={skillCategories} />
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
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-16 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              {t("projects.title")}
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              {t("projects.description")}
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:gap-12">
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
              <Button variant="outline" className="group bg-transparent">
                {t("projects.viewAll")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24">
        <ContactSection />
      </section>
    </main>
  );
};

export default Home;
