import { profileData } from "@/lib/profile-data";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card mt-20">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground text-center">
            © 2024 {profileData.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
