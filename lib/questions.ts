export type AnswerOption = {
  letter: "A" | "B" | "C" | "D";
  text: string;
  score: 0 | 33 | 67 | 100;
};

export type Question = {
  id: string;
  category: 0 | 1 | 2 | 3;
  index: 0 | 1 | 2 | 3 | 4 | 5;
  text: string;
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
    text: "Hoe komt software op de werkplek terecht?",
    options: [
      opt("A", "Iedereen installeert zelf wat hij of zij wil", 0),
      opt("B", "IT installeert op aanvraag", 33),
      opt("C", "Standaardpakket bij start, rest op aanvraag", 67),
      opt("D", "Software wordt automatisch klaargezet op basis van rol of afdeling", 100),
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
    options: [
      opt("A", "Geen idee — we hopen dat het niet gebeurt", 0),
      opt("B", "We bellen onze IT-leverancier en zien dan wel", 33),
      opt("C", "We hebben een draaiboek dat we kunnen oppakken", 67),
      opt("D", "Draaiboek, 24/7 monitoring én geoefend met onze leverancier", 100),
    ],
  },

  // Categorie 3 — Connectiviteit & Telefonie
  {
    id: "3.1",
    category: 2,
    index: 0,
    text: "Hoe stabiel is jullie internet op kantoor?",
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
      opt("A", "We hebben nog een klassieke telefooncentrale staan", 0),
      opt("B", "Bellen via een externe provider, los van Teams", 33),
      opt("C", "Bellen via Microsoft Teams (Teams Phone)", 67),
      opt("D", "Teams Phone met integratie naar onze klantsystemen (caller-info, notities)", 100),
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
      opt("A", "Eigenlijk alleen op kantoor goed bereikbaar", 0),
      opt("B", "Mail werkt thuis, bellen is gedoe", 33),
      opt("C", "Bellen, chatten en mailen vanaf elk apparaat", 67),
      opt("D", "Eén nummer, één tool — overal werkt het hetzelfde", 100),
    ],
  },
  {
    id: "3.6",
    category: 2,
    index: 5,
    text: "Hoe vergader je met externen en hybride teams?",
    options: [
      opt("A", "We vergaderen eigenlijk fysiek", 0),
      opt("B", "Losse webcams en koptelefoons in de vergaderzaal", 33),
      opt("C", "Vergaderruimtes ingericht voor Teams", 67),
      opt("D", "Gecertificeerde Teams Rooms — iedereen heeft dezelfde ervaring, fysiek of online", 100),
    ],
  },

  // Categorie 4 — Beheer & Ondersteuning
  {
    id: "4.1",
    category: 3,
    index: 0,
    text: "Wie regelt jullie IT in de dagelijkse praktijk?",
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
    text: "Hoe goed staat jullie IT op papier?",
    options: [
      opt("A", "Vooral in de hoofden van een paar mensen", 0),
      opt("B", "Wat losse documenten op een gedeelde schijf", 33),
      opt("C", "Een actueel overzicht van wat we hebben", 67),
      opt("D", "Volledige documentatie die automatisch actueel blijft", 100),
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
    text: "Voldoe je aan eisen zoals NIS2, ISO of klant-audits?",
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
];

export const QUESTIONS_PER_CATEGORY = 6;
export const TOTAL_QUESTIONS = QUESTIONS.length;

export function getQuestion(cat: number, idx: number): Question {
  const q = QUESTIONS.find((q) => q.category === cat && q.index === idx);
  if (!q) throw new Error(`Question not found: cat=${cat}, idx=${idx}`);
  return q;
}
