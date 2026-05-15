import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { CATEGORIES, QUESTIONS } from "../questions";
import type { Intake, Scores } from "../types";
import { zoneFor, zoneHex } from "../scoring";
import { ZONE_LABEL, ZONE_INTRO, TOTAL_SCORE_HEADLINE } from "../zoneText";
import { pickTips, GREEN_FALLBACK } from "../recommendations";
import { buildScanSummary } from "../cloud1OfferMapping";

const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 48,
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#0F172A",
    lineHeight: 1.5,
  },
  brandRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 28 },
  brand: { fontSize: 14, fontWeight: 700, color: "#13AEEB" },
  metaText: { fontSize: 9, color: "#64748B" },
  h1: { fontSize: 24, fontWeight: 700, marginTop: 4, marginBottom: 6, color: "#0B1F3A" },
  intro: { color: "#475569", fontSize: 11, marginBottom: 18 },
  totalBox: {
    backgroundColor: "#F4F7FB",
    padding: 18,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalScore: { fontSize: 44, fontWeight: 700 },
  totalLabel: { fontSize: 10, color: "#475569", marginTop: 4 },
  benchmarkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  benchmarkText: { fontSize: 9, color: "#64748B" },
  benchmarkDiff: { fontSize: 9, fontWeight: 700 },
  riskBox: {
    backgroundColor: "#FEF2F2",
    border: "1pt solid #FECACA",
    borderRadius: 6,
    padding: 8,
    marginTop: 5,
    marginBottom: 4,
  },
  riskLabel: { fontSize: 8, fontWeight: 700, color: "#991B1B", marginBottom: 2 },
  riskText: { fontSize: 9, color: "#7F1D1D", lineHeight: 1.4 },
  stepBox: {
    backgroundColor: "#F0FDF4",
    border: "1pt solid #BBF7D0",
    borderRadius: 6,
    padding: 8,
    marginBottom: 2,
  },
  stepLabel: { fontSize: 8, fontWeight: 700, color: "#166534", marginBottom: 2 },
  stepText: { fontSize: 9, color: "#14532D", lineHeight: 1.4 },
  catCard: {
    border: "1pt solid #E2E8F0",
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },
  catRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  catTitle: { fontSize: 12, fontWeight: 700, color: "#0B1F3A" },
  catScore: { fontSize: 20, fontWeight: 700 },
  badge: { fontSize: 9, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 999, color: "#FFFFFF" },
  zoneIntro: { fontSize: 10, color: "#475569", marginTop: 6, marginBottom: 8 },
  tip: { fontSize: 10, color: "#0F172A", marginTop: 4, paddingLeft: 8 },
  sectionTitle: { fontSize: 14, fontWeight: 700, color: "#0B1F3A", marginTop: 12, marginBottom: 10 },
  meta: { fontSize: 10, color: "#475569" },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 48,
    right: 48,
    fontSize: 9,
    color: "#94A3B8",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // Conversation summary page styles
  agendaPage: {
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 48,
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#0F172A",
    lineHeight: 1.5,
  },
  agendaHeader: {
    backgroundColor: "#0B1F3A",
    borderRadius: 10,
    padding: 22,
    marginBottom: 24,
  },
  agendaHeaderTitle: { fontSize: 18, fontWeight: 700, color: "#FFFFFF", marginBottom: 4 },
  agendaHeaderSub: { fontSize: 10, color: "#94A3B8" },
  agendaScoreRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  agendaScoreBox: {
    flex: 1,
    border: "1pt solid #E2E8F0",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  agendaScoreLabel: { fontSize: 9, color: "#64748B", marginBottom: 3 },
  agendaScoreValue: { fontSize: 18, fontWeight: 700 },
  agendaBlock: {
    border: "1pt solid #E2E8F0",
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },
  agendaBlockTitle: { fontSize: 11, fontWeight: 700, color: "#0B1F3A", marginBottom: 6 },
  agendaItem: { fontSize: 10, color: "#334155", marginTop: 3, paddingLeft: 6 },
  agendaNote: { fontSize: 9, color: "#94A3B8", marginTop: 16, textAlign: "center" },
  perfectBox: {
    backgroundColor: "#F0FDF4",
    border: "1pt solid #86EFAC",
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
  },
  perfectTitle: { fontSize: 12, fontWeight: 700, color: "#166534", marginBottom: 4 },
  perfectText: { fontSize: 10, color: "#166534" },
});

const ALWAYS_DISCUSS = [
  "Beveiliging & onderhoud: zijn alle instellingen, beleid en licenties nog actueel?",
  "Back-up & hersteltest: wanneer is voor het laatste een volledig herstel getest?",
  "Hardware levenscyclus: zijn er apparaten die toe zijn aan vervanging?",
  "Leveranciers & contracten: lopen er contracten die verlopen of geoptimaliseerd kunnen worden?",
  "Kosten per medewerker: betaalt u voor het juiste serviceniveau, niet te veel en niet te weinig?",
  "IT-roadmap: sluit de huidige IT-setup nog aan bij groei- en veranderplannen?",
  "Microsoft Copilot & AI: welke mogelijkheden passen bij de werkwijze van de organisatie?",
];

type Props = { intake: Intake; answers: number[]; scores: Scores };

export function ReportDocument({ intake, answers, scores }: Props) {
  const totalZone = zoneFor(scores.total);
  const summary = buildScanSummary(answers, scores);
  const answersByQuestionId: Record<string, number> = {};
  answers.forEach((score, idx) => {
    answersByQuestionId[QUESTIONS[idx].id] = score;
  });

  const isPerfect = summary.topPriorities.length === 0;

  return (
    <Document>
      {/* ── Pagina 1: Scores & prioriteiten ── */}
      <Page size="A4" style={styles.page}>
        <View style={styles.brandRow}>
          <Text style={styles.brand}>Cloud ÉÉN IT-Scan</Text>
          <Text style={styles.metaText}>
            Rapport voor {intake.company} · {new Date().toLocaleDateString("nl-NL")}
          </Text>
        </View>

        <Text style={styles.h1}>Jouw IT-rapport</Text>
        <Text style={styles.intro}>
          Beste {intake.firstName}, op basis van 32 vragen over werkplek, beveiliging,
          connectiviteit en beheer krijg je hier een eerlijk beeld van waar je staat — en
          wat je concreet kunt doen.
        </Text>

        <View style={styles.totalBox}>
          <View>
            <Text style={{ ...styles.totalScore, color: zoneHex(totalZone) }}>{scores.total}</Text>
            <Text style={styles.totalLabel}>Totaalscore · {TOTAL_SCORE_HEADLINE[totalZone]}</Text>
          </View>
          <View
            style={{
              ...styles.badge,
              backgroundColor: zoneHex(totalZone),
              fontSize: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            <Text>{ZONE_LABEL[totalZone]}</Text>
          </View>
        </View>

        {/* Benchmark */}
        <View style={styles.benchmarkRow}>
          <Text style={styles.benchmarkText}>MKB-gemiddelde: 54/100  ·  </Text>
          <Text style={{
            ...styles.benchmarkDiff,
            color: scores.total >= 54 ? "#059669" : "#DC2626",
          }}>
            {scores.total >= 54
              ? `+${scores.total - 54} boven gemiddeld`
              : `${scores.total - 54} onder gemiddeld`}
          </Text>
        </View>

        {isPerfect ? (
          <View style={styles.perfectBox}>
            <Text style={styles.perfectTitle}>Alles staat op groen — uitzonderlijk resultaat!</Text>
            <Text style={styles.perfectText}>
              Op basis van jouw antwoorden scoort {intake.company} op alle onderdelen maximaal. Toch loont
              het om dit periodiek te toetsen: technologie en dreigingen veranderen, en zelfs een sterke
              basis vraagt om onderhoud en optimalisatie. Zie de gespreksagenda op de laatste pagina.
            </Text>
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Jouw top 5 — dit vraagt als eerste aandacht</Text>
            {summary.topPriorities.map((item, index) => (
              <View key={item.id} style={styles.catCard} wrap={false}>
                <Text style={styles.catTitle}>
                  {index + 1}. {item.question}
                </Text>
                <Text style={{ fontSize: 9, color: "#64748B", marginTop: 2, marginBottom: 6 }}>
                  {item.category} · score {item.score}/100
                </Text>
                <View style={styles.riskBox}>
                  <Text style={styles.riskLabel}>Wat kan er misgaan?</Text>
                  <Text style={styles.riskText}>{item.risk}</Text>
                </View>
                <View style={styles.stepBox}>
                  <Text style={styles.stepLabel}>Eerste stap die je zelf kunt zetten</Text>
                  <Text style={styles.stepText}>{item.firstStep}</Text>
                </View>
              </View>
            ))}
          </>
        )}

        <Text style={styles.sectionTitle}>Resultaten per categorie</Text>

        {scores.perCategory.map((catScore, i) => {
          const zone = zoneFor(catScore);
          const tips = pickTips(answersByQuestionId, i as 0 | 1 | 2 | 3);
          return (
            <View key={i} style={styles.catCard} wrap={false}>
              <View style={styles.catRow}>
                <Text style={styles.catTitle}>{CATEGORIES[i]}</Text>
                <Text style={{ ...styles.catScore, color: zoneHex(zone) }}>{catScore} / 100</Text>
              </View>
              <Text style={styles.zoneIntro}>{ZONE_INTRO[zone]}</Text>
              {tips.length > 0 ? (
                tips.map((tip, j) => (
                  <Text key={j} style={styles.tip}>
                    • {tip}
                  </Text>
                ))
              ) : (
                <Text style={styles.tip}>• {GREEN_FALLBACK}</Text>
              )}
            </View>
          );
        })}

        <Text style={styles.sectionTitle}>Wil je dit samen doorlopen?</Text>
        <Text style={{ ...styles.intro, marginBottom: 6 }}>
          De stappen hierboven kun je zelf oppakken. Als je wilt dat iemand meedenkt — zonder
          verkooppraat — dan plannen onze specialisten graag een kort gesprek in.
        </Text>
        <Text style={styles.meta}>Cloud ÉÉN · info@cloud1.nl · 085-4865555 · cloud1.nl</Text>

        <View style={styles.footer} fixed>
          <Text>Cloud ÉÉN IT-Scan</Text>
          <Text render={({ pageNumber, totalPages }) => `Pagina ${pageNumber} / ${totalPages}`} />
        </View>
      </Page>

      {/* ── Pagina 2: Gespreksagenda voor de consultant ── */}
      <Page size="A4" style={styles.agendaPage}>
        <View style={styles.agendaHeader}>
          <Text style={styles.agendaHeaderTitle}>Gespreksagenda — voor de Cloud ÉÉN consultant</Text>
          <Text style={styles.agendaHeaderSub}>
            {intake.company} · {intake.firstName} · {new Date().toLocaleDateString("nl-NL")}
          </Text>
        </View>

        {/* Scoretabel */}
        <View style={styles.agendaScoreRow}>
          {scores.perCategory.map((s, i) => (
            <View key={i} style={styles.agendaScoreBox}>
              <Text style={styles.agendaScoreLabel}>{CATEGORIES[i].split(" & ")[0]}</Text>
              <Text style={{ ...styles.agendaScoreValue, color: zoneHex(zoneFor(s)) }}>{s}</Text>
            </View>
          ))}
          <View style={{ ...styles.agendaScoreBox, backgroundColor: "#F4F7FB" }}>
            <Text style={styles.agendaScoreLabel}>Totaal</Text>
            <Text style={{ ...styles.agendaScoreValue, color: zoneHex(totalZone) }}>{scores.total}</Text>
          </View>
        </View>

        {/* Verbeterpunten uit de scan */}
        {!isPerfect && summary.topPriorities.length > 0 && (
          <View style={styles.agendaBlock} wrap={false}>
            <Text style={styles.agendaBlockTitle}>
              Verbeterpunten uit de scan (bespreek prioriteit en aanpak)
            </Text>
            {summary.topPriorities.map((item, i) => (
              <Text key={item.id} style={styles.agendaItem}>
                {i + 1}. {item.question} ({item.category} — score {item.score}/100)
              </Text>
            ))}
          </View>
        )}

        {/* Vaste gespreksonderwerpen */}
        <View style={styles.agendaBlock} wrap={false}>
          <Text style={styles.agendaBlockTitle}>
            Altijd te bespreken — ongeacht de score
          </Text>
          {ALWAYS_DISCUSS.map((point, i) => (
            <Text key={i} style={styles.agendaItem}>• {point}</Text>
          ))}
        </View>

        {/* Pakketadvies */}
        <View style={{ ...styles.agendaBlock, backgroundColor: "#F8FAFC" }} wrap={false}>
          <Text style={styles.agendaBlockTitle}>Aanbevolen vervolgstap</Text>
          <Text style={{ ...styles.agendaItem, fontWeight: 700, marginBottom: 4 }}>
            {summary.packageAdvice.title}
          </Text>
          <Text style={styles.agendaItem}>{summary.packageAdvice.summary}</Text>
          {summary.packageAdvice.recommendedFollowUp.map((step, i) => (
            <Text key={i} style={{ ...styles.agendaItem, marginTop: 5 }}>✓ {step}</Text>
          ))}
        </View>

        {/* Klantgegevens */}
        <View style={styles.agendaBlock} wrap={false}>
          <Text style={styles.agendaBlockTitle}>Klantgegevens</Text>
          <Text style={styles.agendaItem}>Naam: {intake.firstName}</Text>
          <Text style={styles.agendaItem}>Bedrijf: {intake.company}</Text>
          <Text style={styles.agendaItem}>E-mail: {intake.email}</Text>
          {intake.phone && <Text style={styles.agendaItem}>Telefoon: {intake.phone}</Text>}
          <Text style={styles.agendaItem}>Branche: {intake.industry}</Text>
          <Text style={styles.agendaItem}>Medewerkers: {intake.size} · M365-gebruikers: {intake.m365Users}</Text>
        </View>

        <Text style={styles.agendaNote}>
          Cloud ÉÉN · info@cloud1.nl · 085-4865555 · cloud1.nl
        </Text>

        <View style={styles.footer} fixed>
          <Text>Cloud ÉÉN IT-Scan — Gespreksagenda</Text>
          <Text render={({ pageNumber, totalPages }) => `Pagina ${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}
