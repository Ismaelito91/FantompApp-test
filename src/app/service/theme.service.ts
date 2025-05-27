import { Injectable, computed, effect, signal } from "@angular/core";

export type ThemeType = "light" | "dark" | "system";

export interface AppTheme {
   name: ThemeType;
   icon: string;
}

@Injectable({
   providedIn: "root",
})
export class ThemeService {
   private appTheme = signal<ThemeType>("system");

   private themes: AppTheme[] = [
      { name: "system", icon: "desktop_windows" },
      { name: "light", icon: "light_mode" },
      { name: "dark", icon: "dark_mode" },
   ];

   selectedTheme = computed(() =>
      this.themes.find((t) => t.name === this.appTheme())
   );

   getThemes() {
      return this.themes;
   }

   setTheme(theme: ThemeType) {
      this.appTheme.set(theme);
      this.applyTheme(theme);
   }

   private applyTheme(theme: ThemeType) {
      const systemPrefersDark = window.matchMedia(
         "(prefers-color-scheme: dark)"
      ).matches;
      console.log("Système préfère le mode sombre:", systemPrefersDark);
      console.log("Thème actuel:", theme);

      const isDark =
         theme === "dark" || (theme === "system" && systemPrefersDark);

      console.log("Mode sombre appliqué:", isDark);

      if (isDark) {
         document.documentElement.classList.add("dark-theme");
         document.documentElement.style.setProperty("--background", "#140D26");
         document.documentElement.style.setProperty("--primary", "#897DA6");
         document.documentElement.style.setProperty(
            "--primary-dark",
            "#443A5C"
         );
         document.documentElement.style.setProperty(
            "--primary-darker",
            "#291E43"
         );
         document.documentElement.style.setProperty(
            "--primary-darkest",
            "#140D26"
         );
      } else {
         document.documentElement.classList.remove("dark-theme");
         document.documentElement.style.setProperty("--background", "#FFFFFF");
         document.documentElement.style.setProperty("--primary", "#000000");
         document.documentElement.style.setProperty(
            "--primary-dark",
            "#666666"
         );
         document.documentElement.style.setProperty(
            "--primary-darker",
            "#333333"
         );
         document.documentElement.style.setProperty(
            "--primary-darkest",
            "#000000"
         );
      }
   }

   constructor() {
      // Vérifier immédiatement la préférence système
      const systemPrefersDark = window.matchMedia(
         "(prefers-color-scheme: dark)"
      ).matches;
      console.log("Préférence système initiale (sombre):", systemPrefersDark);

      // Récupérer le thème sauvegardé ou utiliser "system" par défaut
      const savedTheme =
         (localStorage.getItem("theme") as ThemeType) || "system";
      console.log("Thème sauvegardé:", savedTheme);

      this.appTheme.set(savedTheme);
      this.applyTheme(savedTheme);

      effect(() => {
         const appTheme = this.appTheme();
         console.log("Changement de thème:", appTheme);
         localStorage.setItem("theme", appTheme);
         const colorScheme = appTheme === "system" ? "light dark" : appTheme;
         document.body.style.setProperty("color-scheme", colorScheme);
         this.applyTheme(appTheme);
      });

      // Amélioration de la détection des changements système
      const darkModeMediaQuery = window.matchMedia(
         "(prefers-color-scheme: dark)"
      );
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
         console.log(
            "Changement de préférence système détecté:",
            e.matches ? "sombre" : "clair"
         );
         if (this.appTheme() === "system") {
            console.log("Application du nouveau thème système");
            this.applyTheme("system");
         }
      };

      darkModeMediaQuery.addEventListener("change", handleSystemThemeChange);
   }
}
