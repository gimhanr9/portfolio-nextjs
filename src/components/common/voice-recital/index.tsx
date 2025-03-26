"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SpeakerIcon } from "@/lib/icons";
import { useToast } from "@/hooks/use-toast";
import { VoiceRecitalProps } from "./voice-recital.types";

const VoiceRecital = (props: VoiceRecitalProps) => {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Map language codes to Web Speech API voices
  const languageVoiceMap: Record<string, string> = {
    en: "en-US",
    es: "es-ES",
    fr: "fr-FR",
    de: "de-DE",
    zh: "zh-CN",
    ja: "ja-JP",
    ko: "ko-KR",
    ru: "ru-RU",
    pt: "pt-BR",
    it: "it-IT",
  };

  const playAudio = async () => {
    try {
      setIsLoading(true);

      // Check if the Web Speech API is supported
      if (!("speechSynthesis" in window)) {
        throw new Error("Your browser doesn't support text to speech.");
      }

      // If already playing, stop it
      if (isPlaying && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setIsLoading(false);
        return;
      }

      // Create utterance
      const utterance = new SpeechSynthesisUtterance(props.text);

      // Set language
      const langCode = languageVoiceMap[props.language] || "en-US";
      utterance.lang = langCode;

      // Get available voices
      let voices = window.speechSynthesis.getVoices();

      // If voices aren't loaded yet, wait for them
      if (voices?.length === 0) {
        await new Promise<void>((resolve) => {
          window.speechSynthesis.onvoiceschanged = () => {
            voices = window.speechSynthesis.getVoices();
            resolve();
          };
        });
      }

      // Find a voice for the selected language
      const voice = voices.find((v) => v.lang.includes(langCode.split("-")[0]));
      if (voice) {
        utterance.voice = voice;
      }

      // Set event handlers
      utterance.onstart = () => {
        setIsPlaying(true);
        setIsLoading(false);
      };

      utterance.onend = () => {
        setIsPlaying(false);
      };

      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event);
        setIsPlaying(false);
        setIsLoading(false);
        toast({
          title: "Error",
          description: "Failed to play audio. Please try again.",
          variant: "destructive",
        });
      };

      // Play the speech
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Voice recital error:", error);
      setIsLoading(false);
      setIsPlaying(false);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to play audio",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`rounded-full transition-colors ${
        isPlaying ? "text-primary" : ""
      }`}
      onClick={playAudio}
      disabled={isLoading}
      aria-label={isPlaying ? "Stop speaking" : "Listen to introduction"}
    >
      {isLoading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <SpeakerIcon className="h-5 w-5" />
      )}
    </Button>
  );
};

export default VoiceRecital;
