import { computed, inject, Pipe, PipeTransform } from "@angular/core";
import { ThemeService } from "../service/theme.service";

@Pipe({
   name: "replaceStringDark",
   standalone: true,
})
export class ReplaceStringDarkPipe implements PipeTransform {
   private themeService = inject(ThemeService);

   isDarkMode = computed(() => {
      const theme = this.themeService.selectedTheme()?.name;
      return (
         theme === "dark" ||
         (theme === "system" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
   });

   transform(
      value: string | null | undefined,
      oldString: string,
      newString: string
   ): string {
      if (!value) return "";
      if (!this.isDarkMode()) return value;

      const escapedOldString = oldString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const flexibleOldString = escapedOldString.replace(/\s/g, "\\s*");
      const regex = new RegExp(flexibleOldString, "gi");

      return value.replace(regex, newString);
   }
}
