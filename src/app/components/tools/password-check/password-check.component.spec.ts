import { PasswordSecurityCalculator } from "./password-check.component";

describe("PasswordSecurityCalculator.evaluatePasswordStrength", () => {
  let calculator: PasswordSecurityCalculator;

  beforeEach(() => {
    calculator = new PasswordSecurityCalculator();
  });
// 1. Chiffres uniquement
  it("devrait classer un mot de passe avec uniquement des chiffres en numbersOnly", () => {
    const result = calculator.evaluatePasswordStrength("12345");
    expect(result.type).toBe("numbersOnly");
  });
// 2. Minuscules uniquement
// ou Majuscules uniquement 
// ou caractères spéciaux uniquement
  it("devrait classer un mot de passe avec uniquement des minuscules en lowercaseOnly", () => {
    let result = calculator.evaluatePasswordStrength("abcdef");
    expect(result.type).toBe("lowercaseOnly");
    result = calculator.evaluatePasswordStrength("ABCDEF");
    expect(result.type).toBe("lowercaseOnly");
    result = calculator.evaluatePasswordStrength("%!/:%");
    expect(result.type).toBe("lowercaseOnly");
  });
// 3. Majuscules et minuscules (sans chiffres ni caractères spéciaux)
// ou Majuscules et caractères spéciaux uniquement
// ou Majuscules et chiffres uniquement
// ou Minuscules et caractères spéciaux uniquement
// ou Minuscules et chiffres uniquement
// ou chiffres et caractères spéciaux uniquement
  it("devrait classer un mot de passe avec majuscules et minuscules en mixedCase", () => {
    let result = calculator.evaluatePasswordStrength("Abcdef");
    expect(result.type).toBe("mixedCase");
    result = calculator.evaluatePasswordStrength("AZE%/:");
    expect(result.type).toBe("mixedCase");
    result = calculator.evaluatePasswordStrength("AZE123");
    expect(result.type).toBe("mixedCase");
    result = calculator.evaluatePasswordStrength("aze%:/");
    expect(result.type).toBe("mixedCase");
    result = calculator.evaluatePasswordStrength("aze123");
    expect(result.type).toBe("mixedCase");
    result = calculator.evaluatePasswordStrength("123%:/");
    expect(result.type).toBe("mixedCase");
  });

// 4. Chiffres + Majuscules et minuscules (sans caractères spéciaux)
// ou Chiffres + Majuscules et caractères spéciaux uniquement
// ou Chiffres + minuscules et caractères spéciaux uniquement
// ou minuscules et minuscules et caractères spéciaux uniquement
  it("devrait classer un mot de passe chiffres + lettres (sans spéciaux) en numbersAndLetters", () => {
    let result = calculator.evaluatePasswordStrength("Abcdef1");
    expect(result.type).toBe("numbersAndLetters");
    result = calculator.evaluatePasswordStrength("676MOL!%");
    expect(result.type).toBe("numbersAndLetters");
    result = calculator.evaluatePasswordStrength("%bcdef1");
    expect(result.type).toBe("numbersAndLetters");
    result = calculator.evaluatePasswordStrength("mlkJUH!%");
    expect(result.type).toBe("numbersAndLetters");
  });

  it("devrait classer un mot de passe avec chiffres, minuscules, majuscules et spéciaux en allCharacters", () => {
    const result = calculator.evaluatePasswordStrength("Abcdef1!");
    expect(result.type).toBe("allCharacters");
  });

  it("devrait utiliser les données longueur 4 pour un mot de passe de longueur < 4", () => {
    const result = calculator.evaluatePasswordStrength("a2"); // minuscules + chiffres => mixedCase selon l'algo
    expect(result.type).toBe("mixedCase");
    expect(result.timeUnit).toBe("INSTANT");
    expect(result.color).toBe("purple");
  });

  it("devrait utiliser les données longueur 18 pour un mot de passe de longueur > 18", () => {
    const longPassword = "Aa1!Aa1!Aa1!Aa1!Aa"; // 20 caractères, contient tous types
    const result = calculator.evaluatePasswordStrength(longPassword);
    expect(result.type).toBe("allCharacters");
    expect(result.timeValue).toBe("463");
    expect(result.timeUnit).toBe("QUADRILLION_YEARS");
    expect(result.color).toBe("green");
  });
});


