export const TIPS: Record<string, string> = {
  "1.1": "Modern werkplek-uitleveringsproces — laptop opsturen, gebruiker logt in, in een uurtje productief.",
  "1.2": "Centraal cloudbeheer voor alle laptops, met automatische naleving van veiligheidsregels.",
  "1.3": "Beheer van werk-data op telefoons, zonder dat je iemands privé-leven raakt.",
  "1.4": "Automatische software-uitrol op basis van rol — minder fouten, minder helpdesk-tickets.",
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
  "3.6": "Teams-vergaderruimtes — externen ervaren je organisatie als professioneel, hybride teams werken effectief.",
  "4.1": "IT-partner met proactief beheer en monitoring — problemen oplossen voordat ze impact hebben.",
  "4.2": "Tickets met SLA — duidelijke afspraken over reactietijd geven rust en grip.",
  "4.3": "IT-documentatie die automatisch actueel blijft, zodat kennis niet in hoofden zit.",
  "4.4": "IT-routekaart voor 2–3 jaar, kwartaalsgewijs bijgewerkt — IT volgt de business, niet andersom.",
  "4.5": "Aantoonbare compliance (NIS2, ISO) — voorkomt verzekering- of klantgesprekken die je niet wil.",
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
