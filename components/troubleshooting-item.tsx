"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle2,
  Expand,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useTheme } from "next-themes";
import CodeBlock from "@/components/code-block";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface TroubleshootingItemProps {
  title: string;
  problem: string;
  cause: string;
  solution: string;
  beforeCode?: string;
  afterCode?: string;
  beforeImage?: string;
  afterImage?: string;
  tags?: string[];
  beforeLanguage?: string;
  afterLanguage?: string;
}

export function TroubleshootingItem({
  title,
  problem,
  cause,
  solution,
  beforeCode,
  afterCode,
  beforeImage,
  afterImage,
  tags,
  beforeLanguage,
  afterLanguage,
}: TroubleshootingItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { resolvedTheme } = useTheme();
  const codeTheme = resolvedTheme === "dark" ? "dark" : "light";

  const [dialogContent, setDialogContent] = useState<{
    title: string;
    code: string;
    language: string;
  } | null>(null);

  const handleCodeBlockClick = (t: string, code: string, language: string) => {
    setDialogContent({ title: t, code, language });
  };

  return (
    <Card
      className={cn(
        "border-border/50 bg-card overflow-hidden transition-colors transition-shadow",
        !isExpanded && "cursor-pointer hover:bg-secondary/50",
      )}
      onClick={() => setIsExpanded((v) => !v)}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <AlertCircle className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-base font-semibold">{title}</CardTitle>
          </div>

          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2 ml-11">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isExpanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <CardContent className="pt-5 pb-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <h4 className="font-medium text-sm">Problem</h4>
              </div>
              <p className="text-sm text-muted-foreground pl-6">{problem}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-500">
                <AlertCircle className="h-4 w-4" />
                <h4 className="font-medium text-sm">Cause</h4>
              </div>
              <p className="text-sm text-muted-foreground pl-6">{cause}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-500">
                <CheckCircle2 className="h-4 w-4" />
                <h4 className="font-medium text-sm">Solution</h4>
              </div>
              <p className="text-sm text-muted-foreground pl-6">{solution}</p>
            </div>

            {(beforeCode || afterCode) && (
              <div className="grid gap-4 md:grid-cols-2">
                {beforeCode && (
                  <div className="space-y-2 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-destructive bg-destructive/10 px-2 py-1 rounded">
                        BEFORE
                      </span>
                    </div>

                    <div className="group relative rounded-lg border border-border bg-secondary/50 overflow-hidden">
                      <div
                        className="absolute top-2 right-2 z-10 p-1.5 rounded-md bg-background/50 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCodeBlockClick(
                            "Before",
                            beforeCode,
                            beforeLanguage || "tsx",
                          );
                        }}
                        role="button"
                        aria-label="Expand before code"
                      >
                        <Expand className="h-4 w-4 text-muted-foreground" />
                      </div>

                      <div
                        className="h-64 overflow-auto cursor-pointer p-4 pr-6"
                        onClick={() =>
                          handleCodeBlockClick(
                            "Before",
                            beforeCode,
                            beforeLanguage || "tsx",
                          )
                        }
                      >
                        <CodeBlock
                          code={beforeCode}
                          language={beforeLanguage || "tsx"}
                          theme={codeTheme}
                          showLineNumbers
                          customStyle={{
                            fontSize: "0.875rem",
                            overflow: "initial",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {afterCode && (
                  <div className="space-y-2 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-green-600 dark:text-green-500 bg-green-500/10 px-2 py-1 rounded">
                        AFTER
                      </span>
                    </div>

                    <div className="group relative rounded-lg border border-border bg-secondary/50 overflow-hidden">
                      <div
                        className="absolute top-2 right-2 z-10 p-1.5 rounded-md bg-background/50 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCodeBlockClick(
                            "After",
                            afterCode,
                            afterLanguage || "tsx",
                          );
                        }}
                        role="button"
                        aria-label="Expand after code"
                      >
                        <Expand className="h-4 w-4 text-muted-foreground" />
                      </div>

                      <div
                        className="h-64 overflow-auto cursor-pointer p-4 pr-6"
                        onClick={() =>
                          handleCodeBlockClick(
                            "After",
                            afterCode,
                            afterLanguage || "tsx",
                          )
                        }
                      >
                        <CodeBlock
                          code={afterCode}
                          language={afterLanguage || "tsx"}
                          theme={codeTheme}
                          showLineNumbers
                          customStyle={{
                            fontSize: "0.875rem",
                            overflow: "initial",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {(beforeImage || afterImage) && (
              <div className="grid gap-4 md:grid-cols-2">
                {beforeImage && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-destructive bg-destructive/10 px-2 py-1 rounded">
                        BEFORE
                      </span>
                    </div>
                    <div className="rounded-lg overflow-hidden border border-border">
                      <Image
                        src={beforeImage || "/placeholder.svg"}
                        alt="수정 전"
                        width={700}
                        height={400}
                      />
                    </div>
                  </div>
                )}

                {afterImage && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-green-600 dark:text-green-500 bg-green-500/10 px-2 py-1 rounded">
                        AFTER
                      </span>
                    </div>
                    <div className="rounded-lg overflow-hidden border border-border">
                      <Image
                        src={afterImage || "/placeholder.svg"}
                        alt="수정 후"
                        width={700}
                        height={400}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </div>
      </div>

      {dialogContent && (
        <Dialog
          open={!!dialogContent}
          onOpenChange={(open) => !open && setDialogContent(null)}
        >
          <DialogContent className="sm:max-w-6xl h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>{dialogContent.title} Code</DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-auto -mx-6 -mb-6 p-6">
              <CodeBlock
                code={dialogContent.code}
                language={dialogContent.language}
                theme={codeTheme}
                showLineNumbers
                customStyle={{
                  height: "100%",
                  fontSize: "0.875rem",
                  margin: 0,
                  overflow: "initial",
                }}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}
