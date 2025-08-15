"use client";

import { useEffect, useState, useTransition } from "react";
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
import { usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";

const LanguageSelector = () => {
  const [currentLanguage, setCurrentLanguage] =
    useState<LanguageSelectorType>();

  const [languages, setLanguages] = useState<Array<LanguageSelectorType>>([]);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();

  useEffect(() => {
    let locales = siteConfig.locales;
    if (locales?.length > 0) {
      setLanguages(siteConfig.locales);

      setCurrentLanguage(
        locales.find((x) => x.code === locale) ??
          locales.find((x) => x.code === siteConfig.defaultLocale) ??
          locales[0]
      );
    }
  }, [locale]);

  const handleLanguageChange = (language: LanguageSelectorType) => {
    if (language.code === currentLanguage?.code) return;

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: language.code }
      );
    });

    setCurrentLanguage(language);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isPending}>
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
            onClick={() => handleLanguageChange(language)}
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
