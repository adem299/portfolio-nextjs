import { Heart } from "lucide-react";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-foreground-muted">
            <span>© {new Date().getFullYear()} Ade Mulyana. Built with</span>
            <Heart className="w-3.5 h-3.5 text-accent-purple fill-accent-purple" />
            <span>& Next.js</span>
          </div>

          <SocialLinks variant="icon-only" />
        </div>
      </div>
    </footer>
  );
}
