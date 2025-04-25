import { Injectable, computed, effect, signal } from '@angular/core';

type ThemeType = 'light' | 'dark' | 'system';

export interface AppTheme {
   name: ThemeType;
   icon: string;
}

@Injectable({
   providedIn: 'root',
})
export class ThemeService {
   private appTheme = signal<ThemeType>('system');

   private themes: AppTheme[] = [
      { name: 'light', icon: 'light_mode' },
      { name: 'dark', icon: 'dark_mode' },
      { name: 'system', icon: 'desktop_windows' },
   ];

   selectedTheme = computed(() =>
      this.themes.find((t) => t.name === this.appTheme())
   );

   getThemes() {
      return this.themes;
   }

   setTheme(theme: ThemeType) {
      this.appTheme.set(theme);
   }

   constructor() {
      effect(() => {
         const appTheme = this.appTheme();
         const colorScheme = appTheme === 'system' ? 'light dark' : appTheme;
         document.body.style.setProperty('color-scheme', colorScheme);
      });
   }
}
