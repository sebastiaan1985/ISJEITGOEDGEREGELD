export const SIZE_BUCKETS = [
  "1-9",
  "10-25",
  "26-50",
  "51-100",
  "101-250",
  "251-500",
  "500+",
] as const;
export type SizeBucket = (typeof SIZE_BUCKETS)[number];

export const M365_BUCKETS = [
  "0",
  "1-9",
  "10-25",
  "26-50",
  "51-100",
  "101+",
  "weet-niet",
] as const;
export type M365Bucket = (typeof M365_BUCKETS)[number];

export const INDUSTRIES = [
  "Zakelijke dienstverlening",
  "Bouw & Installatie",
  "Industrie & Productie",
  "Logistiek & Transport",
  "Retail & E-commerce",
  "Zorg & Welzijn",
  "Onderwijs",
  "Financiële dienstverlening",
  "Hospitality & Horeca",
  "Non-profit & Overheid",
  "IT & Tech",
  "Anders",
] as const;
export type Industry = (typeof INDUSTRIES)[number];

export type Intake = {
  firstName: string;
  company: string;
  industry: Industry;
  size: SizeBucket;
  m365Users: M365Bucket;
  email: string;
  phone?: string;
};

export type ScanType = "it-health";

export type Zone = "red" | "orange" | "green";

export type ScanPhase =
  | "intro"
  | "chooser"
  | "teaser"
  | "intake"
  | "question"
  | "category-complete"
  | "submitting"
  | "result"
  | "email-sent";

export type Scores = {
  total: number;
  perCategory: [number, number, number, number];
};

export type CategoryIndex = 0 | 1 | 2 | 3;
export type QuestionIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export const QUESTIONS_PER_CAT = 7;
