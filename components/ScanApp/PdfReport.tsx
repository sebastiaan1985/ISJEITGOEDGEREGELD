import React from "react";
import { Document, Image, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { buildScanSummary } from "@/lib/cloud1OfferMapping";
import type { Intake, Scores } from "@/lib/types";

const styles = StyleSheet.create({
  page: {
    padding: 36,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
    color: "#0f172a",
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: "#13AEEB",
    paddingBottom: 16,
    marginBottom: 20,
  },
  logo: { width: 104, height: 40, objectFit: "contain", marginBottom: 10 },
  title: { fontSize: 25, fontWeight: "bold", color: "#0B1F3A" },
  subtitle: { marginTop: 6, fontSize: 10, color: "#64748b", lineHeight: 1.4 },
  row: { flexDirection: "row", gap: 12 },
  scoreBox: {
    width: "36%",
    padding: 18,
    backgroundColor: "#F0F9FF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#BAE6FD",
  },
  score: { fontSize: 38, fontWeight: "bold", color: "#13AEEB" },
  scoreLabel: { marginTop: 6, fontSize: 9, color: "#475569", textTransform: "uppercase" },
  introBox: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: "#0B1F3A",
  },
  paragraph: { fontSize: 10.5, color: "#334155", lineHeight: 1.45 },
  smallText: { fontSize: 9, color: "#64748b", lineHeight: 1.4 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  categoryCard: {
    width: "48%",
    padding: 12,
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#13AEEB",
  },
  cardTitle: { fontSize: 10.5, fontWeight: "bold", color: "#0f172a" },
  cardScore: { marginTop: 4, fontSize: 10, fontWeight: "bold", color: "#13AEEB" },
  priorityCard: {
    marginBottom: 10,
    padding: 11,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  riskBox: {
    marginTop: 6,
    padding: 8,
    backgroundColor: "#FEF2F2",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  riskLabel: { fontSize: 8, fontWeight: "bold", color: "#991B1B", marginBottom: 2 },
  riskText: { fontSize: 9, color: "#7F1D1D", lineHeight: 1.4 },
  stepBox: {
    marginTop: 5,
    padding: 8,
    backgroundColor: "#F0FDF4",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  stepLabel: { fontSize: 8, fontWeight: "bold", color: "#166534", marginBottom: 2 },
  stepText: { fontSize: 9, color: "#14532D", lineHeight: 1.4 },
  benchmarkRow: {
    marginTop: 8,
    flexDirection: "row",
    gap: 6,
  },
  benchmarkText: { fontSize: 9, color: "#64748B" },
  benchmarkDiff: { fontSize: 9, fontWeight: "bold" },
  questionCard: {
    marginBottom: 8,
    padding: 11,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  questionCardHigh: {
    borderColor: "#FCA5A5",
    backgroundColor: "#FEF2F2",
  },
  label: { fontSize: 8, fontWeight: "bold", color: "#64748b", textTransform: "uppercase" },
  questionTitle: { marginTop: 3, fontSize: 10, fontWeight: "bold", color: "#0f172a", lineHeight: 1.3 },
  answer: { marginTop: 4, fontSize: 9, color: "#475569", lineHeight: 1.35 },
  adviceLine: { marginTop: 5, fontSize: 9, color: "#334155", lineHeight: 1.35 },
  cloudBox: {
    marginTop: 12,
    padding: 16,
    backgroundColor: "#0B1F3A",
    borderRadius: 10,
  },
  cloudTitle: { fontSize: 14, fontWeight: "bold", color: "#ffffff" },
  cloudText: { marginTop: 7, fontSize: 10, color: "#CBD5E1", lineHeight: 1.45 },
  bullet: { marginTop: 5, fontSize: 9.5, color: "#E0F2FE", lineHeight: 1.4 },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 36,
    right: 36,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    fontSize: 8,
    color: "#94A3B8",
    textAlign: "center",
  },
});

type Props = {
  intake: Intake;
  answers: number[];
  scores: Scores;
  industryTip: { headline: string; tip: string } | null;
};

const categoryNames = [
  "Werkplek & Apparaten",
  "Beveiliging & Back-up",
  "Connectiviteit & Telefonie",
  "Beheer & Ondersteuning",
];

function categoryFeedback(score: number) {
  if (score < 60) return "Hier liggen duidelijke verbeterkansen. Start met de meest risicovolle punten.";
  if (score < 80) return "De basis staat, maar gerichte aanscherping maakt dit betrouwbaarder.";
  return "Sterke basis. Blijf dit periodiek toetsen zodat instellingen actueel blijven.";
}

function buildNarrative(
  firstName: string,
  company: string,
  totalScore: number,
  perCategory: number[],
): string {
  const weakest = perCategory
    .map((s, i) => ({ name: categoryNames[i], score: s }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 2);

  let zone = "";
  if (totalScore < 50) zone = "meerdere urgente aandachtspunten";
  else if (totalScore < 75) zone = "een solide basis met concrete verbeterkansen";
  else zone = "een sterke IT-basis";

  const weakStr = weakest
    .filter((w) => w.score < 90)
    .map((w) => `${w.name} (${w.score}/100)`)
    .join(" en ");

  let intro = `${firstName}, op basis van 32 vragen over de IT-omgeving van ${company} zien we ${zone}. `;

  if (weakStr) {
    intro += `De meeste aandacht verdienen ${weakStr}. `;
  }

  if (totalScore < 50) {
    intro += `Een totaalscore van ${totalScore}/100 geeft aan dat er risico's zijn die — als ze niet worden aangepakt — tot uitval, dataverlies of beveiligingsincidenten kunnen leiden. De goede nieuws: de meeste verbeteringen zijn concreet en uitvoerbaar.`;
  } else if (totalScore < 75) {
    intro += `Met een score van ${totalScore}/100 sta je boven het MKB-gemiddelde van 54. De gerichte aandachtspunten in dit rapport helpen je van goed naar sterk.`;
  } else {
    intro += `Met een score van ${totalScore}/100 behoort ${company} tot de best beveiligde MKB-organisaties. Blijf dit periodiek toetsen — technologie en dreigingen veranderen ook als jij stilstaat.`;
  }

  return intro;
}

export const PdfReport = ({ intake, answers, scores, industryTip }: Props) => {
  const summary = buildScanSummary(answers, scores);
  const narrative = buildNarrative(intake.firstName, intake.company, scores.total, scores.perCategory);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src="/cloud1-logo-blue.png" style={styles.logo} />
          <Text style={styles.title}>IT-Scan Rapport — {intake.company}</Text>
          <Text style={styles.subtitle}>
            Persoonlijk rapport voor {intake.firstName} · {new Date().toLocaleDateString("nl-NL")} · Praktische diagnose, geen formele audit.
          </Text>
        </View>

        <View style={styles.row}>
          <View style={styles.scoreBox}>
            <Text style={styles.score}>{scores.total}/100</Text>
            <Text style={styles.scoreLabel}>IT-volwassenheid</Text>
          </View>
          <View style={styles.introBox}>
            <Text style={styles.cardTitle}>Jouw situatie in één oogopslag</Text>
            <Text style={styles.paragraph}>{narrative}</Text>
            <View style={styles.benchmarkRow}>
              <Text style={styles.benchmarkText}>MKB-gemiddelde: 54/100 —</Text>
              <Text style={{
                ...styles.benchmarkDiff,
                color: scores.total >= 54 ? "#059669" : "#DC2626",
              }}>
                {scores.total >= 54
                  ? `jij scoort +${scores.total - 54} boven gemiddeld`
                  : `jij scoort ${scores.total - 54} onder gemiddeld`}
              </Text>
            </View>
            {industryTip && (
              <Text style={[styles.smallText, { marginTop: 8 }]}>
                {industryTip.headline}: {industryTip.tip}
              </Text>
            )}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Scores per categorie</Text>
        <View style={styles.grid}>
          {scores.perCategory.map((catScore, index) => (
            <View key={categoryNames[index]} style={styles.categoryCard}>
              <Text style={styles.cardTitle}>{categoryNames[index]}</Text>
              <Text style={styles.cardScore}>{catScore}/100</Text>
              <Text style={[styles.smallText, { marginTop: 6 }]}>{categoryFeedback(catScore)}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Top 5 — dit vraagt als eerste aandacht</Text>
        {summary.topPriorities.map((item, index) => (
          <View key={item.id} style={styles.priorityCard} wrap={false}>
            <Text style={styles.label}>
              {index + 1}. {item.category} — score {item.score}/100
            </Text>
            <Text style={styles.questionTitle}>{item.question}</Text>
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

        <View style={styles.cloudBox} wrap={false}>
          <Text style={styles.cloudTitle}>{summary.packageAdvice.title}</Text>
          <Text style={styles.cloudText}>{summary.packageAdvice.summary}</Text>
          {summary.packageAdvice.recommendedFollowUp.map((step) => (
            <Text key={step} style={styles.bullet}>
              - {step}
            </Text>
          ))}
        </View>

        <Text style={styles.footer} fixed>
          Cloud ÉÉN B.V. | 085-4865555 | info@cloud1.nl | Werkplek, security, telefonie en
          connectiviteit voor MKB-organisaties.
        </Text>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src="/cloud1-logo-blue.png" style={styles.logo} />
          <Text style={styles.title}>Advies per vraag</Text>
          <Text style={styles.subtitle}>
            Compact overzicht van de gekozen situatie, het mogelijke gevolg en een praktische
            verbeterstap.
          </Text>
        </View>

        {summary.questionResults.map((item) => (
          <View
            key={item.id}
            style={item.score < 67 ? [styles.questionCard, styles.questionCardHigh] : styles.questionCard}
            wrap={false}
          >
            <Text style={styles.label}>
              {item.id} — {item.category} — score {item.score}/100
            </Text>
            <Text style={styles.questionTitle}>{item.question}</Text>
            <Text style={styles.answer}>Jouw situatie: {item.selectedAnswer}</Text>
            {item.score < 100 && (
              <>
                <Text style={[styles.adviceLine, { marginTop: 5, color: "#7F1D1D" }]}>
                  Risico: {item.risk}
                </Text>
                <Text style={[styles.adviceLine, { color: "#166534" }]}>
                  Eerste stap: {item.firstStep}
                </Text>
              </>
            )}
          </View>
        ))}

        <Text style={styles.footer} fixed>
          Cloud ÉÉN B.V. | 085-4865555 | info@cloud1.nl | Werkplek, security, telefonie en
          connectiviteit voor MKB-organisaties.
        </Text>
      </Page>
    </Document>
  );
};
