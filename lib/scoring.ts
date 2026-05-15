import type { Zone } from "./types";
import { QUESTIONS } from "./questions";

/* Gewichtsfactoren — security-kritische vragen wegen zwaarder */
const WEIGHTS: Record<string, number> = {
  "1.1": 1.0, "1.2": 1.0, "1.3": 1.0, "1.4": 0.9, "1.5": 1.1, "1.6": 1.0,
  "2.1": 1.5, "2.2": 1.3, "2.3": 1.2, "2.4": 1.5, "2.5": 1.1, "2.6": 1.3,
  "3.1": 1.1, "3.2": 0.9, "3.3": 1.0, "3.4": 0.8, "3.5": 1.0, "3.6": 0.8,
  "1.7": 1.1,
  "2.7": 1.4,
  "3.7": 1.2,
  "4.1": 1.1, "4.2": 1.0, "4.3": 0.8, "4.4": 1.0, "4.5": 1.3, "4.6": 0.9, "4.7": 1.3,
};

export function categoryScore(answers: number[], category: number): number {
  if (answers.length === 0) return 0;
  let weightedSum = 0;
  let totalWeight = 0;
  answers.forEach((score, i) => {
    const qId = `${category + 1}.${i + 1}`;
    const w = WEIGHTS[qId] ?? 1.0;
    weightedSum += score * w;
    totalWeight += w;
  });
  return Math.round(weightedSum / totalWeight);
}

export function totalScore(perCategory: number[]): number {
  if (perCategory.length === 0) return 0;
  const sum = perCategory.reduce((a, b) => a + b, 0);
  return Math.round(sum / perCategory.length);
}

export function zoneFor(score: number): Zone {
  if (score <= 59) return "red";
  if (score <= 82) return "orange";
  return "green";
}

export function zoneColor(zone: Zone): { text: string; bg: string; ring: string } {
  switch (zone) {
    case "red":
      return { text: "text-red-600", bg: "bg-red-50", ring: "ring-red-200" };
    case "orange":
      return { text: "text-amber-600", bg: "bg-amber-50", ring: "ring-amber-200" };
    case "green":
      return { text: "text-emerald-600", bg: "bg-emerald-50", ring: "ring-emerald-200" };
  }
}

export function zoneHex(zone: Zone): string {
  switch (zone) {
    case "red":
      return "#EF4444";
    case "orange":
      return "#F59E0B";
    case "green":
      return "#10B981";
  }
}
