import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LanguageSwitcherProps {
  variant?: "navbar" | "mobile";
}

export function LanguageSwitcher({ variant = "navbar" }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  if (variant === "mobile") {
    return (
      <div className="flex items-center gap-2 px-4 py-2">
        <Globe className="w-4 h-4 text-muted-foreground" />
        <button
          onClick={() => setLanguage("en")}
          className={`text-sm font-medium transition-colors ${
            language === "en" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          EN
        </button>
        <span className="text-muted-foreground">/</span>
        <button
          onClick={() => setLanguage("fr")}
          className={`text-sm font-medium transition-colors ${
            language === "fr" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          FR
        </button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1.5 text-sm font-medium text-primary-foreground/70 hover:text-primary-foreground transition-colors">
          <Globe className="w-4 h-4" />
          <span>{language.toUpperCase()}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setLanguage("en")}
          className={`cursor-pointer ${language === "en" ? "bg-accent" : ""}`}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("fr")}
          className={`cursor-pointer ${language === "fr" ? "bg-accent" : ""}`}
        >
          Français
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
