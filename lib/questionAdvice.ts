export type AdvicePriority = "hoog" | "middel" | "laag";

export type QuestionAdvice = {
  consequence: string;
  betterSetup: string;
  cloud1Fit: string;
  priority: AdvicePriority;
};

export const QUESTION_ADVICE: Record<string, QuestionAdvice> = {
  "1.1": {
    consequence: "Nieuwe medewerkers zijn later productief en laptops worden niet altijd op dezelfde veilige manier ingericht.",
    betterSetup: "Werk met een standaard werkplekprofiel, automatische installatie en vooraf ingestelde beveiligingsregels.",
    cloud1Fit: "Cloud ÉÉN Werkplek Standaard kan helpen om onboarding voorspelbaar te maken met moderne Microsoft 365 werkplekken.",
    priority: "hoog",
  },
  "1.2": {
    consequence: "Zonder centraal beheer is lastig te zien welke apparaten veilig zijn, versleuteld zijn en updates ontvangen.",
    betterSetup: "Beheer laptops centraal, inclusief apparaatregistratie, encryptie, beleid en automatische controles.",
    cloud1Fit: "Cloud ÉÉN Werkplek Standaard sluit aan bij centraal werkplekbeheer en basisbeveiliging.",
    priority: "hoog",
  },
  "1.3": {
    consequence: "Zakelijke data kan op prive-telefoons blijven staan of gedeeld worden buiten de bedrijfsomgeving.",
    betterSetup: "Scheid werk en prive, beveilig zakelijke apps en maak bedrijfsdata op afstand wisbaar.",
    cloud1Fit: "Cloud ÉÉN kan mobiel device- en appbeheer inrichten als onderdeel van een beheerde werkplek.",
    priority: "middel",
  },
  "1.4": {
    consequence: "Bij vertrek kunnen oude accounts, mailboxen of apps langer open blijven dan bedoeld.",
    betterSetup: "Richt een vaste offboardingflow in waarbij toegang, dataoverdracht en licenties direct worden afgehandeld.",
    cloud1Fit: "Cloud ÉÉN Werkplek Standaard kan helpen met vaste processen voor gebruikersbeheer en toegang.",
    priority: "hoog",
  },
  "1.5": {
    consequence: "Verouderde software vergroot de kans op storingen en misbruik van bekende kwetsbaarheden.",
    betterSetup: "Plan updates centraal, bewaak installaties en rapporteer apparaten die achterblijven.",
    cloud1Fit: "Cloud ÉÉN Werkplek Premium of aanvullend beheer kan updatebeleid en monitoring structureel maken.",
    priority: "hoog",
  },
  "1.6": {
    consequence: "Medewerkers verliezen flexibiliteit of werken via oplossingen die niet overal even veilig zijn.",
    betterSetup: "Maak werken vanaf kantoor, thuis en onderweg mogelijk met cloudtoegang en controles op gebruiker en apparaat.",
    cloud1Fit: "Cloud ÉÉN Werkplek Standaard kan een moderne werkplek neerzetten die vanaf meerdere locaties goed werkt.",
    priority: "middel",
  },
  "2.1": {
    consequence: "Alleen een wachtwoord is kwetsbaar; gestolen wachtwoorden zijn nog steeds een veelvoorkomende ingang.",
    betterSetup: "Verplicht MFA en voeg toegangsregels toe op basis van locatie, apparaat en risico.",
    cloud1Fit: "Cloud ÉÉN Werkplek Premium past goed bij sterkere Microsoft 365 beveiliging en Conditional Access.",
    priority: "hoog",
  },
  "2.2": {
    consequence: "Phishing kan leiden tot gestolen accounts, factuurfraude of datalekken.",
    betterSetup: "Gebruik geavanceerde mailbeveiliging, veilige links/bijlagen en periodieke bewustwording voor medewerkers.",
    cloud1Fit: "Cloud ÉÉN kan Microsoft Defender en security-awareness als praktische verbeterstap begeleiden.",
    priority: "hoog",
  },
  "2.3": {
    consequence: "Ransomware of malware wordt later ontdekt wanneer endpointbeveiliging niet centraal wordt bewaakt.",
    betterSetup: "Zorg voor centraal beheerde endpointbeveiliging en actieve opvolging van meldingen.",
    cloud1Fit: "Cloud ÉÉN Werkplek Premium of aanvullende security monitoring kan hierbij helpen.",
    priority: "hoog",
  },
  "2.4": {
    consequence: "Microsoft 365 is geen volledige back-up. Verwijdering, ransomware of fouten kunnen herstel lastig maken.",
    betterSetup: "Gebruik aparte Microsoft 365 back-up met retentie en test periodiek of herstel werkt.",
    cloud1Fit: "Cloud ÉÉN kan back-up en herstel voor Microsoft 365 als aanvullende dienst inrichten en beheren.",
    priority: "hoog",
  },
  "2.5": {
    consequence: "Te brede toegang vergroot de impact van fouten, datalekken en onbedoelde deling.",
    betterSetup: "Werk met rollen, periodieke controle van rechten en signalering op gevoelige informatie.",
    cloud1Fit: "Cloud ÉÉN kan helpen met Microsoft 365 rechtenstructuur, securitybeleid en data-afspraken.",
    priority: "hoog",
  },
  "2.6": {
    consequence: "Bij een incident ontstaat snel tijdverlies, onduidelijkheid en grotere bedrijfsimpact.",
    betterSetup: "Maak een incidentplan, leg contactpersonen vast en oefen herstel en communicatie.",
    cloud1Fit: "Cloud ÉÉN Werkplek Premium en aanvullende securitydiensten passen bij monitoring en incidentvoorbereiding.",
    priority: "hoog",
  },
  "3.1": {
    consequence: "Een internetstoring kan direct invloed hebben op cloudwerkplekken, telefonie en klantcontact.",
    betterSetup: "Gebruik een back-upverbinding en monitoring zodat uitval sneller wordt opgevangen.",
    cloud1Fit: "Cloud ÉÉN kan helpen met KPN EEN connectiviteit, back-upverbindingen en beheer.",
    priority: "middel",
  },
  "3.2": {
    consequence: "Een ongescheiden netwerk maakt het moeilijk om gasten, medewerkers en apparaten veilig te scheiden.",
    betterSetup: "Richt zakelijke wifi in met gescheiden netwerken, centraal beheer en monitoring.",
    cloud1Fit: "Cloud ÉÉN kan bedrijfsmatige wifi en netwerkbeheer koppelen aan de werkplekomgeving.",
    priority: "middel",
  },
  "3.3": {
    consequence: "Telefonie los van Teams of mobiel werken kan bereikbaarheid en beheer onnodig ingewikkeld maken.",
    betterSetup: "Breng vaste telefonie, mobiel en Teams waar mogelijk dichter bij elkaar.",
    cloud1Fit: "Cloud ÉÉN kan KPN EEN en Teams-telefonie gebruiken als haakje voor modernere communicatie.",
    priority: "middel",
  },
  "3.4": {
    consequence: "Prive- of losse abonnementen geven minder grip op kosten, beveiliging en vervanging bij uitval.",
    betterSetup: "Centraliseer zakelijke abonnementen en koppel mobiel beheer aan de werkplek.",
    cloud1Fit: "Cloud ÉÉN kan mobiele abonnementen, toestelbeheer en werkplekbeheer samenbrengen.",
    priority: "middel",
  },
  "3.5": {
    consequence: "Klanten en collega's krijgen een wisselende ervaring wanneer bereikbaarheid per persoon verschilt.",
    betterSetup: "Maak medewerkers bereikbaar via vaste nummers, mobiel en Teams met duidelijke routering.",
    cloud1Fit: "Cloud ÉÉN kan vast-mobiel en Teams-integratie praktisch begeleiden.",
    priority: "laag",
  },
  "3.6": {
    consequence: "Los AI-gebruik kan leiden tot datarisico's, onduidelijke werkwijzen en gemiste productiviteitskansen.",
    betterSetup: "Maak afspraken over AI-gebruik, data en training voordat tools breed worden ingezet.",
    cloud1Fit: "Cloud ÉÉN kan helpen met Microsoft 365 Copilot-readiness, adoptie en veilige werkwijzen.",
    priority: "middel",
  },
  "4.1": {
    consequence: "IT wordt reactief geregeld, waardoor storingen langer duren en kennis afhankelijk is van losse personen.",
    betterSetup: "Werk met een vaste IT-partner, duidelijke verantwoordelijkheden en proactieve monitoring.",
    cloud1Fit: "Cloud ÉÉN Werkplek Premium past bij organisaties die proactief beheer en monitoring willen.",
    priority: "hoog",
  },
  "4.2": {
    consequence: "Meldingen raken sneller kwijt en gebruikers weten niet wanneer ze geholpen worden.",
    betterSetup: "Gebruik een ticketsysteem met status, prioriteit en afspraken over reactietijden.",
    cloud1Fit: "Cloud ÉÉN kan ondersteuning leveren via duidelijke supportprocessen en beheerafspraken.",
    priority: "middel",
  },
  "4.3": {
    consequence: "Lokale servers vragen onderhoud, back-up en noodscenario's die vaak meer risico en kosten geven.",
    betterSetup: "Onderzoek welke systemen veilig naar de cloud kunnen en beheer de overgebleven omgeving centraal.",
    cloud1Fit: "Cloud ÉÉN Werkplek Standaard of Premium kan helpen richting een moderne cloudwerkplek.",
    priority: "middel",
  },
  "4.4": {
    consequence: "Zonder routekaart worden IT-keuzes vaak ad hoc en is budget lastiger te voorspellen.",
    betterSetup: "Maak een 2- tot 3-jaarsplan met kwartaalreviews, prioriteiten en budgetindicatie.",
    cloud1Fit: "Cloud ÉÉN kan als IT-partner helpen met roadmap, kwartaalreview en praktische vervolgstappen.",
    priority: "middel",
  },
  "4.5": {
    consequence: "Klantvragen, audits of verzekeringen kosten veel tijd wanneer bewijs en maatregelen niet klaarstaan.",
    betterSetup: "Leg basismaatregelen, beleid, back-up, toegang en incidentafspraken aantoonbaar vast.",
    cloud1Fit: "Cloud ÉÉN Werkplek Premium en securitydiensten kunnen helpen met aantoonbare basismaatregelen.",
    priority: "hoog",
  },
  "4.6": {
    consequence: "Zonder kosteninzicht is lastig te sturen op licenties, werkplekken en groei.",
    betterSetup: "Maak kosten per medewerker inzichtelijk en bespreek jaarlijks optimalisatie en licenties.",
    cloud1Fit: "Cloud ÉÉN kan helpen met voorspelbare werkplekkosten en licentieoptimalisatie.",
    priority: "laag",
  },
  "1.8": {
    consequence: "Verouderde hardware vertraagt medewerkers, verhoogt storingskansen en is moeilijker te beveiligen met moderne beleidsregels.",
    betterSetup: "Hanteer een vaste vervangingscyclus van 4–5 jaar, houd een apparaatregister bij en plan vervanging proactief.",
    cloud1Fit: "Cloud ÉÉN Werkplek Standaard kan helpen met hardware-overzicht, levenscyclusbeheer en gestandaardiseerde vervangingsstrategieën.",
    priority: "middel",
  },
  "2.8": {
    consequence: "Een back-up die nooit is getest, is geen back-up. Bij een ransomware-aanval kan ongetest herstel fataal zijn voor bedrijfscontinuïteit.",
    betterSetup: "Test back-ups minimaal jaarlijks, leg hersteltijden vast en oefen het volledige herstelscenario met betrokkenen.",
    cloud1Fit: "Cloud ÉÉN kan back-up inclusief hersteltest beheren en documenteren als onderdeel van een beheerpakket.",
    priority: "hoog",
  },
  "3.8": {
    consequence: "Zonder netwerkmonitoring worden storingen en beveiligingsincidenten te laat ontdekt, wat leidt tot meer uitval en grotere schade.",
    betterSetup: "Implementeer continue netwerkmonitoring met automatische alerting bij afwijkingen in prestaties of verdacht verkeer.",
    cloud1Fit: "Cloud ÉÉN kan KPN EEN-connectiviteit combineren met proactieve monitoring en meldingen voor netwerkstoringen.",
    priority: "middel",
  },
  "4.8": {
    consequence: "Zonder overzicht van leveranciers en contracten raken afspraken over service, opzegtermijnen en SLA's op de achtergrond.",
    betterSetup: "Houd een leveranciersregister bij met contactpersonen, verloopdatums, SLA's en een jaarlijkse evaluatie.",
    cloud1Fit: "Cloud ÉÉN kan als vaste IT-partner helpen met leveranciersoverzicht en contractadvies.",
    priority: "middel",
  },
  "1.7": {
    consequence: "Shadow IT brengt onzichtbare risico's mee: data buiten de controle van het bedrijf, lekken en AVG-overtredingen.",
    betterSetup: "Stel een lijst op met goedgekeurde tools, communiceer die actief en blokkeer of signaleer afwijkingen.",
    cloud1Fit: "Cloud ÉÉN kan helpen met Microsoft 365-beleidsregels die ongecontroleerd gebruik van externe cloudopslag beperken.",
    priority: "hoog",
  },
  "2.7": {
    consequence: "De mens is de zwakste schakel: de meeste cyberincidenten beginnen met een medewerker die ergens op klikt.",
    betterSetup: "Combineer bewustwordingstraining met periodieke gesimuleerde phishing-aanvallen en meet de voortgang.",
    cloud1Fit: "Cloud ÉÉN kan Microsoft Defender-simulaties en security-awareness als onderdeel van een beveiligd werkplek inrichten.",
    priority: "hoog",
  },
  "3.7": {
    consequence: "Onveilige externe toegang is een veelgebruikte aanvalsvector. VPN alleen is niet meer genoeg in moderne dreigingslandschappen.",
    betterSetup: "Implementeer een zero-trust aanpak waarbij elke toegangspoging continu wordt beoordeeld op risico.",
    cloud1Fit: "Cloud ÉÉN Werkplek Premium past bij Conditional Access en zero-trust via Microsoft Entra ID.",
    priority: "hoog",
  },
  "4.7": {
    consequence: "Een ontbrekend verwerkingsregister of AVG-beleid kan leiden tot boetes tot €20 miljoen of 4% van de jaaromzet.",
    betterSetup: "Maak een verwerkingsregister, sluit verwerkersovereenkomsten en review jaarlijks of alles nog klopt.",
    cloud1Fit: "Cloud ÉÉN kan helpen met AVG-documentatie, verwerkersovereenkomsten voor Microsoft-diensten en privacyadvies.",
    priority: "hoog",
  },
};

export function getQuestionAdvice(questionId: string): QuestionAdvice {
  return QUESTION_ADVICE[questionId];
}
