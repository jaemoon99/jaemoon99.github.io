"use client";

import React from "react"

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Image from "next/image";

export interface ProjectCardProps {
  slug?: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  period?: string;
  contribution?: number;
}

export function ProjectCard({
  slug,
  title,
  description,
  image,
  tags,
  liveUrl,
  githubUrl,
  period,
  contribution,
}: ProjectCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    if (slug) {
      router.push(`/projects/${slug}`);
    }
  };

  const handleExternalLink = (
    e: React.MouseEvent<HTMLButtonElement>,
    url: string
  ) => {
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card
      className="group overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 cursor-pointer h-full"
      onClick={handleCardClick}
      role={slug ? "link" : undefined}
      tabIndex={slug ? 0 : undefined}
      onKeyDown={(e) => {
        if (slug && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      {image && (
        <div className="relative aspect-video overflow-hidden bg-muted">
                      <Image
                      src={image || "/placeholder.svg"}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-500 scale-100 group-hover:scale-105"
                    />          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      )}
      <CardContent className="p-5">
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {title}
          </h3>
          <div className="flex gap-2">

          </div>
        </div>
        {(period || contribution) && (
          <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
            {period && <span>{period}</span>}
            {contribution !== undefined && (
              <>
                {period && <span className="text-border">|</span>}
                <span>기여도 {contribution}%</span>
              </>
            )}
          </div>
        )}
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs font-normal"
            >
              {tag}
            </Badge>
          ))}
        </div>
        {slug && (
          <div className="flex items-center gap-1 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            View Details
            <ArrowRight className="h-4 w-4" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
