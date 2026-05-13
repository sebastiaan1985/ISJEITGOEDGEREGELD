import type { Intake, M365Bucket, SizeBucket } from "./types";

export type LeadType = "qualified" | "warm" | "self-serve";

const SIZE_RANK: Record<SizeBucket, number> = {
  "1-9": 0,
  "10-25": 1,
  "26-50": 2,
  "51-100": 3,
  "101-250": 4,
  "251-500": 5,
  "500+": 6,
};

const M365_RANK: Record<M365Bucket, number> = {
  "0": 0,
  "1-9": 0,
  "10-25": 1,
  "26-50": 2,
  "51-100": 3,
  "101+": 4,
  "weet-niet": -1,
};

export function classify(intake: Intake): LeadType {
  if (SIZE_RANK[intake.size] < 1) return "self-serve";
  if (M365_RANK[intake.m365Users] >= 1) return "qualified";
  if (M365_RANK[intake.m365Users] === -1) return "warm";
  return "warm";
}

export const LEAD_LABEL: Record<LeadType, string> = {
  qualified: "Qualified lead",
  warm: "Warm lead",
  "self-serve": "Self-serve",
};
