import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  name: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
}

const levelColors = {
  beginner: "bg-secondary text-secondary-foreground",
  intermediate: "bg-primary/10 text-primary border-primary/20",
  advanced: "bg-primary/20 text-primary border-primary/30",
  expert: "bg-primary text-primary-foreground",
};

export function SkillBadge({ name, level = "intermediate" }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium transition-transform hover:scale-105",
        levelColors[level]
      )}
    >
      {name}
    </span>
  );
}
