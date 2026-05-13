import type { Zone } from "./types";

export function categoryScore(answers: number[]): number {
  if (answers.length === 0) return 0;
  const sum = answers.reduce((a, b) => a + b, 0);
  return Math.round(sum / answers.length);
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
