import { inject, Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { PasswordCrackingData } from "../model/password-cracking-data.model";

@Injectable({
   providedIn: "root",
})
export class PasswordSecurityService {
    private readonly translateService = inject(TranslateService);

    public readonly crackingTimeData: PasswordCrackingData[] = [
       {
          characters: 4,
          numbersOnly: { value: "", unit: "INSTANT", color: "red" },
          lowercaseOnly: { value: "", unit: "INSTANT", color: "red" },
          mixedCase: { value: "", unit: "INSTANT", color: "red" },
          numbersAndLetters: { value: "", unit: "INSTANT", color: "red" },
          allCharacters: { value: "", unit: "INSTANT", color: "red" },
       },
       {
          characters: 5,
          numbersOnly: { value: "", unit: "INSTANT", color: "red" },
          lowercaseOnly: { value: "", unit: "INSTANT", color: "red" },
          mixedCase: { value: "57", unit: "MINUTES", color: "red" },
          numbersAndLetters: { value: "2", unit: "HOURS", color: "red" },
          allCharacters: { value: "4", unit: "HOURS", color: "red" },
       },
       {
          characters: 6,
          numbersOnly: { value: "", unit: "INSTANT", color: "red" },
          lowercaseOnly: { value: "46", unit: "MINUTES", color: "red" },
          mixedCase: { value: "2", unit: "DAYS", color: "red" },
          numbersAndLetters: { value: "6", unit: "DAYS", color: "red" },
          allCharacters: { value: "2", unit: "WEEKS", color: "red" },
       },
       {
          characters: 7,
          numbersOnly: { value: "", unit: "INSTANT", color: "red" },
          lowercaseOnly: { value: "20", unit: "HOURS", color: "red" },
          mixedCase: { value: "4", unit: "MONTHS", color: "orange" },
          numbersAndLetters: { value: "1", unit: "YEAR", color: "orange" },
          allCharacters: { value: "2", unit: "YEARS", color: "orange" },
       },
       {
          characters: 8,
          numbersOnly: { value: "", unit: "INSTANT", color: "red" },
          lowercaseOnly: { value: "3", unit: "WEEKS", color: "red" },
          mixedCase: { value: "15", unit: "YEARS", color: "orange" },
          numbersAndLetters: { value: "62", unit: "YEARS", color: "orange" },
          allCharacters: { value: "164", unit: "YEARS", color: "orange" },
       },
       {
          characters: 9,
          numbersOnly: { value: "2", unit: "HOURS", color: "red" },
          lowercaseOnly: { value: "2", unit: "YEARS", color: "orange" },
          mixedCase: { value: "791", unit: "YEARS", color: "orange" },
          numbersAndLetters: { value: "3000", unit: "YEARS", color: "orange" },
          allCharacters: { value: "11000", unit: "YEARS", color: "orange" },
       },
       {
          characters: 10,
          numbersOnly: { value: "1", unit: "DAYS", color: "red" },
          lowercaseOnly: { value: "40", unit: "YEARS", color: "orange" },
          mixedCase: { value: "41000", unit: "THOUSAND_YEARS", color: "orange" },
          numbersAndLetters: {
             value: "238",
             unit: "THOUSAND_YEARS",
             color: "orange",
          },
          allCharacters: {
             value: "803",
             unit: "THOUSAND_YEARS",
             color: "orange",
          },
       },
       {
          characters: 11,
          numbersOnly: { value: "1", unit: "WEEKS", color: "red" },
          lowercaseOnly: { value: "1000", unit: "YEARS", color: "orange" },
          mixedCase: { value: "2", unit: "MILLION_YEARS", color: "orange" },
          numbersAndLetters: {
             value: "14",
             unit: "MILLION_YEARS",
             color: "orange",
          },
          allCharacters: { value: "56", unit: "MILLION_YEARS", color: "orange" },
       },
       {
          characters: 12,
          numbersOnly: { value: "3", unit: "MONTHS", color: "orange" },
          lowercaseOnly: {
             value: "27",
             unit: "THOUSAND_YEARS",
             color: "orange",
          },
          mixedCase: { value: "111", unit: "MILLION_YEARS", color: "blue" },
          numbersAndLetters: {
             value: "917",
             unit: "MILLION_YEARS",
             color: "blue",
          },
          allCharacters: { value: "3", unit: "BILLION_YEARS", color: "green" },
       },
       {
          characters: 13,
          numbersOnly: { value: "3", unit: "YEARS", color: "orange" },
          lowercaseOnly: {
             value: "705",
             unit: "THOUSAND_YEARS",
             color: "orange",
          },
          mixedCase: { value: "5", unit: "BILLION_YEARS", color: "blue" },
          numbersAndLetters: {
             value: "56",
             unit: "BILLION_YEARS",
             color: "blue",
          },
          allCharacters: { value: "275", unit: "BILLION_YEARS", color: "green" },
       },
       {
          characters: 14,
          numbersOnly: { value: "28", unit: "YEARS", color: "orange" },
          lowercaseOnly: { value: "18", unit: "MILLION_YEARS", color: "orange" },
          mixedCase: { value: "300", unit: "BILLION_YEARS", color: "blue" },
          numbersAndLetters: {
             value: "3",
             unit: "TRILLION_YEARS",
             color: "blue",
          },
          allCharacters: { value: "19", unit: "TRILLION_YEARS", color: "green" },
       },
       {
          characters: 15,
          numbersOnly: { value: "284", unit: "YEARS", color: "orange" },
          lowercaseOnly: {
             value: "477",
             unit: "MILLION_YEARS",
             color: "orange",
          },
          mixedCase: { value: "15", unit: "TRILLION_YEARS", color: "blue" },
          numbersAndLetters: {
             value: "218",
             unit: "TRILLION_YEARS",
             color: "blue",
          },
          allCharacters: {
             value: "1",
             unit: "QUADRILLION_YEARS",
             color: "green",
          },
       },
       {
          characters: 16,
          numbersOnly: { value: "2", unit: "THOUSAND_YEARS", color: "orange" },
          lowercaseOnly: { value: "12", unit: "BILLION_YEARS", color: "orange" },
          mixedCase: { value: "812", unit: "TRILLION_YEARS", color: "blue" },
          numbersAndLetters: {
             value: "13",
             unit: "TRILLION_YEARS",
             color: "blue",
          },
          allCharacters: { value: "94", unit: "", color: "green" },
       },
       {
          characters: 17,
          numbersOnly: { value: "28", unit: "THOUSAND_YEARS", color: "orange" },
          lowercaseOnly: {
             value: "322",
             unit: "BILLION_YEARS",
             color: "orange",
          },
          mixedCase: { value: "42", unit: "QUADRILLION_YEARS", color: "blue" },
          numbersAndLetters: {
             value: "840",
             unit: "QUADRILLION_YEARS",
             color: "blue",
          },
          allCharacters: {
             value: "6",
             unit: "QUINTILLION_YEARS",
             color: "green",
          },
       },
       {
          characters: 18,
          numbersOnly: { value: "284", unit: "THOUSAND_YEARS", color: "orange" },
          lowercaseOnly: { value: "8", unit: "TRILLION_YEARS", color: "orange" },
          mixedCase: { value: "2", unit: "QUADRILLION_YEARS", color: "blue" },
          numbersAndLetters: {
             value: "52",
             unit: "QUADRILLION_YEARS",
             color: "blue",
          },
          allCharacters: {
             value: "463",
             unit: "QUINTILLION_YEARS",
             color: "green",
          },
       },
    ];
 
    public translateTime(
       value: string,
       unit: string
    ): string {
       if (unit === "INSTANT") {
          const translated = this.translateService.instant(
             "TOOLS.PASSWORD_CHECK.TIME_UNITS.INSTANT"
          );
          return translated === "TOOLS.PASSWORD_CHECK.TIME_UNITS.INSTANT"
             ? "Instantané"
             : translated;
       }
 
       const translatedUnit = this.translateService.instant(
          `TOOLS.PASSWORD_CHECK.TIME_UNITS.${unit}`
       );
       if (translatedUnit === `TOOLS.PASSWORD_CHECK.TIME_UNITS.${unit}`) {
          const defaultUnits: { [key: string]: string } = {
             MINUTES: "minutes",
             HOURS: "heures",
             DAY: "jour",
             DAYS: "jours",
             WEEK: "semaine",
             WEEKS: "semaines",
             MONTHS: "mois",
             YEARS: "ans",
             THOUSAND_YEARS: "milliers d'années",
             MILLION_YEARS: "millions d'années",
             BILLION_YEARS: "milliards d'années",
             TRILLION_YEARS: "billions d'années",
             QUADRILLION_YEARS: "trillions d'années",
             QUINTILLION_YEARS: "quadrillions d'années",
          };
          const defaultUnit = defaultUnits[unit] || unit.toLowerCase();
          return value ? `${value} ${defaultUnit}` : defaultUnit;
       }
 
       return value ? `${value} ${translatedUnit}` : translatedUnit;
    }
 
    getCrackingDataByLength(length: number): PasswordCrackingData | undefined {
       if (length < 4) {
          return this.crackingTimeData.find((data) => data.characters === 4);
       }
 
       if (length > 18) {
          return this.crackingTimeData.find((data) => data.characters === 18);
       }
 
       return this.crackingTimeData.find((data) => data.characters === length);
    }
 
    private getEvaluationResult(
       length: number,
       type:
          | "numbersOnly"
          | "lowercaseOnly"
          | "mixedCase"
          | "numbersAndLetters"
          | "allCharacters"
    ): {
       length: number;
       type:
          | "numbersOnly"
          | "lowercaseOnly"
          | "mixedCase"
          | "numbersAndLetters"
          | "allCharacters";
       crackingTime: string;
       timeValue: string;
       timeUnit: string;
       color: string;
    } {
       const data = this.getCrackingDataByLength(length);
 
       if (!data) {
          return {
             length,
             type,
             crackingTime: "Données non disponibles",
             timeValue: "",
             timeUnit: "INSTANT",
             color: "red",
          };
       }
 
       const crackingInfo = data[type];
 
       return {
          length,
          type,
          crackingTime: crackingInfo.value
             ? `${crackingInfo.value} ${crackingInfo.unit}`
             : crackingInfo.unit,
          timeValue: crackingInfo.value,
          timeUnit: crackingInfo.unit,
          color: crackingInfo.color,
       };
    }
 
    evaluatePasswordStrength(password: string): {
       length: number;
       type:
          | "numbersOnly"
          | "lowercaseOnly"
          | "mixedCase"
          | "numbersAndLetters"
          | "allCharacters";
       crackingTime: string;
       timeValue: string;
       timeUnit: string;
       color: string;
    } {
       const length = password.length;
       const hasNumbers = /\d/.test(password);
       const hasLowercase = /[a-z]/.test(password);
       const hasUppercase = /[A-Z]/.test(password);
       const hasSpecialChars = /[^a-zA-Z0-9]/.test(password);
 
       let type:
          | "numbersOnly"
          | "lowercaseOnly"
          | "mixedCase"
          | "numbersAndLetters"
          | "allCharacters";
 
       type = "lowercaseOnly";
 
       if (hasNumbers && !hasLowercase && !hasUppercase && !hasSpecialChars) {
          type = "numbersOnly";
       }
 
       if (
          (hasLowercase && !hasUppercase && !hasNumbers && !hasSpecialChars) ||
          (!hasLowercase && hasUppercase && !hasNumbers && hasSpecialChars) ||
          (!hasLowercase && !hasUppercase && !hasNumbers && hasSpecialChars)
       ) {
          type = "lowercaseOnly";
       }
 
       if (
          (hasLowercase && hasUppercase && !hasNumbers && !hasSpecialChars) ||
          (!hasLowercase && hasUppercase && !hasNumbers && hasSpecialChars) ||
          (!hasLowercase && hasUppercase && hasNumbers && !hasSpecialChars) ||
          (hasLowercase && !hasUppercase && !hasNumbers && hasSpecialChars) ||
          (hasLowercase && !hasUppercase && hasNumbers && !hasSpecialChars) ||
          (!hasLowercase && !hasUppercase && hasNumbers && hasSpecialChars)
       ) {
          type = "mixedCase";
       }
 
       if (
          (hasNumbers && hasLowercase && hasUppercase && !hasSpecialChars) ||
          (hasNumbers && !hasLowercase && hasUppercase && hasSpecialChars) ||
          (hasNumbers && hasLowercase && !hasUppercase && hasSpecialChars) ||
          (!hasNumbers && hasLowercase && hasUppercase && hasSpecialChars)
       ) {
          type = "numbersAndLetters";
       }
 
       if (hasNumbers && hasLowercase && hasUppercase && hasSpecialChars) {
          type = "allCharacters";
       }
       return this.getEvaluationResult(length, type);
    }
 }