"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

// Define tag colors for consistency
const tagColors: Record<string, string> = {
  React: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "Next.js": "bg-black text-white dark:bg-white dark:text-black",
  TypeScript: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Node: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "Node.js":
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Express: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  MongoDB: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  PostgreSQL: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Jest: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  "CI/CD":
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  Docker: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  AWS: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  "GitHub Actions":
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  Terraform:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  D3: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  "D3.js":
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  API: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  "API Integration":
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  Geolocation:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  MDX: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  "Tailwind CSS":
    "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
  Vercel: "bg-black text-white dark:bg-white dark:text-black",
};

// Default color for tags not in the list
const defaultTagColor =
  "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";

const ProjectCard = (props: ProjectCardProps) => {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Link href={props.link} className="block h-full">
        <Card className="h-full overflow-hidden">
          <div className="aspect-video w-full overflow-hidden">
            <Image
              src={props.image || "/placeholder.svg"}
              alt={props.title}
              width={600}
              height={400}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <CardHeader>
            <CardTitle>{props.title}</CardTitle>
            <CardDescription>{props.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <div className="flex flex-wrap gap-2">
              {props.tags.map((tag) => (
                <Badge key={tag} className={tagColors[tag] || defaultTagColor}>
                  {tag}
                </Badge>
              ))}
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
