import type { Industry, Zone } from "./types";

/**
 * Branchespecifieke inzichten die in het rapport verschijnen
 * op basis van de gekozen branche + score-zone.
 */

type IndustryInsight = {
  headline: string;
  tips: Record<Zone, string>;
};

export const INDUSTRY_INSIGHTS: Partial<Record<Industry, IndustryInsight>> = {
  "Zakelijke dienstverlening": {
    headline: "IT in de zakelijke dienstverlening",
    tips: {
      red: "In de dienstverlening draait alles om vertrouwen. Klanten verwachten dat hun data veilig is — een datalek kan direct leiden tot klantverlies en reputatieschade.",
      orange: "Je basis staat, maar klanten stellen steeds vaker vragen over jouw informatiebeveiliging. Proactief investeren in security versterkt je concurrentiepositie.",
      green: "Sterke IT-basis. Overweeg een ISO 27001-certificering om dit actief te gebruiken als verkoopargument richting je klanten.",
    },
  },
  "Bouw & Installatie": {
    headline: "IT in de bouw & installatie",
    tips: {
      red: "In de bouw werken veel medewerkers op locatie. Zonder goed mobiel beheer en cloudzugang lopen projecten vertraging op én is data kwetsbaar.",
      orange: "Je medewerkers werken overal — op locatie, in de bus, op kantoor. Investeer in device-onafhankelijk werken zodat iedereen overal dezelfde ervaring heeft.",
      green: "Goed geregeld. De volgende stap: koppeling van je IT aan projectmanagementsystemen voor nog meer grip op de bouwplaats.",
    },
  },
  "Industrie & Productie": {
    headline: "IT in de industrie",
    tips: {
      red: "Productiebedrijven zijn steeds vaker doelwit van ransomware. Eén aanval kan je productielijn stilleggen — de gemiddelde downtime kost €250.000+.",
      orange: "OT en IT groeien samen. Zorg dat je netwerksegmentatie op orde is, zodat een IT-incident niet je productieprocessen raakt.",
      green: "Sterke basis. Overweeg OT-security en netwerksegmentatie als volgende stap om productie en IT volledig te scheiden.",
    },
  },
  "Logistiek & Transport": {
    headline: "IT in de logistiek",
    tips: {
      red: "In de logistiek is bereikbaarheid alles. Zonder stabiele verbindingen en mobiel beheer loop je ritten mis en verlies je klanten.",
      orange: "Je chauffeurs en planners moeten overal kunnen werken. Focus op mobiel beheer en een stabiele verbinding — ook onderweg.",
      green: "Goed geregeld. De volgende stap: real-time integratie van je IT met track & trace en planningssystemen.",
    },
  },
  "Retail & E-commerce": {
    headline: "IT in retail & e-commerce",
    tips: {
      red: "Klantdata is je goud — en je grootste risico. Een datalek in retail kan leiden tot AVG-boetes tot €20 miljoen of 4% van de jaaromzet.",
      orange: "Je verwerkt klantgegevens en betalingen. Zorg dat je PCI-DSS compliance en AVG-naleving actief bewaakt.",
      green: "Sterke IT-basis. Overweeg AI-gedreven analyses om je klantinzichten te verdiepen en je conversie te verhogen.",
    },
  },
  "Zorg & Welzijn": {
    headline: "IT in de zorg",
    tips: {
      red: "In de zorg is aantoonbare IT-beveiliging extra urgent vanwege de gevoeligheid van patiëntdata. Toezichthouders en klanten zijn hier extra alert op.",
      orange: "Patiëntdata is bijzonder persoonsgegevens onder de AVG. Tweestaps-verificatie en toegangsbeheer zijn geen luxe maar een wettelijke vereiste.",
      green: "Sterke basis. Overweeg een NEN 7510-certificering om aantoonbaar te voldoen aan de zorgsector-specifieke eisen.",
    },
  },
  "Onderwijs": {
    headline: "IT in het onderwijs",
    tips: {
      red: "Onderwijsinstellingen zijn een groeiend doelwit voor cybercriminelen. Studentdata én onderzoeksgegevens moeten beter beschermd worden.",
      orange: "Met veel gebruikers en wisselende devices is identity management cruciaal. Focus op centraal beheer en MFA voor alle medewerkers én studenten.",
      green: "Goed geregeld. De volgende stap: AI-tools integreren in het leerproces met duidelijke richtlijnen voor docenten en studenten.",
    },
  },
  "Financiële dienstverlening": {
    headline: "IT in de financiële sector",
    tips: {
      red: "De financiële sector wordt zwaar gereguleerd op IT-security. Toezicht en klantvragen vereisen aantoonbare maatregelen — niet alleen intenties.",
      orange: "Klanten vertrouwen je hun vermogen toe. Aantoonbare compliance en 24/7 monitoring zijn geen nice-to-have maar een vereiste.",
      green: "Sterke basis. Overweeg een SOC 2-audit om je IT-beveiliging extern te laten valideren richting je klanten.",
    },
  },
  "Hospitality & Horeca": {
    headline: "IT in hospitality & horeca",
    tips: {
      red: "Gasten verwachten betrouwbaar wifi en snelle service. Zonder stabiele IT staan je kassasystemen stil en lopen gasten weg.",
      orange: "Gescheiden netwerken voor gasten en bedrijf zijn essentieel. Je wilt niet dat een gast op hetzelfde netwerk zit als je kassasysteem.",
      green: "Goed geregeld. De volgende stap: gasten-wifi koppelen aan marketing en reviews voor hogere klanttevredenheid.",
    },
  },
  "Non-profit & Overheid": {
    headline: "IT bij non-profit & overheid",
    tips: {
      red: "Overheidsorganisaties worden steeds vaker doelwit van cyberaanvallen. De Baseline Informatiebeveiliging Overheid (BIO) stelt concrete eisen aan je IT.",
      orange: "Publiek vertrouwen vereist transparantie over informatiebeveiliging. Focus op aantoonbare maatregelen en documentatie.",
      green: "Sterke basis. Overweeg een onafhankelijke audit om BIO-compliance formeel aan te tonen.",
    },
  },
  "IT & Tech": {
    headline: "IT bij IT & tech-bedrijven",
    tips: {
      red: "Als IT-bedrijf is je eigen IT je visitekaartje. Klanten verwachten dat je zelf het voorbeeld geeft — en zullen je erop afrekenen als dat niet zo is.",
      orange: "Je kent de materie, maar intern toepassen is een ander verhaal. Behandel je eigen IT als een klantproject met SLA's en reviews.",
      green: "Uitstekend. Gebruik je eigen setup als showcase richting prospects — 'practice what you preach' is het sterkste verkoopargument.",
    },
  },
};

/**
 * Geeft branche-specifieke tip terug op basis van intake-branche en totale zone.
 */
export function getIndustryTip(industry: Industry, zone: Zone): { headline: string; tip: string } | null {
  const insight = INDUSTRY_INSIGHTS[industry];
  if (!insight) return null;
  return {
    headline: insight.headline,
    tip: insight.tips[zone],
  };
}
