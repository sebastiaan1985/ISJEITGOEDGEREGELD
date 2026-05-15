import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacyverklaring | Cloud ÉÉN",
  description: "Lees hoe Cloud ÉÉN omgaat met jouw persoonsgegevens bij gebruik van de IT-Scan.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 md:py-24 text-slate-800">
      <Link href="/" className="text-sm text-[#13AEEB] hover:underline mb-8 inline-block">
        ← Terug naar de IT-Scan
      </Link>

      <h1 className="text-3xl font-bold text-[#0B1F3A] mb-2">Privacyverklaring</h1>
      <p className="text-slate-500 text-sm mb-10">Laatst bijgewerkt: mei 2025</p>

      <section className="space-y-8 text-sm leading-relaxed">
        <div>
          <h2 className="text-lg font-semibold text-[#0B1F3A] mb-2">1. Wie zijn wij?</h2>
          <p>
            Cloud ÉÉN B.V. (hierna: &ldquo;Cloud ÉÉN&rdquo;, &ldquo;wij&rdquo; of &ldquo;ons&rdquo;) is
            verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in deze
            privacyverklaring.
          </p>
          <p className="mt-2">
            <strong>Contactgegevens:</strong><br />
            Cloud ÉÉN B.V.<br />
            E-mail: <a href="mailto:info@cloud1.nl" className="text-[#13AEEB] hover:underline">info@cloud1.nl</a><br />
            Telefoon: 085-4865555
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#0B1F3A] mb-2">2. Welke gegevens verwerken wij?</h2>
          <p>Bij het invullen van de Cloud ÉÉN IT-Scan verwerken wij de volgende persoonsgegevens:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-slate-700">
            <li>Voornaam</li>
            <li>Bedrijfsnaam</li>
            <li>E-mailadres</li>
            <li>Telefoonnummer (optioneel)</li>
            <li>Branche en bedrijfsgrootte</li>
            <li>Aantal Microsoft 365-gebruikers</li>
            <li>Antwoorden op de 24 IT-vragen en de berekende scores</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#0B1F3A] mb-2">3. Doel en grondslag van de verwerking</h2>
          <p>
            Wij verwerken jouw gegevens op basis van <strong>toestemming</strong> (art. 6 lid 1 sub a AVG) en
            op basis van <strong>gerechtvaardigd belang</strong> (art. 6 lid 1 sub f AVG) om:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-slate-700">
            <li>Het IT-Scan rapport te genereren en aan jou te sturen;</li>
            <li>Jou vrijblijvend te benaderen over passende IT-oplossingen;</li>
            <li>De kwaliteit van onze dienstverlening te verbeteren.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#0B1F3A] mb-2">4. Bewaartermijn</h2>
          <p>
            Wij bewaren jouw gegevens maximaal <strong>2 jaar</strong> na het invullen van de scan,
            tenzij je eerder verzoekt om verwijdering. Leads waarmee een klantrelatie is ontstaan,
            worden bewaard conform de wettelijke administratieplicht (7 jaar).
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#0B1F3A] mb-2">5. Delen met derden</h2>
          <p>
            Wij delen jouw gegevens alleen met verwerkers die namens ons diensten uitvoeren en waarmee
            een verwerkersovereenkomst is gesloten:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-slate-700">
            <li><strong>Resend</strong> — voor het verzenden van e-mail (VS; standaardcontractbepalingen van toepassing)</li>
            <li><strong>Supabase</strong> — voor gegevensopslag (EU-regio)</li>
            <li><strong>Vercel</strong> — voor hosting van de applicatie (VS; standaardcontractbepalingen van toepassing)</li>
          </ul>
          <p className="mt-2">Wij verkopen jouw gegevens nooit aan derden.</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#0B1F3A] mb-2">6. Jouw rechten</h2>
          <p>Op grond van de AVG heb je de volgende rechten:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-slate-700">
            <li>Recht op inzage in jouw persoonsgegevens;</li>
            <li>Recht op rectificatie of aanvulling;</li>
            <li>Recht op verwijdering (&ldquo;recht om vergeten te worden&rdquo;);</li>
            <li>Recht op beperking van de verwerking;</li>
            <li>Recht op gegevensoverdraagbaarheid;</li>
            <li>Recht van bezwaar tegen verwerking op basis van gerechtvaardigd belang;</li>
            <li>Recht om toestemming in te trekken.</li>
          </ul>
          <p className="mt-2">
            Stuur hiervoor een e-mail naar{" "}
            <a href="mailto:info@cloud1.nl" className="text-[#13AEEB] hover:underline">info@cloud1.nl</a>.
            Wij reageren binnen 30 dagen. Je hebt ook het recht een klacht in te dienen bij de{" "}
            <a
              href="https://www.autoriteitpersoonsgegevens.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#13AEEB] hover:underline"
            >
              Autoriteit Persoonsgegevens
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#0B1F3A] mb-2">7. Cookies</h2>
          <p>
            Deze website maakt uitsluitend gebruik van <strong>functionele cookies</strong> die nodig zijn
            voor het goed functioneren van de IT-Scan (bijv. het onthouden van jouw cookievoorkeur).
            Er worden geen tracking- of advertentiecookies geplaatst zonder jouw toestemming.
          </p>
          {process.env.NEXT_PUBLIC_GA_ID && (
            <p className="mt-2">
              Met jouw toestemming plaatsen wij ook analytische cookies van Google Analytics (GA4)
              om te begrijpen hoe bezoekers de scan gebruiken. Deze gegevens zijn geanonimiseerd.
            </p>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#0B1F3A] mb-2">8. Beveiliging</h2>
          <p>
            Wij nemen passende technische en organisatorische maatregelen om jouw gegevens te
            beschermen, waaronder versleutelde verbindingen (HTTPS/TLS), toegangsbeheer en
            regelmatige beveiligingsbeoordelingen.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#0B1F3A] mb-2">9. Wijzigingen</h2>
          <p>
            Wij kunnen deze privacyverklaring aanpassen. De meest actuele versie is altijd beschikbaar
            op deze pagina. Bij ingrijpende wijzigingen stellen wij je hier actief van op de hoogte.
          </p>
        </div>
      </section>
    </main>
  );
}
