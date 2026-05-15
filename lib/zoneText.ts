import type { Zone } from "./types";

export const ZONE_LABEL: Record<Zone, string> = {
  red: "Direct aandacht vereist",
  orange: "Verbeterpotentieel aanwezig",
  green: "Sterke basis",
};

export const ZONE_INTRO: Record<Zone, string> = {
  red: "Dit onderdeel vraagt direct actie. De risico's hier zijn concreet en vergroot de kans op uitval, dataverlies of beveiligingsincidenten.",
  orange: "Er is een werkbare basis, maar er zijn gaten die — als ze niet worden gedicht — op het verkeerde moment een probleem kunnen worden.",
  green: "Dit staat goed. Blijf het periodiek toetsen, want technologie en dreigingen veranderen ook als u stilstaat.",
};

export const TOTAL_SCORE_HEADLINE: Record<Zone, string> = {
  red: "Meerdere risico's vragen actie",
  orange: "Goede basis, gericht verbeteren loont",
  green: "Sterke basis — blijf toetsen",
};
