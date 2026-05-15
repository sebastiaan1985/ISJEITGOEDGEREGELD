export type AnswerOption = {
  letter: "A" | "B" | "C" | "D";
  text: string;
  score: 0 | 33 | 67 | 100;
};

export type Question = {
  id: string;
  category: 0 | 1 | 2 | 3;
  index: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  text: string;
  scenario?: string;
  options: [AnswerOption, AnswerOption, AnswerOption, AnswerOption];
};

export const CATEGORIES = [
  "Werkplek & Apparaten",
  "Beveiliging & Back-up",
  "Connectiviteit & Telefonie",
  "Beheer & Ondersteuning",
] as const;

export const CATEGORY_SHORT = ["Werkplek", "Beveiliging", "Connectiviteit", "Beheer"] as const;

const opt = (letter: AnswerOption["letter"], text: string, score: AnswerOption["score"]): AnswerOption => ({
  letter,
  text,
  score,
});

export const QUESTIONS: Question[] = [
  // Categorie 1 — Werkplek & Apparaten
  {
    id: "1.1",
    category: 0,
    index: 0,
    text: "Hoe ziet het er nu uit als iemand een nieuwe laptop krijgt?",
    scenario: "Je nieuwe medewerker start maandag. Hoe snel is hij of zij écht productief?",
    options: [
      opt("A", "We doen weinig — de gebruiker installeert wat hij of zij nodig heeft", 0),
      opt("B", "Een collega of leverancier zet hem handmatig in", 33),
      opt("C", "We gebruiken een standaard image die elke keer terugkomt", 67),
      opt("D", "De gebruiker krijgt het pakketje, logt in, en is in een uurtje aan het werk", 100),
    ],
  },
  {
    id: "1.2",
    category: 0,
    index: 1,
    text: "Hoe houden jullie grip op alle laptops en pc's?",
    options: [
      opt("A", "Geen centraal beheer — elke laptop staat op zichzelf", 0),
      opt("B", "Wat instellingen via een Windows-netwerkbeheer", 33),
      opt("C", "Beheer via een cloudtool met basisregels", 67),
      opt("D", "Volledig cloudbeheer met encryptie, regels en automatische controles", 100),
    ],
  },
  {
    id: "1.3",
    category: 0,
    index: 2,
    text: "Wat gebeurt er met zakelijke data op een mobiele telefoon?",
    options: [
      opt("A", "Eerlijk: weinig zicht op — medewerkers regelen het zelf", 0),
      opt("B", "We vragen ze een schermvergrendeling in te stellen", 33),
      opt("C", "Werk- en privé-apps zijn van elkaar gescheiden op de telefoon", 67),
      opt("D", "Zakelijke data is centraal beheerd, op afstand wisbaar, en alleen toegankelijk met beveiliging", 100),
    ],
  },
  {
    id: "1.4",
    category: 0,
    index: 3,
    text: "Wat gebeurt er als een medewerker uit dienst gaat?",
    scenario: "Iemand vertrekt naar een concurrent. Hoe snel en zeker is de toegang tot jullie data afgesloten?",
    options: [
      opt("A", "We moeten handmatig overal aan denken, soms vergeten we een systeem", 0),
      opt("B", "We hebben een checklist, maar het kost veel handmatig werk", 33),
      opt("C", "Toegang tot de belangrijkste systemen wordt via één knop uitgezet", 67),
      opt("D", "Volledig geautomatiseerde offboarding: accounts, toegang en data direct geblokkeerd en overgedragen", 100),
    ],
  },
  {
    id: "1.5",
    category: 0,
    index: 4,
    text: "Hoe blijven Windows en apps up-to-date?",
    options: [
      opt("A", "Daar denken we eerlijk gezegd weinig over na", 0),
      opt("B", "Gebruikers krijgen reminders om zelf updates te doen", 33),
      opt("C", "Updates worden gepland uitgerold via een tool", 67),
      opt("D", "Updates zijn geautomatiseerd, worden gemonitord en gerapporteerd", 100),
    ],
  },
  {
    id: "1.6",
    category: 0,
    index: 5,
    text: "Hoe makkelijk werk je vanuit huis of onderweg?",
    options: [
      opt("A", "Werken kan eigenlijk vooral op kantoor", 0),
      opt("B", "Met VPN kunnen we thuis bij de zaak", 33),
      opt("C", "Alles draait in de cloud, we werken vanaf elk apparaat", 67),
      opt("D", "Volledig device-onafhankelijk werken, met sterke veiligheidschecks op de achtergrond", 100),
    ],
  },

  // Categorie 2 — Beveiliging & Back-up
  {
    id: "2.1",
    category: 1,
    index: 0,
    text: "Hoe loggen jullie in op mail en Microsoft 365?",
    options: [
      opt("A", "Alleen met een wachtwoord — dat is genoeg", 0),
      opt("B", "Wachtwoord met soms een extra code via sms", 33),
      opt("C", "Tweestaps-verificatie is verplicht voor iedereen", 67),
      opt("D", "Tweestaps-verificatie plus extra regels op basis van locatie en apparaat", 100),
    ],
  },
  {
    id: "2.2",
    category: 1,
    index: 1,
    text: "Hoe goed zijn jullie beschermd tegen phishing en valse mail?",
    options: [
      opt("A", "Alleen wat standaard in mail meekomt", 0),
      opt("B", "Een aparte spamfilter", 33),
      opt("C", "We gebruiken de geavanceerde beveiliging van Microsoft (Defender)", 67),
      opt("D", "Defender plus actieve monitoring én phishing-trainingen voor medewerkers", 100),
    ],
  },
  {
    id: "2.3",
    category: 1,
    index: 2,
    text: "Hoe goed zijn laptops beschermd tegen virussen en ransomware?",
    options: [
      opt("A", "Met wat Windows standaard biedt", 0),
      opt("B", "Met een los antivirusprogramma", 33),
      opt("C", "Centraal beheerde endpoint-bescherming op alle apparaten", 67),
      opt("D", "Endpoint-bescherming plus 24/7 monitoring door specialisten", 100),
    ],
  },
  {
    id: "2.4",
    category: 1,
    index: 3,
    text: "Hoe is jullie data (mail, OneDrive, SharePoint) gewaarborgd als er iets misgaat?",
    scenario: "Stel: een medewerker verwijdert per ongeluk een complete projectmap uit SharePoint.",
    options: [
      opt("A", "Daar zit standaard back-up van Microsoft op (let op: dat is helaas niet zo)", 0),
      opt("B", "We kunnen verwijderde bestanden uit de prullenbak halen", 33),
      opt("C", "We hebben een aparte back-up-oplossing voor Microsoft 365", 67),
      opt("D", "Aparte back-up met retentie én getest herstel — we weten dat het werkt", 100),
    ],
  },
  {
    id: "2.5",
    category: 1,
    index: 4,
    text: "Wie heeft toegang tot gevoelige informatie binnen jullie organisatie?",
    options: [
      opt("A", "Eerlijk: iedereen kan vrijwel overal bij", 0),
      opt("B", "Mappen hebben rechten, maar niet altijd actueel", 33),
      opt("C", "Toegang is geregeld op basis van iemands rol", 67),
      opt("D", "Rol-gebaseerd plus automatische detectie van gevoelige data en waarschuwingen bij risico", 100),
    ],
  },
  {
    id: "2.6",
    category: 1,
    index: 5,
    text: "Wat is jullie plan als er morgen écht iets misgaat (datalek, gijzeling)?",
    scenario: "Het is maandagochtend. Al je bestanden zijn versleuteld door ransomware. De telefoon gaat.",
    options: [
      opt("A", "Geen idee — we hopen dat het niet gebeurt", 0),
      opt("B", "We bellen onze IT-leverancier en zien dan wel", 33),
      opt("C", "We hebben een draaiboek dat we kunnen oppakken", 67),
      opt("D", "Draaiboek, 24/7 monitoring én geoefend met onze leverancier", 100),
    ],
  },

  // Vraag 1.8 — Hardware levenscyclus (Onderhoud)
  {
    id: "1.8",
    category: 0,
    index: 7,
    text: "Wanneer zijn jullie laptops en andere apparatuur voor het laatste vervangen of beoordeeld?",
    scenario: "Een medewerker klaagt dat zijn 6 jaar oude laptop traag is. Is dat een uitzondering of de norm?",
    options: [
      opt("A", "We vervangen apparatuur pas als die echt stuk gaat", 0),
      opt("B", "We vervangen af en toe, maar zonder vast schema of overzicht", 33),
      opt("C", "We hanteren een vervangingscyclus van 4–5 jaar voor laptops", 67),
      opt("D", "Vaste vervangingscyclus met proactieve monitoring van levensduur en prestatiedaling", 100),
    ],
  },

  // Vraag 2.7 — Security awareness
  {
    id: "2.7",
    category: 1,
    index: 6,
    text: "Hoe bewust zijn medewerkers van dreigingen zoals phishing en social engineering?",
    scenario: "Een medewerker ontvangt een nep-factuur van de 'directeur'. Herkent hij dat?",
    options: [
      opt("A", "We verwachten dat medewerkers dat zelf wel inschatten", 0),
      opt("B", "Er is af en toe een interne mail of herinnering over veilig werken", 33),
      opt("C", "Medewerkers krijgen minimaal één keer per jaar een bewustwordingstraining", 67),
      opt("D", "Continue awareness: trainingen, gesimuleerde phishing-tests én meetbare voortgang", 100),
    ],
  },

  // Categorie 3 — Connectiviteit & Telefonie
  {
    id: "3.1",
    category: 2,
    index: 0,
    text: "Hoe stabiel is jullie internet op kantoor?",
    scenario: "Midden op een drukke werkdag valt het internet uit. Wat gebeurt er?",
    options: [
      opt("A", "Eén verbinding — gaat-ie eruit, dan ligt alles plat", 0),
      opt("B", "Eén snelle verbinding (glasvezel), geen back-up", 33),
      opt("C", "Glasvezel met 4G/5G back-up zodat we doorwerken", 67),
      opt("D", "Dubbele verbinding met automatische omschakeling en monitoring", 100),
    ],
  },
  {
    id: "3.2",
    category: 2,
    index: 1,
    text: "Hoe is jullie wifi geregeld?",
    options: [
      opt("A", "Een 'gewone' router van de internetprovider", 0),
      opt("B", "Aparte access points, maar één netwerk voor iedereen", 33),
      opt("C", "Gescheiden netwerken voor medewerkers, gasten en apparaten", 67),
      opt("D", "Bedrijfsmatig wifi met centrale monitoring en automatische toegang", 100),
    ],
  },
  {
    id: "3.3",
    category: 2,
    index: 2,
    text: "Hoe regelen jullie vaste telefonie of het algemene nummer?",
    options: [
      opt("A", "We hebben nog een fysieke centrale op locatie waar we via internet mee bellen", 0),
      opt("B", "We hebben een VoIP oplossing", 33),
      opt("C", "We hebben een VoIP oplossing waar mobiele telefonie ook onderdeel van is", 67),
      opt("D", "We maken gebruik van Microsoft Teams", 100),
    ],
  },
  {
    id: "3.4",
    category: 2,
    index: 3,
    text: "Hoe zijn jullie zakelijke mobiele abonnementen geregeld?",
    options: [
      opt("A", "Iedereen gebruikt zijn privé-abonnement", 0),
      opt("B", "Losse zakelijke abonnementen per medewerker", 33),
      opt("C", "Zakelijke abonnementen plus beheer van data op de telefoon", 67),
      opt("D", "Volledig bundel: abonnement, Teams-integratie, beheer én snel vervangen bij defect", 100),
    ],
  },
  {
    id: "3.5",
    category: 2,
    index: 4,
    text: "Hoe goed bereikbaar zijn medewerkers vanaf overal?",
    options: [
      opt("A", "Eigenlijk zijn we alleen goed bereikbaar wanneer we op kantoor werken", 0),
      opt("B", "Medewerkers hebben een zakelijke mobiele telefoon, los van het bedrijfsnummer", 33),
      opt("C", "Medewerkers hebben een zakelijke mobiel die gekoppeld is aan de centrale (vast-mobiel integratie)", 67),
      opt("D", "Naadloos en optimaal bereikbaar op elk apparaat (integratie van vast, mobiel én Teams)", 100),
    ],
  },
  {
    id: "3.6",
    category: 2,
    index: 5,
    text: "Gebruiken jullie al AI-tools — zoals Copilot — in het dagelijks werk?",
    scenario: "Een collega besteedt elke week uren aan het samenvatten van vergaderingen en opstellen van mails.",
    options: [
      opt("A", "Nee, daar zijn we nog niet mee bezig", 0),
      opt("B", "Sommige collega's experimenteren op eigen initiatief met ChatGPT of vergelijkbare tools", 33),
      opt("C", "We gebruiken AI-tools, maar zonder duidelijke afspraken of richtlijnen", 67),
      opt("D", "AI-tools zijn bewust uitgerold, met richtlijnen, training en afstemming op onze werkwijze", 100),
    ],
  },

  // Vraag 1.7 — Shadow IT
  {
    id: "1.7",
    category: 0,
    index: 6,
    text: "Weten jullie welke apps en cloudtools medewerkers gebruiken voor hun werk?",
    scenario: "Een medewerker deelt klantdata via een persoonlijk Dropbox-account. Weet IT dat?",
    options: [
      opt("A", "We hebben geen overzicht — medewerkers kiezen en installeren zelf", 0),
      opt("B", "We zijn er globaal van op de hoogte, maar er is geen beleid", 33),
      opt("C", "Er zijn richtlijnen over welke tools zijn goedgekeurd", 67),
      opt("D", "Niet-goedgekeurde apps worden gesignaleerd of geblokkeerd, met een formele goedkeuringslijst", 100),
    ],
  },

  // Vraag 2.8 — Back-up testen & disaster recovery
  {
    id: "2.8",
    category: 1,
    index: 7,
    text: "Hoe zeker weet je dat jullie back-ups écht werken als je ze nodig hebt?",
    scenario: "Na een ransomware-aanval wil je terugzetten. Wanneer heb je voor het laatste een herstel getest?",
    options: [
      opt("A", "We weten het eerlijk gezegd niet — back-ups zijn er, maar testen doen we niet", 0),
      opt("B", "We testen herstel af en toe als er een directe aanleiding is", 33),
      opt("C", "We testen back-ups periodiek om te controleren of herstel lukt", 67),
      opt("D", "Geautomatiseerd, gedocumenteerd en minimaal jaarlijks geoefend herstel met meetbare hersteltijden", 100),
    ],
  },

  // Vraag 3.7 — Remote access / Zero Trust
  {
    id: "3.7",
    category: 2,
    index: 6,
    text: "Hoe zorgen jullie dat medewerkers van buiten kantoor veilig bij bedrijfssystemen kunnen?",
    options: [
      opt("A", "Via een directe verbinding — geen extra beveiligingslaag", 0),
      opt("B", "Via een VPN-verbinding", 33),
      opt("C", "Via MFA en beveiligde cloudtoegang zonder VPN", 67),
      opt("D", "Via zero-trust: elke toegang wordt gecontroleerd op gebruiker, apparaat én locatie", 100),
    ],
  },

  // Categorie 4 — Beheer & Ondersteuning
  {
    id: "4.1",
    category: 3,
    index: 0,
    text: "Wie regelt jullie IT in de dagelijkse praktijk?",
    scenario: "Het is vrijdagmiddag 17:00 uur. Een kritiek systeem werkt niet meer.",
    options: [
      opt("A", "Eigenlijk niemand specifiek — we improviseren", 0),
      opt("B", "Een collega die er handig in is", 33),
      opt("C", "Externe IT-partner die we bellen als er iets is", 67),
      opt("D", "IT-partner met 24/7 monitoring en proactief beheer", 100),
    ],
  },
  {
    id: "4.2",
    category: 3,
    index: 1,
    text: "Hoe meldt iemand een IT-probleem?",
    options: [
      opt("A", "Loopt langs of stuurt een WhatsApp", 0),
      opt("B", "Mailtje naar IT en hopen dat het opgepakt wordt", 33),
      opt("C", "Tickets via een systeem met status-updates", 67),
      opt("D", "Tickets met portal en duidelijke afspraken over reactietijden (SLA)", 100),
    ],
  },
  {
    id: "4.3",
    category: 3,
    index: 2,
    text: "Werken jullie nog met een lokale server op kantoor, of is alles cloud?",
    options: [
      opt("A", "We hebben nog meerdere lokale servers draaien voor bestanden en software", 0),
      opt("B", "Grotendeels cloud, maar nog een server voor een specifieke applicatie", 33),
      opt("C", "Volledig in de cloud, maar zonder overkoepelend beheer", 67),
      opt("D", "100% cloud en centraal beheerd als één moderne werkplek", 100),
    ],
  },
  {
    id: "4.4",
    category: 3,
    index: 3,
    text: "Heb je een IT-routekaart voor de komende 2 à 3 jaar?",
    options: [
      opt("A", "Daar denken we niet bewust over na", 0),
      opt("B", "Wat losse plannen, geen concreet pad", 33),
      opt("C", "Een routekaart die we jaarlijks bijwerken", 67),
      opt("D", "Routekaart met budget én een kwartaalreview met onze IT-partner", 100),
    ],
  },
  {
    id: "4.5",
    category: 3,
    index: 4,
    text: "Voldoe je aan eisen zoals ISO, klant-audits of verzekeringsvragen?",
    options: [
      opt("A", "Geen idee, niet over nagedacht", 0),
      opt("B", "We werken eraan, maar zijn er nog niet", 33),
      opt("C", "We voldoen aan de belangrijkste eisen", 67),
      opt("D", "Aantoonbaar compliant, met jaarlijkse externe audit", 100),
    ],
  },
  {
    id: "4.6",
    category: 3,
    index: 5,
    text: "Heb je grip op je IT-kosten per medewerker?",
    options: [
      opt("A", "We weten ongeveer wat de IT-rekeningen zijn", 0),
      opt("B", "Idee, maar geen detail per medewerker", 33),
      opt("C", "We weten wat IT per medewerker per maand kost", 67),
      opt("D", "Inzicht per medewerker plus benchmark en jaarlijkse optimalisatie", 100),
    ],
  },

  // Vraag 3.8 — Netwerkmonitoring
  {
    id: "3.8",
    category: 2,
    index: 7,
    text: "Hebben jullie inzicht in wat er op het netwerk gebeurt — denk aan storingen, verdacht verkeer of prestatieproblemen?",
    options: [
      opt("A", "Geen monitoring — problemen merken we pas als medewerkers klagen", 0),
      opt("B", "We kijken af en toe in de router of provider-portal bij klachten", 33),
      opt("C", "We hebben basismonitoring die bij storingen een melding geeft", 67),
      opt("D", "Continue monitoring van prestaties, beveiliging en anomalieën met automatische alerting", 100),
    ],
  },

  // Vraag 4.7 — AVG/GDPR compliance
  {
    id: "4.7",
    category: 3,
    index: 6,
    text: "Hoe aantoonbaar zijn jullie processen rondom privacy en gegevensbescherming (AVG)?",
    scenario: "Een klant vraagt je aan te tonen hoe jullie met zijn persoonsgegevens omgaan.",
    options: [
      opt("A", "We weten dat het speelt, maar hebben er weinig concreets voor geregeld", 0),
      opt("B", "We hebben een privacybeleid, maar een formeel verwerkingsregister ontbreekt", 33),
      opt("C", "We hebben een verwerkingsregister en duidelijke afspraken met leveranciers", 67),
      opt("D", "Volledig AVG-compliant: register, beleid, verwerkersovereenkomsten én jaarlijkse review", 100),
    ],
  },

  // Vraag 4.8 — Leveranciers- en contractbeheer
  {
    id: "4.8",
    category: 3,
    index: 7,
    text: "Hoe goed heb je grip op jullie IT-leveranciers, contracten en serviceniveauafspraken (SLA's)?",
    options: [
      opt("A", "We weten niet precies welke contracten lopen of wat daarin staat", 0),
      opt("B", "We hebben een beeld van de grote contracten, maar geen centraal overzicht", 33),
      opt("C", "We hebben een overzicht van leveranciers en contracten inclusief verloopdatums", 67),
      opt("D", "Centraal leveranciersoverzicht met SLA-bewaking, jaarlijkse evaluatie en gestructureerd contractbeheer", 100),
    ],
  },
];

export const QUESTIONS_PER_CATEGORY = 8;
export const TOTAL_QUESTIONS = QUESTIONS.length;

export function getQuestion(cat: number, idx: number): Question {
  const q = QUESTIONS.find((q) => q.category === cat && q.index === idx);
  if (!q) throw new Error(`Question not found: cat=${cat}, idx=${idx}`);
  return q;
}
