import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { CATEGORIES, QUESTIONS } from "../questions";
import type { Intake, Scores } from "../types";
import { zoneFor, zoneHex } from "../scoring";
import { ZONE_LABEL, ZONE_INTRO, TOTAL_SCORE_HEADLINE } from "../zoneText";
import { pickTips, GREEN_FALLBACK } from "../recommendations";

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
  brand: { fontSize: 14, fontWeight: 700, color: "#0078D4" },
  metaText: { fontSize: 9, color: "#64748B" },
  h1: { fontSize: 24, fontWeight: 700, marginTop: 4, marginBottom: 6, color: "#0B1F3A" },
  intro: { color: "#475569", fontSize: 11, marginBottom: 18 },
  totalBox: {
    backgroundColor: "#F4F7FB",
    padding: 18,
    borderRadius: 10,
    marginBottom: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalScore: { fontSize: 44, fontWeight: 700 },
  totalLabel: { fontSize: 10, color: "#475569", marginTop: 4 },
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
});

type Props = { intake: Intake; answers: number[]; scores: Scores };

export function ReportDocument({ intake, answers, scores }: Props) {
  const totalZone = zoneFor(scores.total);
  const answersByQuestionId: Record<string, number> = {};
  answers.forEach((score, idx) => {
    answersByQuestionId[QUESTIONS[idx].id] = score;
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.brandRow}>
          <Text style={styles.brand}>Cloud1 IT-Scan</Text>
          <Text style={styles.metaText}>
            Rapport voor {intake.company} · {new Date().toLocaleDateString("nl-NL")}
          </Text>
        </View>

        <Text style={styles.h1}>Jouw IT in vogelvlucht</Text>
        <Text style={styles.intro}>
          Beste {intake.firstName}, dit is jouw persoonlijke IT-Scan rapport. Op basis van 24
          vragen kijken we naar werkplek, beveiliging, connectiviteit en beheer.
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

        <Text style={styles.sectionTitle}>Wat nu?</Text>
        <Text style={{ ...styles.intro, marginBottom: 6 }}>
          Dit rapport is een gespreksstartdocument. Onze specialisten kijken graag samen met jou
          waar de grootste impact zit — vrijblijvend en zonder verkooppraat.
        </Text>
        <Text style={styles.meta}>Cloud1 · info@cloud1.nl · cloud1.nl</Text>

        <View style={styles.footer} fixed>
          <Text>Cloud1 IT-Scan</Text>
          <Text render={({ pageNumber, totalPages }) => `Pagina ${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}
