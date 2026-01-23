import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface SkillCardProps {
  title: string;
  description: string;
  imagePath?: string;
}

export function SkillCard({ title, description, imagePath }: SkillCardProps) {
  return (
    <Card className="p-6 border-border/50 bg-card hover:shadow-lg transition-shadow h-full">
      <CardHeader className="flex flex-row items-center justify-between p-0 mb-2">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        {imagePath && (
          <Image
            src={imagePath}
            alt={`${title} logo`}
            width={32}
            height={32}
            className="object-contain"
          />
        )}
      </CardHeader>
      <CardContent className="p-0 text-sm text-muted-foreground leading-relaxed">
        {description}
      </CardContent>
    </Card>
  );
}
