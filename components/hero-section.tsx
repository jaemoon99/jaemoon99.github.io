"use client";

import React from "react";
import { Mail, Phone, Github, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import Image from "next/image";

interface HeroSectionProps {
  name: string;
  title: string;
  description: string;
  phone: string;
  email: string;
  blog: string;
  github: string;
  profileImage?: string;
  profileImageDark?: string;
}

export function HeroSection({
  name,
  title,
  description,
  phone,
  email,
  blog,
  github,
  profileImage,
  profileImageDark,
}: HeroSectionProps) {
  const handleCopy = (text: string, isPhoneNumber: boolean = false) => {
    const textToCopy = isPhoneNumber ? text.replace(/-/g, "") : text;
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast.success("클립보드에 복사되었습니다.");
    });
  };

  const lightSrc = profileImage || "/placeholder.svg";
  const darkSrc = profileImageDark || lightSrc;

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center pt-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-50 items-start">
          {/* Text Content */}
          <div className="space-y-2 text-center lg:text-left lg:col-span-2">
            <h2 className="text-2xl font-light text-muted-foreground">
              &quot;Why&quot;를 쌓는 개발자
            </h2>

            <div className="flex flex-col lg:flex-row lg:items-end lg:gap-4 items-center justify-center lg:justify-start">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground text-balance">
                {name}
              </h1>
              <p className="text-2xl md:text-3xl text-muted-foreground font-medium">
                입니다.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-lg text-primary text-pretty">{title}</p>
              <p className="text-muted-foreground leading-relaxed text-pretty whitespace-pre-wrap">
                {description}
              </p>
            </div>

            {/* Contact Links */}
            <TooltipProvider>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-transparent transition-all"
                      onClick={() => handleCopy(phone, true)}
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{phone}</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-transparent transition-all"
                      onClick={() => handleCopy(email)}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{email}</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      variant="outline"
                      size="icon"
                      className="bg-transparent transition-all hover:shadow-md"
                    >
                      <Link href={blog} target="_blank" rel="noopener noreferrer">
                        <FileText className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Blog</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      variant="outline"
                      size="icon"
                      className="bg-transparent transition-all hover:shadow-md"
                    >
                      <Link href={github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>GitHub</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>

          {/* Profile Image (✅ hydration-safe) */}
          <div className="justify-self-end w-[180px]">
            <div className="rounded-lg p-0.5 border border-muted-foreground/20 dark:border-slate-700 shadow-sm">
              <div className="relative aspect-[3/4] rounded-md overflow-hidden bg-background">
                {/* Light */}
                <Image
                  src={lightSrc}
                  alt={`${name} 프로필 사진`}
                  fill
                  className="object-cover dark:hidden"
                  priority
                />
                {/* Dark */}
                <Image
                  src={darkSrc}
                  alt={`${name} 프로필 사진`}
                  fill
                  className="object-cover hidden dark:block"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}