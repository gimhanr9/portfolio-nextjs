"use client";

import { useEffect, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LanguageSelectorType } from "./language-selector.types";
import { siteConfig } from "@/config/site";

const LanguageSelector = () => {
  const [currentLanguage, setCurrentLanguage] =
    useState<LanguageSelectorType>();

  const [languages, setLanguages] = useState<Array<LanguageSelectorType>>([]);

  useEffect(() => {
    let locales = siteConfig.locales;
    if (locales.length > 0) {
      setLanguages(siteConfig.locales);
      setCurrentLanguage(
        locales.find((x) => x.code === siteConfig.defaultLocale) ?? locales[0]
      );
    }
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 px-2"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline-block">
            {currentLanguage?.code.toUpperCase()}
          </span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages?.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setCurrentLanguage(language)}
            className="flex items-center justify-between"
          >
            <span>
              {language.flag} {language.name}
            </span>
            {currentLanguage?.code === language.code && (
              <Check className="h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
