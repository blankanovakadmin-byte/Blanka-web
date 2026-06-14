import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Általános Szerződési Feltételek',
  robots: { index: true, follow: true },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="font-display text-xl font-bold text-brand-blue mb-4 pb-2 border-b border-brand-border">
        {title}
      </h2>
      <div className="space-y-3 font-sans text-brand-text text-[15px] leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function InfoTable({ rows }: { rows: [string, string][] }) {
  return (
    <div className="rounded-xl border border-brand-border overflow-hidden mb-4">
      {rows.map(([label, value], i) => (
        <div key={i} className={`flex gap-4 px-4 py-3 ${i % 2 === 0 ? 'bg-brand-bg' : 'bg-white'}`}>
          <span className="font-semibold text-brand-blue min-w-[180px] shrink-0 text-sm">{label}</span>
          <span className="text-brand-text text-sm">{value}</span>
        </div>
      ))}
    </div>
  );
}

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#FEF9EC] border border-[#F5D87A] rounded-xl p-4 text-sm text-[#7A5C00] leading-relaxed my-4">
      {children}
    </div>
  );
}

function BlockQuote({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-brand-purple bg-brand-purple-light rounded-r-xl px-5 py-4 text-sm text-brand-blue italic my-4">
      {children}
    </div>
  );
}

export default function AszfPage() {
  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0 pt-20 bg-brand-bg min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          {/* Header */}
          <div className="mb-10">
            <p className="font-sans text-brand-purple text-sm font-semibold uppercase tracking-widest mb-2">
              Jogi dokumentum
            </p>
            <h1 className="font-display text-4xl font-bold text-brand-blue mb-3">
              Általános Szerződési Feltételek
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-brand-muted font-sans">
              <span>Lybskin Kft. · blankanovak.com</span>
              <span>Hatályos: 2026. május 28-tól</span>
              <span>Verzió: 1.0</span>
            </div>
            <div className="mt-4 bg-white rounded-xl border border-brand-border p-4 text-xs text-brand-muted font-sans leading-relaxed">
              <strong className="text-brand-blue">Jogi alapok:</strong> 2013. évi V. törvény (Ptk.) · 45/2014. (II. 26.) Korm. rendelet · 2001. évi CVIII. törvény (Ektv.) · 1997. évi CLV. törvény (Fgytv.) · 1999. évi LXXVI. törvény (Szjt.) · (EU) 2016/679 rendelet (GDPR)
            </div>
          </div>

          <Section title="1. Szolgáltató adatai (Impresszum)">
            <InfoTable rows={[
              ['Cégnév', 'Lybskin Korlátolt Felelősségű Társaság'],
              ['Rövidített név', 'Lybskin Kft.'],
              ['Székhely', '3300 Eger, Mikes Kelemen utca 21.'],
              ['Cégjegyzékszám', '10-09-026438'],
              ['Adószám', '13473774-2-10'],
              ['Képviselő', 'Novák Blanka, ügyvezető'],
              ['E-mail', 'hello@blankanovak.com'],
              ['Weboldal', 'https://blankanovak.com'],
              ['Tárhelyszolgáltató', 'Vercel Inc., 340 Pine Street Suite 701, San Francisco, CA 94104, USA'],
            ]} />
          </Section>

          <Section title="2. Az ÁSZF hatálya és elfogadása">
            <p><strong>2.1</strong> Jelen Általános Szerződési Feltételek (a továbbiakban: &bdquo;ÁSZF&rdquo;) a Lybskin Kft. által üzemeltetett <strong>blankanovak.com</strong> weboldalon keresztül nyújtott valamennyi szolgáltatásra kiterjednek.</p>
            <p><strong>2.2</strong> A Weboldal használatával, a regisztrációval, a vásárlás megkezdésével, valamint a vásárlást megerősítő checkbox bepipálásával a Felhasználó kifejezetten és visszavonhatatlanul elfogadja jelen ÁSZF feltételeit.</p>
            <p><strong>2.3</strong> Az ÁSZF folyamatosan, ingyenesen elérhető és letölthető a Weboldal <strong>/aszf</strong> aloldalán.</p>
            <p><strong>2.4</strong> A Szolgáltató fenntartja a jogot jelen ÁSZF egyoldalú módosítására. A módosításról a Felhasználókat a Weboldal főoldalán és/vagy hírlevélben értesíti, legalább 15 nappal a hatálybalépés előtt.</p>
          </Section>

          <Section title="3. A Szolgáltató által nyújtott szolgáltatások">
            {[
              ['3.1 Online webinár', 'Előre meghatározott időpontban, élőben tartott online előadás (Zoom platformon keresztül). A webináron való részvétel regisztrációhoz, fizetős webinár esetén díjfizetéshez kötött.'],
              ['3.2 Csoportos online kurzus', 'Meghatározott tematika szerint, előre egyeztetett időbeosztásban tartott, több alkalomból álló online képzés. A kurzushoz való hozzáférés a Systeme.io platformon keresztül biztosított.'],
              ['3.3 Önütemezett online kurzus', 'Előre felvett videóanyagokból, PDF-ekből és egyéb digitális tartalmakból álló, a Felhasználó által saját ütemben elvégezhető képzés. A tartalom a Systeme.io platformon érhető el.'],
              ['3.4 Letölthető digitális termékek', 'Nem tárgyi adathordozón nyújtott digitális tartalom (e-book, munkafüzet, hanganyag, sabloncsomag stb.), amelyet a Felhasználó a vásárlást követően, időkorlátosan (72 órán belül lejáró) letöltési linken keresztül tölthet le.'],
              ['3.5 Ingyenes letölthető anyagok', 'Regisztrációhoz (email cím megadásához) kötött, ingyenes digitális anyagok, amelyek szintén 72 órán belül lejáró linken érhetők el.'],
              ['3.6 1-1 mentorálás', 'Meghatározott időtartamú (30 vagy 60 perces), egyéni online konzultáció, amelyre az időpont a Cal.com foglalási rendszeren keresztül foglalható, és a díjfizetés Stripe-on keresztül történik.'],
              ['3.7 Hírlevél-szolgáltatás', 'Ingyenes feliratkozási lehetőség rendszeres elektronikus hírlevélre. A Felhasználó bármikor leiratkozhat a levelek alján elhelyezett leiratkozási linkre kattintva.'],
            ].map(([title, desc]) => (
              <div key={title} className="bg-white rounded-xl border border-brand-border p-4">
                <p className="font-semibold text-brand-blue mb-1">{title}</p>
                <p className="text-brand-muted">{desc}</p>
              </div>
            ))}
          </Section>

          <Section title="4. A szerződés megkötése">
            <p><strong>4.1</strong> A Weboldal termékeinek és szolgáltatásainak bemutatása nem minősül kötelező érvényű ajánlatnak, hanem felhívás ajánlattételre.</p>
            <p><strong>4.2</strong> A szerződés akkor jön létre, amikor a Felhasználó elfogadja jelen ÁSZF-et (checkbox bepipálásával), a Stripe fizetési rendszeren keresztül a fizetés sikeresen megtörtént, és a Szolgáltató a visszaigazoló e-mailt elküldi.</p>
            <p><strong>4.3</strong> A visszaigazoló e-mail a szerződés létrejöttének igazolása. A visszaigazoló e-mail nem minősül számlának; a számlát a Szolgáltató külön, elektronikus úton juttatja el.</p>
            <p><strong>4.4</strong> A Szolgáltató fenntartja a jogot, hogy megrendelést visszautasítson, különösen akkor, ha a megrendelés adatai hiányosak, hamisak vagy értelmezhetők.</p>
            <p><strong>4.5</strong> A szerződés nem kerül iktatásra; a szerződés tartalmát a jelen ÁSZF, a visszaigazoló e-mail és a megrendelési adatok alkotják.</p>
            <p><strong>4.6</strong> A szerződés nyelve: <strong>magyar</strong>.</p>
          </Section>

          <Section title="5. Árak és fizetési feltételek">
            <p><strong>5.1</strong> Az oldalon feltüntetett árak <strong>bruttó árak</strong>, az alkalmazandó általános forgalmi adót tartalmazzák.</p>
            <p><strong>5.2</strong> A Szolgáltató fenntartja a jogot az árak módosítására. A módosítás a már létrejött szerződéseket nem érinti.</p>
            <p><strong>5.3</strong> A fizetés kizárólag a Stripe fizetési platformon keresztül, bankkártyával (Visa, Mastercard, American Express) lehetséges. A bankkártyaadatokat kizárólag a Stripe, Inc. kezeli; a Szolgáltató ezekhez nem fér hozzá.</p>
            <p><strong>5.4</strong> Előfizetéses (ismétlődő) szolgáltatások esetén a díjat a Stripe a következő számlázási időszak kezdetén automatikusan terheli. Az előfizetés a Felhasználó által bármikor lemondható.</p>
          </Section>

          <Section title="6. Teljesítés: digitális tartalmak és szolgáltatások">
            <Warning>
              <strong>Fontos a digitális tartalom vásárlóinak:</strong> A 45/2014. (II. 26.) Korm. rendelet 29. § (1) bekezdés m) pontja alapján a Felhasználó a megrendelés véglegesítésekor kifejezett, előzetes beleegyezését adja ahhoz, hogy a Szolgáltató a 14 napos elállási határidő lejárta előtt megkezdje a teljesítést. A Felhasználó egyidejűleg tudomásul veszi, hogy e beleegyezésével <strong>elveszíti a 14 napos elállási jogát</strong>. Ezt a kötelező jelölőnégyzettel kell megerősíteni a vásárlás során.
            </Warning>
            <p><strong>6.1 Önütemezett kurzus és letölthető digitális termék:</strong> A teljesítés a sikeres fizetést követő legkésőbb 2 munkanapon belül megkezdődik.</p>
            <p><strong>6.2 Webinár:</strong> A hozzáférés (Zoom link) a regisztrációt és fizetést visszaigazoló e-mailben kerül megküldésre.</p>
            <p><strong>6.3 Csoportos kurzus:</strong> A hozzáférés a kurzus megkezdésének napján aktiválódik a Systeme.io platformon.</p>
            <p><strong>6.4 1-1 Mentorálás:</strong> A konzultáció az egyeztetett időpontban, online (Google Meet vagy Zoom) kerül megtartásra.</p>
            <p><strong>6.5 Letöltési linkek érvényessége:</strong> A letölthető digitális tartalmakhoz generált linkek biztonsági okokból <strong>72 órán belül lejárnak</strong>. Ha a Felhasználó a 72 óra elteltével nem töltötte le a tartalmat, köteles értesíteni a Szolgáltatót a hello@blankanovak.com e-mail címen, aki új linket generál.</p>
          </Section>

          <Section title="7. Elállási jog">
            <p><strong>7.1 A főszabály:</strong> A 45/2014. (II. 26.) Korm. rendelet értelmében a fogyasztónak minősülő Felhasználónak a szerződés megkötésétől számított <strong>14 naptári napon belül</strong> joga van indokolás nélkül elállni a szerződéstől.</p>
            <p><strong>7.2 Elállás kizárása, digitális tartalom:</strong> Letölthető digitális termékek és önütemezett online kurzusok esetén, ha a Felhasználó a vásárlás során kifejezetten beleegyezett a teljesítés azonnali megkezdésébe, és egyidejűleg nyilatkozott arról, hogy ezzel elveszíti elállási jogát.</p>

            <div className="space-y-3">
              {[
                ['Webinár', 'A regisztrációtól számított 14 napon belül, de legkésőbb a webinár kezdete előtt 24 órával: 100% visszatérítés.'],
                ['Csoportos kurzus,7+ nappal előtte', '100% visszatérítés'],
                ['Csoportos kurzus,3–6 nappal előtte', '50% visszatérítés'],
                ['Csoportos kurzus,48 órán belül / utána', 'Nincs visszatérítés'],
                ['1-1 mentorálás,48+ órával előtte', '100% visszatérítés'],
                ['1-1 mentorálás,24–48 órával előtte', '50% visszatérítés'],
                ['1-1 mentorálás,24 órán belül / nem megjelenés', 'Nincs visszatérítés'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center bg-white rounded-lg border border-brand-border px-4 py-2.5 text-sm">
                  <span className="text-brand-blue font-medium">{label}</span>
                  <span className={`text-sm font-semibold ${value.includes('Nincs') ? 'text-brand-coral' : value.includes('50%') ? 'text-[#D97706]' : 'text-green-600'}`}>{value}</span>
                </div>
              ))}
            </div>

            <p className="mt-4"><strong>7.5 Elállási nyilatkozat benyújtása:</strong> E-mailben a <strong>hello@blankanovak.com</strong> címre. Az elállási szándéknak tartalmaznia kell a nevet, a vásárlás időpontját, és egyértelmű elállási nyilatkozatot.</p>
            <BlockQuote>
              &bdquo;Alulírott [Név] kijelentem, hogy elállok a [dátum]-án a blankanovak.com weboldalon vásárolt [termék/szolgáltatás neve] tárgyú szerződéstől. Nevem: [Név], e-mail: [email].&rdquo;
            </BlockQuote>
            <p><strong>7.6</strong> A visszatérítés az elállás beérkezésétől számított <strong>14 naptári napon belül</strong> a Stripe-on keresztül az eredeti fizetési módra történik.</p>
          </Section>

          <Section title="8. Kellékszavatosság és jótállás">
            <p><strong>8.1</strong> A Szolgáltató szavatol azért, hogy a nyújtott digitális tartalom és digitális szolgáltatás megfelel a jogszabályi és a szerződéses követelményeknek.</p>
            <p><strong>8.2</strong> Kellékszavatossági igény esetén a Felhasználó kérheti a hiba kijavítását, megfelelő árleszállítást, vagy, ha a kijavítás nem lehetséges, elállhat a szerződéstől.</p>
            <p><strong>8.3</strong> A kellékszavatossági igényt a hiba felfedezésétől számított <strong>2 éven belül</strong> lehet érvényesíteni (Ptk. 6:163. §).</p>
            <p><strong>8.5</strong> Jelen ÁSZF alapján nyújtott szolgáltatásokra kötelező jótállás nem vonatkozik.</p>
          </Section>

          <Section title="9. Felelősségkorlátozás">
            <p><strong>9.1</strong> A Weboldal tartalma, különösen a kurzusanyagok, a webinárok és a letölthető anyagok <strong>általános tájékoztató jellegűek</strong>, és nem minősülnek szakmai (orvosi, jogi, pénzügyi stb.) tanácsadásnak.</p>
            <p><strong>9.2</strong> A Szolgáltató nem vállal felelősséget a Felhasználó által a tanult ismeretek alkalmazásából eredő döntésekért, a Weboldal átmeneti elérhetetlenségéért, a harmadik fél platformok hibájáért, vagy a Felhasználó oldalán felmerülő technikai problémákért.</p>
            <p><strong>9.3</strong> A Szolgáltató felelőssége szándékos vagy súlyosan gondatlan magatartásból eredő, bizonyított közvetlen károkra korlátozódik, és összegszerűen nem haladhatja meg a Felhasználó által az adott szolgáltatásért ténylegesen kifizetett díj összegét.</p>
            <p><strong>9.4</strong> A Weboldal és annak tartalma szerzői jogi védelem alatt áll (1999. évi LXXVI. törvény). A tartalmak Szolgáltató engedélye nélküli másolása, terjesztése, átdolgozása tilos.</p>
          </Section>

          <Section title="10. Panaszkezelés">
            <p><strong>10.1</strong> Panasz benyújtható: <strong>hello@blankanovak.com</strong> e-mail vagy postai levél: 3300 Eger, Mikes Kelemen utca 21.</p>
            <p><strong>10.2</strong> Az e-mailen beérkező panasz vételét a Szolgáltató haladéktalanul visszaigazolja.</p>
            <p><strong>10.3</strong> A Szolgáltató az írásbeli panaszt <strong>30 naptári napon belül</strong> írásban megválaszolja.</p>
            <p><strong>10.4</strong> Jogorvoslati lehetőségek:</p>
            <div className="bg-white rounded-xl border border-brand-border p-4 space-y-2 text-sm">
              <p><strong>Békéltető Testület:</strong> Heves Vármegyei Kereskedelmi és Iparkamara melletti Békéltető Testület · 3300 Eger, Faiskola út 15. · bekeltetes@hkik.hu</p>
              <p><strong>Fogyasztóvédelmi hatóság:</strong> Nemzeti Kereskedelmi és Fogyasztóvédelmi Hatóság (NKFH) · nkfh.gov.hu</p>
            </div>
          </Section>

          <Section title="11. Szerzői jogok">
            <p><strong>11.1</strong> A Weboldal és valamennyi tartalmának szerzői joga a Lybskin Kft.-t és/vagy Novák Blankát illeti, és az 1999. évi LXXVI. törvény (Szjt.) védelme alatt áll.</p>
            <p><strong>11.2</strong> A tartalmak kizárólag <strong>személyes, nem kereskedelmi célra</strong> használhatók. A tartalmak harmadik féllel való megosztása, árusítása, sokszorosítása, nyilvános lejátszása tilos a Szolgáltató előzetes írásbeli engedélye nélkül.</p>
          </Section>

          <Section title="12–14. Vis maior, alkalmazandó jog, vegyes rendelkezések">
            <p><strong>Vis maior:</strong> A Szolgáltatót nem terheli felelősség, ha kötelezettségeinek teljesítése ellenőrzési körén kívül eső, előre nem látható és elhárítható okból nem lehetséges.</p>
            <p><strong>Alkalmazandó jog:</strong> Jelen ÁSZF-re a <strong>magyar jog</strong> az irányadó, különösen a 2013. évi V. törvény (Ptk.).</p>
            <p><strong>Illetékesség:</strong> A felek közötti esetleges jogvitákban a Pesti Központi Kerületi Bíróság, illetve hatáskörtől függően a Fővárosi Törvényszék rendelkezik kizárólagos illetékességgel.</p>
            <p><strong>Elválaszthatóság:</strong> Ha jelen ÁSZF valamely rendelkezése érvénytelen vagy végrehajthatatlan, az a többi rendelkezés érvényességét nem érinti.</p>
          </Section>

          <div className="bg-brand-purple-light rounded-2xl border border-brand-purple/20 p-6 text-center">
            <p className="font-sans text-brand-muted text-sm">
              Eger, 2026. május 28. · <strong className="text-brand-blue">Lybskin Kft., Novák Blanka, ügyvezető</strong>
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
