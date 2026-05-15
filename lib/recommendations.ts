export const TIPS: Record<string, string> = {
  "1.1": "Modern werkplek-uitleveringsproces — laptop opsturen, gebruiker logt in, in een uurtje productief.",
  "1.2": "Centraal cloudbeheer voor alle laptops, met automatische naleving van veiligheidsregels.",
  "1.3": "Beheer van werk-data op telefoons, zonder dat je iemands privé-leven raakt.",
  "1.4": "Automatische offboarding zorgt ervoor dat ex-medewerkers direct geen toegang meer hebben en bespaart licentiekosten.",
  "1.5": "Geautomatiseerde updates met monitoring — geen reminders meer, wel grip.",
  "1.6": "Cloud-first werken: vanaf elk apparaat, met sterke maar onzichtbare beveiliging.",
  "2.1": "Tweestaps-verificatie verplicht voor iedereen, gecombineerd met regels op apparaat en locatie.",
  "2.2": "Geavanceerde mail-bescherming én phishing-trainingen — 90% van incidenten begint met mail.",
  "2.3": "Centrale endpoint-bescherming op alle laptops, met monitoring vanuit een security-team.",
  "2.4": "Aparte back-up van Microsoft 365 — Microsoft draait je data, herstel is jouw verantwoordelijkheid.",
  "2.5": "Toegang op basis van rol, met detectie van gevoelige data en automatische waarschuwingen.",
  "2.6": "Een draaiboek voor incidenten dat geoefend is — als het misgaat moet je niet improviseren.",
  "3.1": "Dubbele internetverbinding met automatische omschakeling — geen omzetverlies door internetuitval.",
  "3.2": "Bedrijfsmatig wifi met gescheiden netwerken voor medewerkers, gasten en (slimme) apparaten.",
  "3.3": "Bellen via Microsoft Teams — één tool voor chat, video én telefonie.",
  "3.4": "Zakelijke abonnementen gebundeld met beheer en snel vervangen bij defect.",
  "3.5": "Werken vanaf overal met één tool en één nummer — zelfde ervaring op kantoor en thuis.",
  "3.6": "AI-tools bewust uitrollen met richtlijnen en training — voorkomt schaduw-IT en verhoogt productiviteit.",
  "4.1": "IT-partner met proactief beheer en monitoring — problemen oplossen voordat ze impact hebben.",
  "4.2": "Tickets met SLA — duidelijke afspraken over reactietijd geven rust en grip.",
  "4.3": "Het uitfaseren van lokale servers verlaagt risico's (zoals ransomware) en maakt device-onafhankelijk werken makkelijker.",
  "4.4": "IT-routekaart voor 2–3 jaar, kwartaalsgewijs bijgewerkt — IT volgt de business, niet andersom.",
  "4.5": "Aantoonbare compliance en securitydocumentatie — voorkomt lastige verzekering- of klantgesprekken.",
  "4.6": "Inzicht in IT-kosten per medewerker plus benchmark — voorkomt verspilling en discussie.",
};

export function pickTips(answers: Record<string, number>, category: 0 | 1 | 2 | 3): string[] {
  const catPrefix = `${category + 1}.`;
  const keys = Object.keys(answers)
    .filter((k) => k.startsWith(catPrefix))
    .filter((k) => answers[k] < 67)
    .sort((a, b) => answers[a] - answers[b])
    .slice(0, 3);
  return keys.map((k) => TIPS[k]).filter(Boolean);
}

export const GREEN_FALLBACK =
  "Je bent op alle punten goed bezig. Een korte review met onze specialist toont waar je nog kan optimaliseren op kosten en efficiëntie.";

/* “Wist je dat”-inzichten — verschijnen bij lage scores in het rapport */
export const INSIGHTS: Record<string, string> = {
  "1.1": "Met modern werkplekbeheer kan een nieuwe medewerker binnen 1 uur productief zijn — zonder dat IT er handmatig bij hoeft.",
  "1.4": "Bijna 30% van ex-medewerkers heeft nog toegang tot bedrijfsdata lang nadat ze uit dienst zijn, wat een enorm risico op datalekken vormt.",
  "1.5": "Niet-gepatchte systemen zijn de #1 ingang voor ransomware. Geautomatiseerde updates sluiten dat gat.",
  "2.1": "81% van alle datalekken begint met een gestolen of zwak wachtwoord. Tweestaps-verificatie blokkeert 99,9% van die aanvallen.",
  "2.2": "91% van alle cyberaanvallen begint met een phishing-mail. Geavanceerde bescherming zit vaak al in je Microsoft 365-licentie — maar staat niet aan.",
  "2.4": "Microsoft garandeert uptime, maar NIET dataherstel. Hun eigen voorwaarden adviseren een externe back-up. Na 93 dagen is verwijderde data definitief weg.",
  "2.6": "Bedrijven zonder incidentplan hebben gemiddeld 287 dagen nodig om een datalek te ontdekken — met een plan is dat 73 dagen.",
  "3.1": "Één uur internetuitval kost een gemiddeld MKB-bedrijf €5.000–€20.000 aan productiviteitsverlies.",
  "3.6": "Microsoft Copilot kan routinetaken zoals mail-samenvatting en notulen met 30–50% versnellen — mits goed uitgerold.",
  "4.1": "Proactief beheer voorkomt gemiddeld 60% van de IT-storingen die reactief beheer pas achteraf oplost.",
  "4.3": "Lokale servers zijn relatief duur in beheer en kwetsbaarder voor ransomware-uitbraken. Een volledige cloud-migratie is veiliger.",
  "4.5": "Klanten en verzekeraars vragen steeds vaker om aantoonbare securitymaatregelen, niet alleen om goede intenties.",
  "4.6": "De gemiddelde IT-kosten per medewerker liggen tussen €100 en €250 per maand. Weet je waar jij zit?",
};

export function pickInsights(answers: Record<string, number>, category: 0 | 1 | 2 | 3): string[] {
  const catPrefix = `${category + 1}.`;
  return Object.keys(answers)
    .filter((k) => k.startsWith(catPrefix))
    .filter((k) => answers[k] < 67 && INSIGHTS[k])
    .sort((a, b) => answers[a] - answers[b])
    .slice(0, 2)
    .map((k) => INSIGHTS[k]);
}
