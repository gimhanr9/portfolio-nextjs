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
import { ProjectCardProps } from "./project-card.types";

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
                <Badge key={tag} variant="secondary">
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
