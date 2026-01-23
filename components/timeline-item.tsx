import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface TimelineItemProps {
  title: string;
  organization: string;
  period: string;
  description?: string;
  tags?: string[];
  href?: string;
}

export function TimelineItem({
  title,
  organization,
  period,
  description,
  tags,
  href,
}: TimelineItemProps) {
  return (
    <div className="group relative pl-8 pb-8 last:pb-0">
      {/* Timeline line */}
      <div className="absolute left-[7px] top-3 h-full w-px bg-border group-last:hidden" />
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background transition-colors group-hover:bg-primary" />
      
      <div className="space-y-1.5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          {href ? (
            <Link href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:underline">
              <h3>{title}</h3>
            </Link>
          ) : (
            <h3 className="font-semibold text-foreground">{title}</h3>
          )}
          <span className="text-sm text-muted-foreground">{period}</span>
        </div>
        <p className="text-sm font-medium text-primary">{organization}</p>
        {description && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
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
        )}
      </div>
    </div>
  );
}
