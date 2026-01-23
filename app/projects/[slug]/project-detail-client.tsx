"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Github,
  Users,
  Calendar,
  ExternalLink,
  Network,
  Database,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/footer";
import {
  TroubleshootingItem,
  type TroubleshootingItemProps,
} from "@/components/troubleshooting-item";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export interface ProjectDetail {
  slug: string;
  title: string;
  overview: string;
  reason?: string;
  period: string;
  teamSize: string;
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  architecture?: string;
  erd?: string;
  techStack: {
    name: string;
    reason: string;
  }[];
  responsibilities: {
    title: string;
    description: string;
    links?: {
      name: string;
      url: string;
    }[];
  }[];
  troubleshooting: TroubleshootingItemProps[];
}

interface ProjectDetailClientProps {
  project: ProjectDetail;
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string>("");

  // ✅ 여기 값만 바꾸면 모달 이미지 “실제 표시 크기”가 바뀜
  const [modalW] = useState<number>(1200); // 모달 가로(px)
  const [modalH] = useState<number>(850);  // 모달 세로(px)

  const openModal = (image: string, title: string) => {
    setModalImage(image);
    setModalTitle(title);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
          <div className="mx-auto max-w-5xl px-6 py-4">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-6 py-12">
          {/* Hero */}
          <div className="mb-12">
            {project.image && (
              <div className="mb-8 rounded-2xl overflow-hidden border border-border/50 shadow-lg aspect-video">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={700}
                  height={400}
                  className="w-full h-full object-cover scale-100"
                />
              </div>
            )}

            <h1 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
              {project.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {project.period}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                {project.teamSize}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 mb-8">
              {project.githubUrl && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      variant="outline"
                      size="icon"
                      className="bg-transparent hover:brightness-90 transition-transform hover:scale-105"
                    >
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>GitHub</p>
                  </TooltipContent>
                </Tooltip>
              )}

              {project.liveUrl && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      variant="outline"
                      size="icon"
                      className="bg-transparent hover:brightness-90 transition-transform hover:scale-105"
                    >
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Service Link</p>
                  </TooltipContent>
                </Tooltip>
              )}

              {project.architecture && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-transparent hover:brightness-90 transition-transform hover:scale-105"
                      onClick={() =>
                        openModal(project.architecture!, "Architecture")
                      }
                    >
                      <Network className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Architecture</p>
                  </TooltipContent>
                </Tooltip>
              )}

              {project.erd && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-transparent hover:brightness-90 transition-transform hover:scale-105"
                      onClick={() => openModal(project.erd!, "ERD")}
                    >
                      <Database className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>ERD</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>

            {/* Overview */}
            <p className="text-muted-foreground leading-relaxed">
              {project.overview}
            </p>
          </div>



          {/* Tech Stack */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Tech Stack & Selection Reasons
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.techStack.map((tech) => (
                <Card key={tech.name} className="border-border/50 bg-card">
                  <CardHeader className="pb-0">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Badge variant="secondary">{tech.name}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{tech.reason}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Responsibilities */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              My Responsibilities
            </h2>
            <div className="space-y-4">
              {project.responsibilities.map((resp, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-xl border border-border/50 bg-card"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-x-3 mb-1 flex-wrap">
                      <h3 className="font-medium text-foreground">
                        {resp.title}
                      </h3>

                      {resp.links && (
                        <div className="flex gap-x-1">
                          {resp.links.map((link, linkIndex) => (
                            <Button
                              key={linkIndex}
                              asChild
                              variant="outline"
                              size="sm"
                              className="gap-1.5 bg-transparent"
                            >
                              <Link
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="" />
                                {link.name}
                              </Link>
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {resp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Troubleshooting */}
          {project.troubleshooting.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Troubleshooting
              </h2>
              <div className="space-y-4">
                {project.troubleshooting.map((item, index) => (
                  <TroubleshootingItem key={index} {...item} />
                ))}
              </div>
            </section>
          )}
        </main>

        <Footer />

        {/* ✅ Single shared modal dialog (크기/중앙정렬 고정 버전) */}
        <Dialog
          open={!!modalImage}
          onOpenChange={(open) => {
            if (!open) setModalImage(null);
          }}
        >
          <DialogContent
            className="p-0 flex flex-col"
            style={{
              width: `${modalW}px`,
              height: `${modalH}px`,
              maxWidth: "95vw",
              maxHeight: "90vh",
            }}
          >
            <DialogHeader className="p-6 pb-3 shrink-0">
              <DialogTitle>{modalTitle}</DialogTitle>
            </DialogHeader>

            {modalImage && (
              <div className="flex-1 px-6 pb-6 flex items-center justify-center">
                {/* ✅ 이 박스가 ‘실제 이미지 표시 영역’이고, 여기 크기가 곧 화면에 보이는 크기 */}
                <div className="relative w-full h-full overflow-hidden rounded-md">
                  <Image
                    src={modalImage}
                    alt={modalTitle}
                    fill
                    className="object-contain"
                    sizes="95vw"
                    priority
                  />
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
