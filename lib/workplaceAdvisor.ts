export type WorkplacePackageId = "instap" | "standaard" | "premium" | "ultimate";

export type WorkplaceAnswerValue = "instap" | "standaard" | "premium" | "ultimate";

export type WorkplaceQuestion = {
  id: string;
  title: string;
  help: string;
  options: Array<{
    value: WorkplaceAnswerValue;
    label: string;
    description: string;
  }>;
};

export type WorkplacePackage = {
  id: WorkplacePackageId;
  name: string;
  price: string;
  tagline: string;
  bestFor: string;
  includes: string[];
  notIncluded: string[];
  upgradeWhen: string;
};

export type WorkplaceComparisonRow = {
  category: string;
  label: string;
  description: string;
  values: Record<WorkplacePackageId, string>;
};

export type WorkplaceAdvice = {
  primary: WorkplacePackage;
  secondary?: WorkplacePackage;
  score: number;
  reason: string;
  missing?: string;
  answers: Record<string, WorkplaceAnswerValue>;
};

export const workplaceQuestions: WorkplaceQuestion[] = [
  {
    id: "workStyle",
    title: "Hoe werken jullie meestal?",
    help: "Kies wat het dichtst bij de dagelijkse praktijk komt.",
    options: [
      {
        value: "instap",
        label: "Vooral op kantoor",
        description: "Een vaste werkplek, weinig wisselende apparaten en beperkt thuiswerken.",
      },
      {
        value: "standaard",
        label: "Kantoor en thuis",
        description: "Medewerkers werken regelmatig op verschillende plekken.",
      },
      {
        value: "premium",
        label: "Hybride en mobiel",
        description: "Werk moet veilig en soepel lopen op laptop, telefoon en thuiswerkplek.",
      },
      {
        value: "ultimate",
        label: "Volledig flexibel",
        description: "Veel wisselende locaties, apparaten, rollen of vestigingen.",
      },
    ],
  },
  {
    id: "securityNeed",
    title: "Hoe groot is de impact als een account of laptop misbruikt wordt?",
    help: "Denk aan klantgegevens, offertes, dossiers, planning en financiele informatie.",
    options: [
      {
        value: "instap",
        label: "Vervelend, maar beperkt",
        description: "Er staat weinig gevoelige informatie in de omgeving.",
      },
      {
        value: "standaard",
        label: "Belangrijk",
        description: "E-mail, bestanden en klantinformatie moeten goed beschermd zijn.",
      },
      {
        value: "premium",
        label: "Zeer belangrijk",
        description: "Datalekken, stilstand of accountmisbruik mogen eigenlijk niet gebeuren.",
      },
      {
        value: "ultimate",
        label: "Kritisch",
        description: "Er is behoefte aan streng beleid, rapportage en extra controle.",
      },
    ],
  },
  {
    id: "brandExperience",
    title: "Hoe professioneel moet de digitale uitstraling zijn?",
    help: "Denk aan herkenbaar inloggen, vaste e-mailhandtekeningen en een vertrouwde omgeving voor medewerkers.",
    options: [
      {
        value: "instap",
        label: "Basis is voldoende",
        description: "Als iedereen maar goed kan werken.",
      },
      {
        value: "standaard",
        label: "Graag herkenbaar",
        description: "Logo, kleuren en basisuitstraling moeten netjes kloppen.",
      },
      {
        value: "premium",
        label: "Consistent naar buiten",
        description: "Elke e-mail en elk apparaat moet dezelfde professionele indruk geven.",
      },
      {
        value: "ultimate",
        label: "Volledig merkwaardig",
        description: "De digitale werkplek moet voelen als een eigen bedrijfsomgeving.",
      },
    ],
  },
  {
    id: "deviceManagement",
    title: "Hoeveel grip wil je op laptops en computers?",
    help: "Bijvoorbeeld updates, versleuteling, installatie en beheer op afstand.",
    options: [
      {
        value: "instap",
        label: "Alleen de basis",
        description: "Een paar apparaten, weinig wisselingen.",
      },
      {
        value: "standaard",
        label: "Goed centraal geregeld",
        description: "Apparaten moeten veilig ingesteld en op afstand geholpen kunnen worden.",
      },
      {
        value: "premium",
        label: "Proactief beheerd",
        description: "Problemen liever voorkomen dan achteraf oplossen.",
      },
      {
        value: "ultimate",
        label: "Strak beleid per groep",
        description: "Verschillende rollen, apparaten of locaties vragen om meer controle.",
      },
    ],
  },
  {
    id: "newEmployees",
    title: "Hoe vaak komen er medewerkers of apparaten bij?",
    help: "Dit bepaalt hoeveel gemak je nodig hebt bij inrichten en starten.",
    options: [
      {
        value: "instap",
        label: "Zelden",
        description: "Een nieuwe medewerker of laptop komt maar af en toe voor.",
      },
      {
        value: "standaard",
        label: "Regelmatig",
        description: "Nieuwe mensen moeten zonder veel gedoe kunnen starten.",
      },
      {
        value: "premium",
        label: "Vaak",
        description: "Inwerken en apparaatuitgifte moeten snel en voorspelbaar verlopen.",
      },
      {
        value: "ultimate",
        label: "Continu of op schaal",
        description: "Automatisch uitrollen en duidelijke profielen zijn belangrijk.",
      },
    ],
  },
  {
    id: "reporting",
    title: "Wil je periodiek inzicht in veiligheid en verbeterpunten?",
    help: "Niet technisch, maar wel duidelijk: wat is goed geregeld en wat verdient aandacht?",
    options: [
      {
        value: "instap",
        label: "Niet nodig",
        description: "Alleen actie als er iets speelt.",
      },
      {
        value: "standaard",
        label: "Af en toe",
        description: "Graag inzicht bij veranderingen of twijfel.",
      },
      {
        value: "premium",
        label: "Maandelijks inzicht",
        description: "Je wilt weten hoe de omgeving ervoor staat.",
      },
      {
        value: "ultimate",
        label: "Actief sturen",
        description: "Rapportage moet helpen om risico's en beleid te verbeteren.",
      },
    ],
  },
  {
    id: "mobileAndMac",
    title: "Welke apparaten gebruiken medewerkers naast Windows-laptops?",
    help: "Mobiele telefoons en Macs vragen vaak om aanvullend beleid.",
    options: [
      {
        value: "instap",
        label: "Bijna alleen Windows",
        description: "Mobiel of Mac speelt nauwelijks een rol.",
      },
      {
        value: "standaard",
        label: "Mobiel voor mail en Teams",
        description: "Telefoons worden zakelijk gebruikt, maar niet zwaar beheerd.",
      },
      {
        value: "premium",
        label: "Mobiel is belangrijk",
        description: "Bedrijfsdata op telefoons moet goed afgeschermd zijn.",
      },
      {
        value: "ultimate",
        label: "Ook Mac of gedeelde apparaten",
        description: "Er is meer variatie en dus meer beleid nodig.",
      },
    ],
  },
  {
    id: "supportStyle",
    title: "Hoeveel IT-zorg wil je uit handen geven?",
    help: "Van reactieve hulp tot proactief werkplekbeheer.",
    options: [
      {
        value: "instap",
        label: "Alleen hulp als nodig",
        description: "Jullie regelen zelf veel en schakelen hulp in bij vragen.",
      },
      {
        value: "standaard",
        label: "Normale ondersteuning",
        description: "Medewerkers moeten snel geholpen worden bij praktische problemen.",
      },
      {
        value: "premium",
        label: "Proactief ontzorgen",
        description: "Cloud EEN mag actief meekijken en problemen helpen voorkomen.",
      },
      {
        value: "ultimate",
        label: "Maximale ontzorging",
        description: "IT moet als beheerde dienst voelen, met duidelijke regie.",
      },
    ],
  },
  {
    id: "signatureManagement",
    title: "Moeten e-mailhandtekeningen automatisch netjes en overal hetzelfde zijn?",
    help: "Professioneel handtekeningbeheer zorgt dat elke medewerker dezelfde uitstraling gebruikt. Denk aan logo, disclaimer, telefoonnummer en acties onderaan de mail. Het voordeel: geen rommelige handtekeningen meer en een herkenbare uitstraling naar klanten.",
    options: [
      {
        value: "instap",
        label: "Niet belangrijk",
        description: "Iedereen mag dit zelf blijven instellen.",
      },
      {
        value: "standaard",
        label: "Graag netjes geregeld",
        description: "Een vaste basis voor alle medewerkers is voldoende.",
      },
      {
        value: "premium",
        label: "Belangrijk voor uitstraling",
        description: "Handtekeningen moeten overal kloppen, ook op mobiel en webmail.",
      },
      {
        value: "ultimate",
        label: "Ook voor campagnes",
        description: "Je wilt centraal sturen op vestigingen, functies, disclaimers of tijdelijke banners.",
      },
    ],
  },
  {
    id: "loginBranding",
    title: "Wil je dat medewerkers een herkenbare Cloud EEN-omgeving zien bij het inloggen?",
    help: "Company branding betekent dat logo, kleuren en aanmeldschermen passen bij je bedrijf. Het voordeel: medewerkers herkennen sneller dat ze veilig in de juiste omgeving zitten en phishing valt eerder op.",
    options: [
      {
        value: "instap",
        label: "Mag standaard blijven",
        description: "Een generiek Microsoft-scherm is geen probleem.",
      },
      {
        value: "standaard",
        label: "Logo en kleuren",
        description: "De omgeving moet herkenbaar en professioneel voelen.",
      },
      {
        value: "premium",
        label: "Ook veiligheidssignaal",
        description: "Herkenbaarheid moet helpen om verkeerde inlogschermen sneller te herkennen.",
      },
      {
        value: "ultimate",
        label: "Volledig doorgevoerd",
        description: "Branding moet breed worden toegepast voor meerdere groepen of locaties.",
      },
    ],
  },
  {
    id: "passwordReset",
    title: "Moeten medewerkers zelf veilig hun wachtwoord kunnen herstellen?",
    help: "Self-service wachtwoordherstel laat gebruikers zelf een vergeten wachtwoord opnieuw instellen. Het voordeel: minder wachttijd voor medewerkers en minder kleine supportverzoeken.",
    options: [
      {
        value: "instap",
        label: "Af en toe via support",
        description: "Het gebeurt weinig en mag handmatig.",
      },
      {
        value: "standaard",
        label: "Zelf kunnen herstellen",
        description: "Medewerkers moeten snel weer door kunnen.",
      },
      {
        value: "premium",
        label: "Zelf veilig herstellen",
        description: "Gebruiksgemak is belangrijk, maar veiligheid ook.",
      },
      {
        value: "ultimate",
        label: "Strak beleid per groep",
        description: "Wachtwoordbeleid moet passen bij rollen en risico's.",
      },
    ],
  },
  {
    id: "printing",
    title: "Hoe belangrijk is printen binnen jullie organisatie?",
    help: "Printbeheer zorgt dat printers voorspelbaar werken en medewerkers niet zelf hoeven te puzzelen met instellingen. Het voordeel: minder verstoring op kantoor en sneller hulp bij printerproblemen.",
    options: [
      {
        value: "instap",
        label: "Nauwelijks belangrijk",
        description: "Er wordt weinig geprint.",
      },
      {
        value: "standaard",
        label: "Moet gewoon werken",
        description: "Een paar printers moeten goed bereikbaar zijn.",
      },
      {
        value: "premium",
        label: "Belangrijk proces",
        description: "Printproblemen hebben direct impact op de werkdag.",
      },
      {
        value: "ultimate",
        label: "Meerdere locaties",
        description: "Printen moet per locatie, groep of apparaat goed gestuurd worden.",
      },
    ],
  },
  {
    id: "conditionalAccess",
    title: "Moet inloggen slimmer reageren op risico's?",
    help: "Slim inlogbeleid kijkt bijvoorbeeld naar locatie, apparaat en risicosignalen. Het voordeel: medewerkers werken normaal door, terwijl verdachte situaties extra controle krijgen.",
    options: [
      {
        value: "instap",
        label: "Basiscontrole is genoeg",
        description: "Extra regels zijn nu niet nodig.",
      },
      {
        value: "standaard",
        label: "Meer controle gewenst",
        description: "Inloggen moet veiliger zonder te veel gedoe.",
      },
      {
        value: "premium",
        label: "Risico gestuurd",
        description: "Verdachte aanmeldingen moeten extra gecontroleerd worden.",
      },
      {
        value: "ultimate",
        label: "Beleid per rol",
        description: "Directie, administratie of externe gebruikers vragen om ander beleid.",
      },
    ],
  },
  {
    id: "passwordless",
    title: "Willen jullie minder afhankelijk worden van wachtwoorden?",
    help: "Wachtwoordloos aanmelden gebruikt bijvoorbeeld een app, biometrie of beveiligingssleutel. Het voordeel: veiliger en vaak makkelijker voor medewerkers.",
    options: [
      {
        value: "instap",
        label: "Nog niet nodig",
        description: "Wachtwoorden met extra controle zijn voldoende.",
      },
      {
        value: "standaard",
        label: "Interessant voor later",
        description: "Je wilt dit kunnen bespreken, maar niet direct breed uitrollen.",
      },
      {
        value: "premium",
        label: "Graag invoeren",
        description: "Minder wachtwoordgedoe en betere beveiliging zijn belangrijk.",
      },
      {
        value: "ultimate",
        label: "Voor kritieke rollen",
        description: "Sterke aanmelding is nodig voor gevoelige functies of data.",
      },
    ],
  },
  {
    id: "domainSecurity",
    title: "Hoe belangrijk is bescherming tegen misbruik van jullie domeinnaam?",
    help: "Domeinbeveiliging helpt voorkomen dat criminelen mail sturen alsof die van jullie bedrijf komt. Het voordeel: minder kans op factuurfraude, phishing en reputatieschade.",
    options: [
      {
        value: "instap",
        label: "Basis is voldoende",
        description: "Er is weinig risico of externe maildruk.",
      },
      {
        value: "standaard",
        label: "Moet goed staan",
        description: "Klanten moeten kunnen vertrouwen op jullie e-mail.",
      },
      {
        value: "premium",
        label: "Belangrijk risico",
        description: "Mailfraude of reputatieschade zou veel impact hebben.",
      },
      {
        value: "ultimate",
        label: "Streng bewaken",
        description: "Je wilt maximale controle en periodieke controle op mailveiligheid.",
      },
    ],
  },
  {
    id: "dataEncryption",
    title: "Moeten laptops automatisch versleuteld zijn bij verlies of diefstal?",
    help: "Versleuteling zorgt dat data op een laptop niet leesbaar is als het apparaat kwijtraakt. Het voordeel: veel minder risico op een datalek bij verlies of diefstal.",
    options: [
      {
        value: "instap",
        label: "Beperkt risico",
        description: "Er staat weinig gevoelige data lokaal.",
      },
      {
        value: "standaard",
        label: "Ja, standaard aan",
        description: "Elke laptop moet veilig zijn als die kwijtraakt.",
      },
      {
        value: "premium",
        label: "Ook actief bewaken",
        description: "Je wilt zeker weten dat apparaten versleuteld blijven.",
      },
      {
        value: "ultimate",
        label: "Streng beleid",
        description: "Versleuteling moet per apparaatgroep en rol gecontroleerd worden.",
      },
    ],
  },
  {
    id: "endpointProtection",
    title: "Hoeveel bescherming wil je tegen virussen, verdachte apps en aanvallen op apparaten?",
    help: "Endpointbescherming bewaakt laptops en computers tegen schadelijke software en verdacht gedrag. Het voordeel: aanvallen worden sneller gestopt en je bent minder afhankelijk van oplettende medewerkers.",
    options: [
      {
        value: "instap",
        label: "Basisbescherming",
        description: "Standaard antivirus en basisveiligheid zijn voldoende.",
      },
      {
        value: "standaard",
        label: "Meer zekerheid",
        description: "Apparaten moeten centraal beschermd zijn.",
      },
      {
        value: "premium",
        label: "Actieve bescherming",
        description: "Verdachte signalen moeten zichtbaar worden en opgevolgd kunnen worden.",
      },
      {
        value: "ultimate",
        label: "Maximale controle",
        description: "Beveiliging moet passen bij strengere eisen of gevoelige data.",
      },
    ],
  },
  {
    id: "thirdPartyUpdates",
    title: "Moeten ook niet-Microsoft programma's automatisch bijgewerkt worden?",
    help: "Veel risico's ontstaan via verouderde programma's zoals browsers, PDF-tools of andere zakelijke software. Het voordeel: minder lekken door vergeten updates.",
    options: [
      {
        value: "instap",
        label: "Handmatig is prima",
        description: "Er zijn weinig extra programma's.",
      },
      {
        value: "standaard",
        label: "Graag overzicht",
        description: "Belangrijke programma's moeten niet te lang achterlopen.",
      },
      {
        value: "premium",
        label: "Automatisch bijhouden",
        description: "Updates moeten zoveel mogelijk vanzelf geregeld worden.",
      },
      {
        value: "ultimate",
        label: "Strak patchbeleid",
        description: "Updates moeten per groep, risico en planning beheerd worden.",
      },
    ],
  },
  {
    id: "appDeployment",
    title: "Moeten standaard apps automatisch op computers verschijnen?",
    help: "App-uitrol zorgt dat medewerkers direct de juiste programma's hebben. Het voordeel: minder installatiewerk, minder fouten en sneller starten.",
    options: [
      {
        value: "instap",
        label: "Weinig apps",
        description: "Handmatig installeren is geen probleem.",
      },
      {
        value: "standaard",
        label: "Basis apps automatisch",
        description: "De belangrijkste programma's moeten klaarstaan.",
      },
      {
        value: "premium",
        label: "Per functie geregeld",
        description: "Medewerkers moeten automatisch de apps krijgen die bij hun rol horen.",
      },
      {
        value: "ultimate",
        label: "Volledig beheerd",
        description: "Appbeheer moet schaalbaar zijn voor meerdere teams of locaties.",
      },
    ],
  },
  {
    id: "sharedDevices",
    title: "Gebruiken meerdere medewerkers soms dezelfde computer of werkplek?",
    help: "Gedeelde apparaten vragen om andere instellingen dan persoonlijke laptops. Het voordeel: elke gebruiker krijgt veilig toegang zonder dat data door elkaar loopt.",
    options: [
      {
        value: "instap",
        label: "Nee",
        description: "Iedereen heeft vooral een eigen apparaat.",
      },
      {
        value: "standaard",
        label: "Soms",
        description: "Een gedeelde balie of flexplek komt af en toe voor.",
      },
      {
        value: "premium",
        label: "Regelmatig",
        description: "Gedeelde apparaten moeten goed beheerd worden.",
      },
      {
        value: "ultimate",
        label: "Veel gedeelde plekken",
        description: "Dit is een structureel onderdeel van jullie manier van werken.",
      },
    ],
  },
  {
    id: "dataLoss",
    title: "Moet bedrijfsdata beschermd worden tegen per ongeluk delen of kopieren?",
    help: "Databeveiliging helpt voorkomen dat documenten of klantinformatie zomaar buiten de organisatie terechtkomen. Het voordeel: minder kans op datalekken en meer controle over gevoelige informatie.",
    options: [
      {
        value: "instap",
        label: "Niet direct nodig",
        description: "Er wordt weinig met gevoelige data gewerkt.",
      },
      {
        value: "standaard",
        label: "Basisafspraken",
        description: "Medewerkers moeten vooral duidelijke werkwijzen hebben.",
      },
      {
        value: "premium",
        label: "Technisch beschermen",
        description: "Bedrijfsdata moet beter worden afgeschermd.",
      },
      {
        value: "ultimate",
        label: "Streng beleid",
        description: "Dataregels moeten passen bij rollen, locaties of compliance.",
      },
    ],
  },
  {
    id: "externalSharing",
    title: "Delen jullie regelmatig bestanden met klanten, leveranciers of externe partners?",
    help: "Extern delen kan handig zijn, maar moet gecontroleerd gebeuren. Het voordeel: samenwerken blijft makkelijk, zonder dat links en documenten onbeheerd rondzwerven.",
    options: [
      {
        value: "instap",
        label: "Bijna nooit",
        description: "Extern delen speelt nauwelijks.",
      },
      {
        value: "standaard",
        label: "Af en toe",
        description: "Delen moet makkelijk, maar wel netjes.",
      },
      {
        value: "premium",
        label: "Regelmatig",
        description: "Je wilt grip op wie wat kan zien.",
      },
      {
        value: "ultimate",
        label: "Veel en gevoelig",
        description: "Extern delen moet strak beheerd en controleerbaar zijn.",
      },
    ],
  },
  {
    id: "retention",
    title: "Moeten documenten en e-mails langer bewaard of juist gecontroleerd verwijderd worden?",
    help: "Bewaarbeleid helpt met regels voor bewaren, terugvinden en verwijderen. Het voordeel: minder risico en meer overzicht als informatie later nodig is.",
    options: [
      {
        value: "instap",
        label: "Geen bijzondere eisen",
        description: "Standaard bewaren is voldoende.",
      },
      {
        value: "standaard",
        label: "Graag advies",
        description: "Je wilt weten wat verstandig is.",
      },
      {
        value: "premium",
        label: "Beleid nodig",
        description: "Bewaren en verwijderen moet bewust geregeld worden.",
      },
      {
        value: "ultimate",
        label: "Strenge eisen",
        description: "Er zijn juridische, branche- of compliance-eisen.",
      },
    ],
  },
  {
    id: "teamsCalling",
    title: "Moet bellen of bereikbaarheid aansluiten op de digitale werkplek?",
    help: "Telefonie en Teams kunnen slim samenkomen, zodat medewerkers makkelijker bereikbaar zijn. Het voordeel: minder losse systemen en duidelijker samenwerken.",
    options: [
      {
        value: "instap",
        label: "Niet nodig",
        description: "Telefonie staat los van de werkplek.",
      },
      {
        value: "standaard",
        label: "Misschien handig",
        description: "Bereikbaarheid mag beter aansluiten.",
      },
      {
        value: "premium",
        label: "Belangrijk",
        description: "Bellen, Teams en mobiel werken moeten logisch samenwerken.",
      },
      {
        value: "ultimate",
        label: "Onderdeel van de regie",
        description: "Telefonie, werkplek en meerdere locaties moeten goed op elkaar aansluiten.",
      },
    ],
  },
  {
    id: "onboarding",
    title: "Hoe belangrijk is een soepele start voor nieuwe medewerkers?",
    help: "Een goed ingerichte werkplek zorgt dat nieuwe mensen sneller productief zijn. Het voordeel: minder wachttijd, minder losse lijstjes en een professionelere eerste werkdag.",
    options: [
      {
        value: "instap",
        label: "Komt weinig voor",
        description: "Nieuwe medewerkers starten maar af en toe.",
      },
      {
        value: "standaard",
        label: "Moet netter",
        description: "Nieuwe medewerkers moeten sneller kunnen beginnen.",
      },
      {
        value: "premium",
        label: "Belangrijk proces",
        description: "Onboarding moet voorspelbaar en grotendeels automatisch zijn.",
      },
      {
        value: "ultimate",
        label: "Op schaal",
        description: "Er zijn meerdere rollen, locaties of vaste onboardingprofielen.",
      },
    ],
  },
  {
    id: "offboarding",
    title: "Hoe belangrijk is het veilig afsluiten van accounts bij vertrek?",
    help: "Offboarding betekent dat toegang, data en apparaten netjes worden ingetrokken of overgedragen. Het voordeel: oud-medewerkers houden geen toegang en belangrijke informatie blijft beschikbaar.",
    options: [
      {
        value: "instap",
        label: "Handmatig is genoeg",
        description: "Vertrek komt weinig voor.",
      },
      {
        value: "standaard",
        label: "Checklist nodig",
        description: "Je wilt minder kans op vergeten toegang.",
      },
      {
        value: "premium",
        label: "Actief borgen",
        description: "Accounts en data moeten gecontroleerd worden afgesloten.",
      },
      {
        value: "ultimate",
        label: "Strak proces",
        description: "Offboarding moet beleidsgestuurd en aantoonbaar gebeuren.",
      },
    ],
  },
  {
    id: "compliance",
    title: "Hebben jullie te maken met privacy, audit of branche-eisen?",
    help: "Extra eisen vragen vaak om meer logging, beleid en aantoonbaarheid. Het voordeel: je kunt beter laten zien dat IT zorgvuldig is ingericht.",
    options: [
      {
        value: "instap",
        label: "Nauwelijks",
        description: "Er zijn geen bijzondere eisen.",
      },
      {
        value: "standaard",
        label: "Algemene privacy",
        description: "AVG en normaal zorgvuldig werken zijn belangrijk.",
      },
      {
        value: "premium",
        label: "Regelmatig aantonen",
        description: "Je wilt rapportage en duidelijk beleid.",
      },
      {
        value: "ultimate",
        label: "Strenge eisen",
        description: "Audit, certificering of branche-eisen spelen serieus mee.",
      },
    ],
  },
  {
    id: "securityReview",
    title: "Wil je periodiek samen bepalen welke IT-risico's prioriteit hebben?",
    help: "Een periodieke securitybespreking vertaalt technische signalen naar begrijpelijke keuzes. Het voordeel: je weet waar je aandacht en budget het beste naartoe gaan.",
    options: [
      {
        value: "instap",
        label: "Alleen bij incidenten",
        description: "Geen vaste bespreking nodig.",
      },
      {
        value: "standaard",
        label: "Af en toe sparren",
        description: "Een periodieke check kan nuttig zijn.",
      },
      {
        value: "premium",
        label: "Maandelijks inzicht",
        description: "Je wilt risico's actief volgen.",
      },
      {
        value: "ultimate",
        label: "Vaste regie",
        description: "IT-risico's moeten structureel besproken en opgevolgd worden.",
      },
    ],
  },
  {
    id: "growth",
    title: "Verwacht je dat de organisatie de komende 12 maanden flink verandert?",
    help: "Groei, verhuizing, overnames of nieuwe vestigingen vragen om een werkplek die mee kan bewegen. Het voordeel: minder herwerk en minder IT-rem op groei.",
    options: [
      {
        value: "instap",
        label: "Weinig verandering",
        description: "De organisatie blijft ongeveer gelijk.",
      },
      {
        value: "standaard",
        label: "Rustige groei",
        description: "Er komen wat mensen of apparaten bij.",
      },
      {
        value: "premium",
        label: "Duidelijke groei",
        description: "IT moet schaalbaar en voorspelbaar ingericht worden.",
      },
      {
        value: "ultimate",
        label: "Veel verandering",
        description: "Meerdere locaties, teams of grote wijzigingen zijn waarschijnlijk.",
      },
    ],
  },
  {
    id: "budgetPreference",
    title: "Welke balans zoek je tussen kosten en zekerheid?",
    help: "Een goedkoper pakket kan prima passen, maar betekent soms minder automatisering, minder rapportage of minder proactief beheer. Het voordeel van deze keuze: je ziet bewust wat je wel en niet koopt.",
    options: [
      {
        value: "instap",
        label: "Zo scherp mogelijk",
        description: "Basis moet goed zijn, extra's alleen als het echt nodig is.",
      },
      {
        value: "standaard",
        label: "Beste balans",
        description: "Goede basis met merkbare verbetering in veiligheid en beheer.",
      },
      {
        value: "premium",
        label: "Meer zekerheid",
        description: "Iets meer betalen is prima als het gedoe en risico voorkomt.",
      },
      {
        value: "ultimate",
        label: "Maximaal ontzorgd",
        description: "Zekerheid, regie en schaalbaarheid wegen zwaarder dan de laagste prijs.",
      },
    ],
  },
];

export const workplacePackages: WorkplacePackage[] = [
  {
    id: "instap",
    name: "Instap",
    price: "€ 23,75",
    tagline: "Een veilige basis voor kleine teams die overzichtelijk werken.",
    bestFor: "Organisaties die vooral een nette, veilige cloudwerkplek nodig hebben zonder uitgebreide beheerlaag.",
    includes: [
      "Microsoft 365 als vertrouwde basis voor mail, Teams en Office-apps.",
      "Bestanden veilig samenwerken via OneDrive, SharePoint en Teams.",
      "Basisbeveiliging met meervoudig aanmelden en wachtwoordherstel.",
      "Back-up van Microsoft 365-data.",
      "Basisinrichting voor printers en werken op afstand.",
    ],
    notIncluded: [
      "Uitgebreide apparaatsturing en automatische laptopuitrol.",
      "Maandelijkse securityrapportage.",
      "Geavanceerde bescherming voor mobiele apparaten, Mac of gedeelde devices.",
    ],
    upgradeWhen:
      "Kies Standaard als medewerkers vaker thuiswerken, als je merkuitstraling belangrijk vindt of als apparaten centraal beheerd moeten worden.",
  },
  {
    id: "standaard",
    name: "Standaard",
    price: "€ 41,80",
    tagline: "De logische keuze voor mkb-teams die hybride werken.",
    bestFor: "Bedrijven die veilig willen werken op kantoor en thuis, met herkenbare uitstraling en praktisch beheer.",
    includes: [
      "Alles uit Instap.",
      "Herkenbare bedrijfsomgeving met logo, kleuren en vertrouwde aanmeldschermen.",
      "Professionele e-mailhandtekeningen voor een consistente uitstraling.",
      "Betere bescherming bij inloggen met beleid op basis van situatie.",
      "Versleutelde apparaten en centraal beheer op afstand.",
      "Nieuwe laptops sneller gebruiksklaar maken.",
    ],
    notIncluded: [
      "Proactief werkplekbeheer met actieve opvolging.",
      "Uitgebreide rapportage en extra databeveiliging.",
      "Volledig mobiel beleid of Mac-specifieke werkplekinrichting.",
    ],
    upgradeWhen:
      "Kies Premium als beveiliging, rapportage en proactief beheer belangrijk zijn of als je minder afhankelijk wilt zijn van handmatig IT-werk.",
  },
  {
    id: "premium",
    name: "Premium",
    price: "€ 66,50",
    tagline: "Voor organisaties die zekerheid, grip en minder IT-gedoe willen.",
    bestFor: "Teams met gevoelige data, veel thuiswerken, mobiele apparaten of behoefte aan proactieve controle.",
    includes: [
      "Alles uit Standaard.",
      "Sterkere beveiliging tegen phishing en accountmisbruik.",
      "Maandelijkse securityrapportage in begrijpelijke taal.",
      "Proactief werkplekbeheer: risico's signaleren voordat ze problemen worden.",
      "Automatische updates en extra bescherming van bedrijfsdata.",
      "Beleid voor zakelijk gebruik van mobiele apps en data.",
    ],
    notIncluded: [
      "Uitgebreid beleid voor complexe organisaties met veel rollen of vestigingen.",
      "Volledige Mac-integratie en beheer voor gedeelde of multi-user apparaten.",
    ],
    upgradeWhen:
      "Kies Ultimate als je meerdere vestigingen, veel apparaatvariatie, streng beleid of maximale ontzorging nodig hebt.",
  },
  {
    id: "ultimate",
    name: "Ultimate",
    price: "€ 95,00",
    tagline: "Maximale cloudwerkplek voor organisaties die niets aan toeval willen overlaten.",
    bestFor: "Groeiende of complexe organisaties waar beveiliging, schaalbaarheid en regie cruciaal zijn.",
    includes: [
      "Alles uit Premium.",
      "Uitgebreide logging en extra controle op verdachte situaties.",
      "Geavanceerde bescherming voor data, apparaten en gebruikersgroepen.",
      "Ondersteuning voor Mac, mobiele apparaten en gedeelde werkplekken.",
      "Strakker beleid voor verschillende teams, rollen of locaties.",
      "Meest complete ontzorging rondom cloudwerkplekbeheer.",
    ],
    notIncluded: [
      "Maatwerkprojecten zoals applicatiemigraties, complexe telefonie-integraties of specialistische securitytrajecten vallen buiten de standaard werkplekprijs.",
    ],
    upgradeWhen:
      "Ultimate is vooral zinvol als je omgeving complexer is dan een standaard mkb-werkplek of als compliance en controle zwaar wegen.",
  },
];

export const workplaceComparisonRows: WorkplaceComparisonRow[] = [
  {
    category: "Basis",
    label: "Cloudwerkplek",
    description:
      "De dagelijkse digitale werkplek voor mail, bestanden, samenwerken en werken op afstand.",
    values: {
      instap: "Basis cloudwerkplek",
      standaard: "Hybride cloudwerkplek",
      premium: "Proactief beheerde cloudwerkplek",
      ultimate: "Volledig beheerde cloudwerkplek",
    },
  },
  {
    category: "Basis",
    label: "Microsoft 365",
    description:
      "De vertrouwde basis voor Outlook, Teams, Word, Excel, PowerPoint en veilig samenwerken.",
    values: {
      instap: "Business Standard",
      standaard: "Business Premium",
      premium: "Business Premium",
      ultimate: "Business Premium of enterprise-variant",
    },
  },
  {
    category: "Bestanden",
    label: "Bestanden en samenwerking",
    description:
      "Bestanden delen, samenwerken in documenten en veilig toegang houden via OneDrive, SharePoint en Teams.",
    values: {
      instap: "Inbegrepen",
      standaard: "Inbegrepen",
      premium: "Inbegrepen",
      ultimate: "Inbegrepen met extra beleid",
    },
  },
  {
    category: "Bestanden",
    label: "Back-up van clouddata",
    description:
      "Een extra vangnet voor e-mail, bestanden en Microsoft 365-data als er iets wordt verwijderd of misgaat.",
    values: {
      instap: "Inbegrepen",
      standaard: "Inbegrepen",
      premium: "Inbegrepen",
      ultimate: "Inbegrepen",
    },
  },
  {
    category: "Uitstraling",
    label: "Herkenbare bedrijfsomgeving",
    description:
      "Logo, kleuren en een vertrouwd aanmeldscherm. Medewerkers zien direct dat ze in de juiste bedrijfsomgeving werken.",
    values: {
      instap: "Niet standaard",
      standaard: "Inbegrepen",
      premium: "Inbegrepen",
      ultimate: "Uitgebreid ingericht",
    },
  },
  {
    category: "Uitstraling",
    label: "Professionele e-mailhandtekeningen",
    description:
      "Iedere medewerker gebruikt automatisch dezelfde nette e-mailhandtekening, ook vanaf mobiel of webmail.",
    values: {
      instap: "Niet standaard",
      standaard: "Inbegrepen",
      premium: "Inbegrepen",
      ultimate: "Inbegrepen met extra regels",
    },
  },
  {
    category: "Veiligheid",
    label: "Veilig aanmelden",
    description:
      "Extra controle bij inloggen, zodat een gestolen wachtwoord niet direct toegang geeft tot bedrijfsgegevens.",
    values: {
      instap: "Basiscontrole",
      standaard: "Slimmer beleid",
      premium: "Sterkere bescherming",
      ultimate: "Meest uitgebreid",
    },
  },
  {
    category: "Veiligheid",
    label: "Bescherming tegen phishing en misbruik",
    description:
      "Meer weerstand tegen nep-mails, verdachte aanmeldingen en pogingen om accounts over te nemen.",
    values: {
      instap: "Basis",
      standaard: "Basis plus",
      premium: "Geavanceerd",
      ultimate: "Maximaal",
    },
  },
  {
    category: "Apparaten",
    label: "Beheer van laptops en computers",
    description:
      "Apparaten op afstand instellen, beveiligen, ondersteunen en up-to-date houden.",
    values: {
      instap: "Beperkt",
      standaard: "Centraal beheer",
      premium: "Proactief beheer",
      ultimate: "Beleid per rol of groep",
    },
  },
  {
    category: "Apparaten",
    label: "Nieuwe laptop snel klaarzetten",
    description:
      "Nieuwe medewerkers kunnen sneller starten, omdat instellingen en apps vooraf goed geregeld zijn.",
    values: {
      instap: "Handmatig",
      standaard: "Versneld ingericht",
      premium: "Grotendeels automatisch",
      ultimate: "Volledig gestandaardiseerd",
    },
  },
  {
    category: "Inzicht",
    label: "Securityrapportage",
    description:
      "Begrijpelijk inzicht in de veiligheid van de omgeving en welke verbeterpunten prioriteit hebben.",
    values: {
      instap: "Niet standaard",
      standaard: "Op aanvraag",
      premium: "Maandelijks",
      ultimate: "Maandelijks met regie",
    },
  },
  {
    category: "Inzicht",
    label: "Proactief werkplekbeheer",
    description:
      "Cloud EEN kijkt actief mee naar signalen en helpt problemen voorkomen voordat medewerkers er last van krijgen.",
    values: {
      instap: "Niet standaard",
      standaard: "Reactieve support",
      premium: "Inbegrepen",
      ultimate: "Uitgebreid inbegrepen",
    },
  },
  {
    category: "Mobiel en Mac",
    label: "Mobiele apparaten",
    description:
      "Zakelijke data beter beschermen op telefoons en tablets, zonder privegebruik onnodig lastig te maken.",
    values: {
      instap: "Niet standaard",
      standaard: "Basisgebruik",
      premium: "Inbegrepen",
      ultimate: "Uitgebreid beleid",
    },
  },
  {
    category: "Mobiel en Mac",
    label: "Mac of gedeelde apparaten",
    description:
      "Aanvullende inrichting voor organisaties waar niet iedereen op een standaard Windows-laptop werkt.",
    values: {
      instap: "Niet standaard",
      standaard: "Niet standaard",
      premium: "Beperkt mogelijk",
      ultimate: "Inbegrepen",
    },
  },
];

const valueWeight: Record<WorkplaceAnswerValue, number> = {
  instap: 1,
  standaard: 2,
  premium: 3,
  ultimate: 4,
};

const packagesById = Object.fromEntries(
  workplacePackages.map((item) => [item.id, item]),
) as Record<WorkplacePackageId, WorkplacePackage>;

export function calculateWorkplaceAdvice(
  answers: Record<string, WorkplaceAnswerValue>,
): WorkplaceAdvice {
  const values = workplaceQuestions.map((question) => answers[question.id] ?? "instap");
  const total = values.reduce((sum, value) => sum + valueWeight[value], 0);
  const average = total / workplaceQuestions.length;
  const highIntentCount = values.filter((value) => value === "premium" || value === "ultimate").length;
  const ultimateSignals = values.filter((value) => value === "ultimate").length;

  let primaryId: WorkplacePackageId = "instap";
  if (average >= 3.35 || ultimateSignals >= 3) primaryId = "ultimate";
  else if (average >= 2.45 || highIntentCount >= 4) primaryId = "premium";
  else if (average >= 1.65) primaryId = "standaard";

  let secondaryId: WorkplacePackageId | undefined;
  if (primaryId === "standaard" && highIntentCount >= 3) secondaryId = "premium";
  if (primaryId === "premium" && ultimateSignals >= 2) secondaryId = "ultimate";
  if (primaryId === "instap" && values.includes("standaard")) secondaryId = "standaard";

  const score = Math.round((average / 4) * 100);
  const primary = packagesById[primaryId];
  const secondary = secondaryId ? packagesById[secondaryId] : undefined;

  return {
    primary,
    secondary,
    score,
    answers,
    reason: buildAdviceReason(primaryId, values),
    missing: secondary ? buildMissingText(primaryId, secondary.id) : undefined,
  };
}

function buildAdviceReason(packageId: WorkplacePackageId, values: WorkplaceAnswerValue[]) {
  const securityHeavy = values.includes("premium") || values.includes("ultimate");
  const flexible = values.filter((value) => value === "premium" || value === "ultimate").length >= 3;

  if (packageId === "instap") {
    return "Jullie behoefte lijkt vooral te liggen bij een betrouwbare basis: veilig kunnen mailen, samenwerken en bestanden delen zonder onnodige complexiteit.";
  }
  if (packageId === "standaard") {
    return "Jullie werken waarschijnlijk al op meerdere plekken en willen dat apparaten, uitstraling en veiligheid netter centraal geregeld zijn.";
  }
  if (packageId === "premium") {
    return securityHeavy && flexible
      ? "Jullie hebben duidelijk behoefte aan meer zekerheid: betere bescherming, proactief beheer en inzicht in risico's."
      : "Premium past omdat jullie meer grip willen op beheer, apparaten en continuiteit dan een standaard cloudwerkplek biedt.";
  }
  return "Ultimate past omdat jullie omgeving vraagt om maximale controle, strengere beveiliging en beheer dat meegroeit met meerdere rollen, apparaten of locaties.";
}

function buildMissingText(current: WorkplacePackageId, next: WorkplacePackageId) {
  if (current === "instap" && next === "standaard") {
    return "Met Instap mis je vooral herkenbare bedrijfsuitstraling, centraal apparaatbeheer en extra gemak voor hybride werken.";
  }
  if (current === "standaard" && next === "premium") {
    return "Met Standaard mis je vooral proactief beheer, maandelijkse securityrapportage en sterkere bescherming van bedrijfsdata.";
  }
  if (current === "premium" && next === "ultimate") {
    return "Met Premium mis je vooral de meest uitgebreide regie voor complexe apparaatmixen, Mac-omgevingen, meerdere rollen of streng beleid.";
  }
  return "De hogere optie geeft meer zekerheid en ontzorging, maar is niet altijd nodig voor iedere organisatie.";
}
