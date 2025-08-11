"use client";

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
import { ProjectCardProps } from "./project-card.types";

const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

// Define tag colors for consistency
const colorPalette = [
  "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
  "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
  "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300",
];

// Get consistent color for each tag
const getTagColor = (tag: string): string => {
  const hash = hashString(tag.toLowerCase());
  return colorPalette[hash % colorPalette.length];
};

// Default color for tags not in the list
const defaultTagColor =
  "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";

const ProjectCard = (props: ProjectCardProps) => {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Link href={props.link} className="block h-full">
        <Card className="h-full overflow-hidden border-2 hover:border-primary/50 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">{props.title}</CardTitle>
            <CardDescription className="mt-2">
              {props.description}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <div className="flex flex-wrap gap-2">
              {props.tags.map((tag) => (
                <Badge key={tag} className={getTagColor(tag)}>
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
