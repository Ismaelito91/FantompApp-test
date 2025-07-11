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

   isDark$ = computed(() => {
      const currentTheme = this.appTheme();
      if (currentTheme === "dark") {
         return true;
      }
      if (currentTheme === "system") {
         return window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
      return false;
   });

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

      const isDark =
         theme === "dark" || (theme === "system" && systemPrefersDark);

      if (isDark) {
         document.documentElement.classList.add("dark-theme");
      } else {
         document.documentElement.classList.remove("dark-theme");
      }
   }

   constructor() {
      // Vérifier immédiatement la préférence système
      const systemPrefersDark = window.matchMedia(
         "(prefers-color-scheme: dark)"
      ).matches;

      // Récupérer le thème sauvegardé ou utiliser "system" par défaut
      const savedTheme =
         (localStorage.getItem("theme") as ThemeType) || "system";

      this.appTheme.set(savedTheme);
      this.applyTheme(savedTheme);

      effect(() => {
         const appTheme = this.appTheme();
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
         if (this.appTheme() === "system") {
            this.applyTheme("system");
         }
      };

      darkModeMediaQuery.addEventListener("change", handleSystemThemeChange);
   }
}
