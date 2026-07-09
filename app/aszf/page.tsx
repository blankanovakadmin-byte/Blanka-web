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

export default function AszfPage() {
  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0 pt-20 bg-brand-bg min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <div className="mb-10">
            <p className="font-sans text-brand-purple text-sm font-semibold uppercase tracking-widest mb-2">
              Jogi dokumentum
            </p>
            <h1 className="font-display text-4xl font-bold text-brand-blue mb-3">
              Általános Szerződési Feltételek
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-brand-muted font-sans">
              <span>Lybskin Kft. · blankanovak.com</span>
            </div>
          </div>

          <Section title="1. Szolgáltató adatai">
            <InfoTable rows={[
              ['Cégnév', 'Lybskin Kft.'],
              ['Székhely', '3300 Eger, Mikes Kelemen utca 21.'],
              ['Adószám', '13473774-2-10'],
              ['E-mail cím', 'blankanovak.info@gmail.com'],
              ['Weboldal', 'www.blankanovak.com'],
            ]} />
          </Section>

          <Section title="2. A szolgáltatások köre és igénybevételük feltételei">
            <p>A Szolgáltató által nyújtott szolgáltatások online oktatási, nyelvi fejlesztési és tanácsadási tevékenységet foglalnak magukban. Az egyes szolgáltatások részletes feltételeit az alábbi pontok szabályozzák:</p>

            <h3 className="font-semibold text-brand-blue mt-6 mb-2">2.1. &bdquo;Magabiztosan Angolul&rdquo; online kurzus</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>A kurzus jogilag digitális tartalomnak minősül.</li>
              <li>A tananyagokhoz való hozzáférés a sikeres fizetést (a díj jóváírását) követően automatikusan vagy egyedi aktiválással kerül biztosításra.</li>
              <li>A kurzus anyagai a vásárlástól számított 3 hónapig (90 napig) érhetők el a résztvevő számára.</li>
              <li>A hozzáférés személyhez kötött, kizárólag a vásárló saját használatára szolgál, más személyre át nem ruházható és meg nem osztható.</li>
            </ul>

            <h3 className="font-semibold text-brand-blue mt-6 mb-2">2.2. &bdquo;Stratégia Neked&rdquo; – személyes nyelvtanulási tanácsadás</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>A tanácsadás egyedi, online formában történő konzultáció, melynek időtartama alkalmanként 45 perc.</li>
              <li>Az alkalom időpontja a Felek előzetes egyeztetése alapján kerül kijelölésre.</li>
              <li>Lemondás és módosítás: Az időpont módosítása vagy lemondása legkésőbb a kitűzött időpont előtt 48 órával kezdeményezhető. 48 órán belüli lemondás, módosítási kísérlet vagy meg nem jelenés esetén az alkalom megtartottnak minősül, és a szolgáltatás díja nem visszatéríthető.</li>
            </ul>

            <h3 className="font-semibold text-brand-blue mt-6 mb-2">2.3. Kiscsoportos havi mentorprogram</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>A program havi előfizetéses rendszerben működik. A részvételi díj minden hónapban automatikusan megújul mindaddig, amíg a résztvevő az előfizetést szabályszerűen le nem mondja.</li>
              <li>A mentorprogram havi 4 darab, egyenként 45 perces online csoportos alkalmat tartalmaz.</li>
              <li>Hiányzás: Amennyiben a résztvevő valamely csoportos alkalmon nem tud megjelenni, utólagos pótlásra, egyéni konzultáció biztosítására vagy időarányos díjvisszatérítésre nincs lehetőség. Az adott hónaphoz kapcsolódó tananyagok és segédanyagok azonban továbbra is elérhetők maradnak.</li>
            </ul>

            <h3 className="font-semibold text-brand-blue mt-6 mb-2">2.4. Privát havi mentorprogram</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>A program havi előfizetéses rendszerben működik, és havi 2 darab, egyenként 75 perces online egyéni mentoralkalmat tartalmaz.</li>
              <li>A havi időpontokat előre, a Felek közös egyeztetése alapján kell rögzíteni.</li>
              <li>Lemondás és módosítás: Az időpont módosítása vagy lemondása legkésőbb a kitűzött időpont előtt 48 órával kezdeményezhető. 48 órán belüli lemondás, módosítási kísérlet vagy meg nem jelenés esetén az alkalom megtartottnak minősül, és a szolgáltatás díja nem visszatéríthető.</li>
              <li>Az előfizetési díj automatikusan megújul a következő számlázási időszakra, amíg lemondásra nem kerül.</li>
            </ul>

            <h3 className="font-semibold text-brand-blue mt-6 mb-2">2.5. Technikai feltételek és környezet</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>A szolgáltatások igénybevételéhez a Felhasználó köteles megfelelő internetkapcsolattal, működő számítógéppel vagy mobil eszközzel, valamint a szükséges szoftveres háttérrel rendelkezni.</li>
              <li>A Szolgáltató nem felel a Felhasználó saját technikai környezetéből eredő hibákért, internetkapcsolati problémákért vagy eszközhibákért.</li>
              <li>Késés szabályozása: A Felhasználó késése esetén az online alkalmak a tervezett időpontban kezdődnek és az eredeti időpontban végződnek. A késés időtartamával az alkalom nem hosszabbodik meg.</li>
            </ul>
          </Section>

          <Section title="3. Elektronikus szerződéskötés és fizetési feltételek">
            <h3 className="font-semibold text-brand-blue mb-2">3.1. A szerződés létrejötte</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>A www.blankanovak.com weboldalon keresztül történő megrendelés elektronikus úton kötött szerződésnek minősül (a fogyasztó és a vállalkozás közötti szerződések részletes szabályairól szóló 45/2014. (II.26.) Korm. rendelet alapján).</li>
              <li>A megrendelés elküldésével a Felhasználó ajánlatot tesz a kiválasztott szolgáltatás megvásárlására.</li>
              <li>A szerződés akkor jön létre, amikor a Szolgáltató a megrendelést elektronikus úton (e-mailben) kifejezetten visszaigazolja.</li>
              <li>A megrendelés elküldését megelőzően a Felhasználónak teljeskörű lehetősége van a megadott adatok ellenőrzésére, javítására és módosítására.</li>
              <li>A Szolgáltató fenntartja a jogot a megrendelés visszautasítására hibás/hiányos adatok, nyilvánvaló technikai hiba, visszaélésszerű megrendelés vagy korábbi szerződésszegés esetén.</li>
              <li>A létrejött szerződés elektronikus szerződésnek minősül, nem kerül külön iktatásra, utólag nem hozzáférhető. A szerződés nyelve: magyar.</li>
            </ul>

            <h3 className="font-semibold text-brand-blue mt-6 mb-2">3.2. Fizetési módok és számlázás</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>A szolgáltatások díjának kiegyenlítése elsődlegesen a Stripe nemzetközi online fizetési rendszeren keresztül történik.</li>
              <li>A Szolgáltató egyedi esetekben, előzetes egyeztetés alapján banki átutalást is biztosíthat.</li>
              <li>A számlák kizárólag elektronikus formában kerülnek kiállításra a Számlázz.hu rendszerén keresztül, és e-mailben kerülnek megküldésre a Felhasználónak.</li>
            </ul>
          </Section>

          <Section title="4. Előfizetések lemondása és elállási jog">
            <h3 className="font-semibold text-brand-blue mb-2">4.1. Az előfizetéses szolgáltatások felmondása</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>A Kiscsoportos Havi Mentorprogram és a Privát Havi Mentorprogram automatikusan megújuló előfizetéses szolgáltatások.</li>
              <li>Az előfizetés a következő fordulónap előtt legalább 3 munkanappal mondható le.</li>
              <li>A lemondás kizárólag írásban, a blankanovak.info@gmail.com e-mail címen kezdeményezhető.</li>
              <li>A már megkezdett számlázási időszak díja nem visszatéríthető. Az előfizetés megszüntetése a már kifizetett időszakra vonatkozó hozzáférést nem érinti, a Felhasználó a fordulónapig jogosult a programban részt venni.</li>
            </ul>

            <h3 className="font-semibold text-brand-blue mt-6 mb-2">4.2. Elállási jog digitális tartalom esetén</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>A Felhasználó a vásárlás során kifejezetten tudomásul veszi és elfogadja, hogy a digitális tartalom (online kurzus) hozzáférésének biztosításával a szolgáltatás teljesítése megkezdődik.</li>
              <li>A hozzáférés aktiválásával a fogyasztó elveszíti a 14 napos indokolás nélküli elállási jogát a 45/2014. (II.26.) Korm. rendelet 29. § (1) bek. m) pontja alapján, amennyiben ehhez előzetesen kifejezetten hozzájárult.</li>
            </ul>
          </Section>

          <Section title="5. Szerzői jogok és tartalomvédelem (AI tilalom)">
            <ul className="list-disc pl-5 space-y-1">
              <li>A www.blankanovak.com weboldalon, valamint a szolgáltatások során elérhető valamennyi tartalom (különösen: videók, hanganyagok, tananyagok, munkafüzetek, letölthető dokumentumok, prezentációk, módszertanok, feladatok, szövegek és grafikai elemek) a Lybskin Kft. szellemi tulajdonát képezik.</li>
              <li>A szolgáltatás megvásárlásával a Felhasználó tulajdonjogot nem szerez, kizárólag egyéni, nem kizárólagos, át nem ruházható, személyes felhasználási jogot kap a tanulás időtartamára.</li>
              <li>Szigorúan tilos a tartalmak másolása, többszörözése, terjesztése, továbbértékesítése, nyilvános közzététele vagy üzleti célú felhasználása.</li>
              <li>A mentoralkalmak és csoportos alkalmak Felhasználó általi rögzítése (hang- vagy képfelvétel készítése) szigorúan TILOS a Szolgáltató előzetes írásbeli engedélye nélkül.</li>
              <li><strong>Mesterséges Intelligencia (AI) tilalma:</strong> Az oktatási anyagok, videók és szövegek mesterséges intelligencia rendszerek tanítására, finomhangolására, vagy bármilyen adatbázis-építés céljából történő felhasználása szigorúan tilos.</li>
              <li>A hozzáférési adatok megosztása harmadik személlyel azonnali és végleges hozzáférés-felfüggesztést von maga után, jogsértés esetén a Szolgáltató kártérítési és egyéb jogi igényeket érvényesít.</li>
            </ul>
          </Section>

          <Section title="6. Közösségi magatartás és hozzáférés felfüggesztése">
            <ul className="list-disc pl-5 space-y-1">
              <li>A Szolgáltató jogosult a Felhasználó hozzáférését ideiglenesen vagy véglegesen felfüggeszteni, amennyiben a Felhasználó a jelen ÁSZF rendelkezéseit (szerzői jogok, fizetési kötelezettségek, technikai visszaélések) megszegi.</li>
              <li>Közösségi magatartási szabályok: A Szolgáltató jogosult a résztvevő hozzáférését azonnali hatállyal korlátozni vagy megszüntetni, ha a csoportos vagy egyéni alkalmak során sértő, zaklató magatartást tanúsít, más résztvevőket vagy az oktatót zavarja, gyűlöletkeltő vagy jogsértő tartalmat oszt meg, illetve a szolgáltatás normál működését akadályozza. Ilyen esetekben a részvételi díj nem téríthető vissza.</li>
            </ul>
          </Section>

          <Section title="7. Felelősségkorlátozás és garancia kizárása">
            <ul className="list-disc pl-5 space-y-1">
              <li>A Szolgáltató a szolgáltatásokat a legjobb szakmai tudása és tapasztalata szerint nyújtja.</li>
              <li><strong>Nyelvvizsga- és ösztöndíj-kizárás:</strong> A Szolgáltató semmilyen kifejezett vagy hallgatólagos garanciát nem vállal meghatározott nyelvi szint elérésére, nyelvvizsga sikeres teljesítésére, munkahelyi előmenetelre, ösztöndíjak elnyerésére vagy egyéb konkrét karrier- és pályázati eredményre.</li>
              <li>A résztvevő fejlődése és sikere nagyban függ a saját egyéni aktivitásától, a gyakorlásra fordított időtől és egyéb személyes körülményektől, melyek a Szolgáltató ellenőrzési körén kívül esnek.</li>
            </ul>
          </Section>

          <Section title="8. Operatív rendelkezések és módosítások">
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Kuponok és akciók:</strong> Az időszakos akciók és kuponkódok nem összevonhatók, kivéve, ha a Szolgáltató ettől kifejezetten eltérően rendelkezik. A Szolgáltató fenntartja az akciók visszavonásának vagy módosításának jogát.</li>
              <li><strong>Kurzusfrissítések és platformváltoztatások:</strong> A Szolgáltató jogosult a kurzusok tartalmát frissíteni, bővíteni vagy módosítani a szakmai színvonal fenntartása érdekében. Jogosult továbbá az oktatási platformok vagy kommunikációs csatornák megváltoztatására, ha az a szolgáltatás lényegi tartalmát nem csorbítja.</li>
              <li><strong>Csoportok átszervezése:</strong> A Szolgáltató fenntartja a jogot a csoportok összevonására, átszervezésére vagy elhalasztására, amennyiben a jelentkezők száma vagy nyelvi szintje ezt indokolja.</li>
              <li><strong>Értékelések használata:</strong> A Felhasználó által önkéntesen megküldött visszajelzések, értékelések és ajánlások a személyes adatok védelmének betartásával marketing- és referenciaanyagként felhasználhatók. Név vagy azonosításra alkalmas adat kizárólag külön hozzájárulás alapján jeleníthető meg.</li>
              <li><strong>Kapcsolattartás:</strong> A tájékoztatásokat a Szolgáltató elsődlegesen elektronikus úton (e-mailben) küldi meg. A Felhasználó köteles olyan e-mail címet megadni, amelyet rendszeresen használ.</li>
            </ul>
          </Section>

          <Section title="9. Vis maior">
            <ul className="list-disc pl-5 space-y-1">
              <li>A Szolgáltató nem felel olyan késedelemért vagy teljesítési akadályért, amely rajta kívül álló, elháríthatatlan és előre nem látható esemény (vis maior) következménye.</li>
              <li>Vis maior eseménynek minősül különösen: természeti katasztrófa, járványhelyzet, háború, hatósági korlátozás, áramszünet, globális internet- vagy szerverleállás, valamint informatikai (pl. DDoS) támadások.</li>
              <li>Vis maior esetén a Szolgáltató jogosult a szolgáltatás időpontját módosítani vagy a teljesítést a vis maior időtartamára felfüggeszteni anélkül, hogy kártérítési kötelezettsége keletkezne.</li>
            </ul>
          </Section>

          <Section title="10. Adatkezelés és GDPR">
            <ul className="list-disc pl-5 space-y-1">
              <li>A Szolgáltató a személyes adatokat a GDPR (EU 2016/679 rendelet) és a hatályos magyar adatvédelmi jogszabályok (Infotörvény) alapján, az adatbiztonsági követelményeket szem előtt tartva kezeli.</li>
              <li>Az adatkezelés célja: szerződés teljesítése, számlázás, ügyfélkapcsolat tartása, jogi kötelezettségek teljesítése, és hozzájárulás esetén marketingkommunikáció.</li>
              <li>Az érintettet megillető jogok: hozzáférés, helyesbítés, törlés, korlátozás, adathordozhatóság, tiltakozás, valamint a hozzájárulás visszavonásának joga.</li>
              <li>A részletes szabályokat a weboldalon elérhető külön Adatkezelési Tájékoztató tartalmazza. Jogorvoslati kérelemmel a Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH) lehet fordulni.</li>
            </ul>
          </Section>

          <Section title="11. Panaszkezelés és jogvita-rendezés">
            <ul className="list-disc pl-5 space-y-1">
              <li>A Felhasználó a szolgáltatással kapcsolatos panaszait a blankanovak.info@gmail.com címen jelentheti be. A Szolgáltató a panaszt annak beérkezésétől számított 30 napon belül írásban kivizsgálja és megválaszolja.</li>
            </ul>
            <div className="bg-white rounded-xl border border-brand-border p-4 mt-4 space-y-1 text-sm">
              <p className="font-semibold text-brand-blue">Heves Vármegyei Békéltető Testület</p>
              <p>Cím: 3300 Eger, Faiskola út 15.</p>
              <p>Telefon: +36 36 429 612</p>
              <p>E-mail: bekeltetes@hkik.hu</p>
              <p>Weboldal: https://bekeltetes.hevesmegye.hu</p>
            </div>
            <p className="mt-4">A fogyasztó jogosult továbbá az Európai Bizottság online vitarendezési platformját igénybe venni: <a href="https://ec.europa.eu/consumers/odr" className="text-brand-purple underline" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a></p>
          </Section>

          <Section title="12. Ingyenes workshopok és webináriumok">
            <ul className="list-disc pl-5 space-y-1">
              <li>A Szolgáltató időszakosan ingyenes online workshopokat, webináriumokat, előadásokat szervezhet, melyekre a regisztráció nem keletkeztet fizetési kötelezettséget.</li>
              <li><strong>Módosítási jog:</strong> A Szolgáltató fenntartja a jogot az ingyenes események időpontjának módosítására, elhalasztására vagy törlésére. Nem garantálja, hogy az esemény felvétele utólag visszanézhető formában elérhető lesz.</li>
              <li><strong>Cél és tartalom:</strong> Az itt elhangzó információk kizárólag tájékoztató és oktatási célokat szolgálnak. A résztvevő tudomásul veszi, hogy az ingyenes események során a Szolgáltató saját fizetős szolgáltatásait, kurzusait bemutathatja (marketing célú tartalom).</li>
              <li><strong>Szerzői jogok:</strong> Az ingyenes alkalmak rögzítése, másolása, nyilvános közzétele vagy üzleti felhasználása a Szolgáltató előzetes írásbeli hozzájárulása nélkül szigorúan tilos. Amennyiben az eseményről felvétel készül, arról a résztvevők előzetes tájékoztatást kapnak.</li>
              <li><strong>Adathasználat:</strong> A workshop során feltett kérdések, hozzászólások a személyes adatok védelme mellett a későbbi oktatási tartalmak fejlesztéséhez felhasználhatók.</li>
            </ul>
          </Section>

          <Section title="13. Melléklet: Elállási / Felmondási nyilatkozatminta">
            <p className="text-brand-muted text-sm mb-4">(Csak a szerződéstől való elállási vagy felmondási szándék esetén töltendő ki és juttatandó vissza a Szolgáltató e-mail címére.)</p>
            <div className="bg-white rounded-xl border border-brand-border p-6 space-y-3 text-sm">
              <p><strong>Címzett:</strong></p>
              <p>Lybskin Kft.<br />3300 Eger, Mikes Kelemen utca 21.<br />E-mail: blankanovak.info@gmail.com</p>
              <p className="mt-4">Alulírott kijelentem, hogy gyakorlom elállási/felmondási jogomat az alábbi szolgáltatás vonatkozásában:</p>
              <p>Szolgáltatás megnevezése: ............................................</p>
              <p>Megrendelés időpontja: ............................................</p>
              <p>Fogyasztó neve: ............................................</p>
              <p>Fogyasztó címe: ............................................</p>
              <p>Fogyasztó e-mail címe: ............................................</p>
              <p>Kelt (Dátum): ............................................</p>
              <p>Aláírás (csak papír alapon): ............................................</p>
            </div>
          </Section>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
