import type { Zone } from "./types";

export const ZONE_LABEL: Record<Zone, string> = {
  red: "Belangrijke aandachtspunten",
  orange: "Goede basis, gaten op te vullen",
  green: "Sterke basis",
};

export const ZONE_INTRO: Record<Zone, string> = {
  red: "Hier liggen de grootste kansen. Vaak gaat het om enkele gerichte stappen die snel grote impact maken.",
  orange: "Je hebt een werkbare basis. Een paar gerichte verbeteringen tillen dit naar volwassen niveau.",
  green: "Je doet het goed. We zien nog ruimte voor fine-tuning en kostenefficiëntie.",
};

export const TOTAL_SCORE_HEADLINE: Record<Zone, string> = {
  red: "Verbeterpotentieel hoog",
  orange: "Belangrijke stappen mogelijk",
  green: "Sterke basis — fine-tuning mogelijk",
};
