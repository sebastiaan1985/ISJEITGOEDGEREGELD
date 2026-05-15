import { CATEGORIES, QUESTIONS } from "./questions";
import { getQuestionAdvice, type AdvicePriority } from "./questionAdvice";
import type { Scores } from "./types";

export type AnswerAdvice = {
  id: string;
  category: string;
  question: string;
  selectedAnswer: string;
  score: number;
  priority: AdvicePriority;
  consequence: string;
  betterSetup: string;
  cloud1Fit: string;
};

export type PackageAdvice = {
  title: string;
  summary: string;
  recommendedFollowUp: string[];
};

export type ScanSummary = {
  totalScore: number;
  weakestCategories: { name: string; score: number }[];
  topPriorities: AnswerAdvice[];
  questionResults: AnswerAdvice[];
  packageAdvice: PackageAdvice;
};

const priorityRank: Record<AdvicePriority, number> = { hoog: 0, middel: 1, laag: 2 };

function priorityForScore(score: number, fallback: AdvicePriority): AdvicePriority {
  if (score < 67) return "hoog";
  if (score < 100) return fallback === "hoog" ? "hoog" : "middel";
  return "laag";
}

export function buildScanSummary(answers: number[], scores: Scores): ScanSummary {
  const questionResults = QUESTIONS.map((question, index) => {
    const answerScore = answers[index] ?? 0;
    const selected = question.options.find((option) => option.score === answerScore) ?? question.options[0];
    const advice = getQuestionAdvice(question.id);

    return {
      id: question.id,
      category: CATEGORIES[question.category],
      question: question.text,
      selectedAnswer: selected.text,
      score: answerScore,
      priority: priorityForScore(answerScore, advice.priority),
      consequence: advice.consequence,
      betterSetup: advice.betterSetup,
      cloud1Fit: advice.cloud1Fit,
    };
  });

  const topPriorities = [...questionResults]
    .filter((item) => item.score < 100)
    .sort((a, b) => {
      const priorityDiff = priorityRank[a.priority] - priorityRank[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return a.score - b.score;
    })
    .slice(0, 5);

  const weakestCategories = scores.perCategory
    .map((score, index) => ({ name: CATEGORIES[index], score }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 2);

  return {
    totalScore: scores.total,
    weakestCategories,
    topPriorities,
    questionResults,
    packageAdvice: buildPackageAdvice(scores, topPriorities),
  };
}

export function buildPackageAdvice(scores: Scores, topPriorities: AnswerAdvice[]): PackageAdvice {
  const weakCategoryIndexes = scores.perCategory
    .map((score, index) => ({ score, index }))
    .filter((item) => item.score < 75)
    .map((item) => item.index);

  const hasSecurityRisk =
    weakCategoryIndexes.includes(1) ||
    topPriorities.some((item) => item.id.startsWith("2.") || item.id === "4.5");
  const hasWorkspaceRisk =
    weakCategoryIndexes.includes(0) ||
    weakCategoryIndexes.includes(3) ||
    topPriorities.some((item) => item.id.startsWith("1.") || item.id.startsWith("4."));
  const hasConnectivityRisk =
    weakCategoryIndexes.includes(2) || topPriorities.some((item) => item.id.startsWith("3."));

  if (hasSecurityRisk) {
    return {
      title: "Werkplek Premium of aanvullende security als logische vervolgstap",
      summary:
        "De grootste verbeterkans zit in veiligheid, herstelbaarheid of aantoonbaarheid. Een premium werkplek of aanvullende security- en back-updiensten kunnen helpen om risico's structureel te verlagen.",
      recommendedFollowUp: [
        "Controleer MFA, Conditional Access en apparaatbeleid.",
        "Bespreek back-up, hersteltest en incidentplan.",
        "Bekijk welke Microsoft 365 securityfuncties al beschikbaar zijn maar nog niet worden benut.",
      ],
    };
  }

  if (hasWorkspaceRisk) {
    return {
      title: "Werkplek Standaard als stevig fundament",
      summary:
        "De basis kan waarschijnlijk sterker en voorspelbaarder. Een gestandaardiseerde Cloud ÉÉN werkplek helpt vooral bij onboarding, beheer, updates en ondersteuning.",
      recommendedFollowUp: [
        "Breng apparaten, gebruikers en licenties centraal in kaart.",
        "Maak onboarding en offboarding minder handmatig.",
        "Leg vast wat standaard bij iedere werkplek hoort.",
      ],
    };
  }

  if (hasConnectivityRisk) {
    return {
      title: "Connectiviteit en Teams-telefonie als optimalisatie",
      summary:
        "De werkplek lijkt redelijk op orde, maar bereikbaarheid en verbinding kunnen nog eenvoudiger of robuuster.",
      recommendedFollowUp: [
        "Bekijk internetcontinuiteit en wifi-scheiding.",
        "Onderzoek vast-mobiel en Teams-integratie.",
        "Maak kosten en beheer van mobiele abonnementen inzichtelijk.",
      ],
    };
  }

  return {
    title: "Fijnslijpen en periodiek toetsen",
    summary:
      "De basis oogt sterk. De meeste waarde zit waarschijnlijk in periodieke review, adoptie en het voorkomen dat instellingen ongemerkt verouderen.",
    recommendedFollowUp: [
      "Plan een jaarlijkse werkplek- en securityreview.",
      "Controleer of beleid, back-up en rechten nog aansluiten bij de organisatie.",
      "Bespreek nieuwe mogelijkheden zoals Copilot en automatisering.",
    ],
  };
}
