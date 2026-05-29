import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Adatvédelmi Tájékoztató',
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

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-brand-border p-5 space-y-2">
      <h3 className="font-sans font-bold text-brand-blue text-base">{title}</h3>
      {children}
    </div>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="text-brand-muted font-semibold min-w-[130px] shrink-0 text-sm">{label}:</span>
      <span className="text-brand-text text-sm">{value}</span>
    </div>
  );
}

function InfoTable({ rows }: { rows: [string, string][] }) {
  return (
    <div className="rounded-xl border border-brand-border overflow-hidden">
      {rows.map(([label, value], i) => (
        <div key={i} className={`flex gap-4 px-4 py-3 ${i % 2 === 0 ? 'bg-brand-bg' : 'bg-white'}`}>
          <span className="font-semibold text-brand-blue min-w-[180px] shrink-0 text-sm">{label}</span>
          <span className="text-brand-text text-sm">{value}</span>
        </div>
      ))}
    </div>
  );
}

export default function AdatvedelemPage() {
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
              Adatvédelmi Tájékoztató
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-brand-muted font-sans">
              <span>Lybskin Kft. · novakblanka.hu</span>
              <span>Hatályos: 2026. május 28-tól</span>
              <span>Verzió: 1.0</span>
            </div>
            <div className="mt-4 bg-white rounded-xl border border-brand-border p-4 text-xs text-brand-muted font-sans leading-relaxed">
              <strong className="text-brand-blue">Jogi alapok:</strong> (EU) 2016/679 rendelet (GDPR) · 2011. évi CXII. törvény (Infotv.) · 2001. évi CVIII. törvény (Ektv.) · 2013. évi V. törvény (Ptk.)
            </div>
          </div>

          <Section title="1. Az adatkezelő adatai">
            <InfoTable rows={[
              ['Adatkezelő neve', 'Lybskin Korlátolt Felelősségű Társaság'],
              ['Székhely', '3300 Eger, Mikes Kelemen utca 21.'],
              ['Cégjegyzékszám', '10-09-026438'],
              ['Adószám', '13473774-2-10'],
              ['Képviselő', 'Novák Blanka, ügyvezető'],
              ['Adatvédelmi kapcsolat', 'hello@novakblanka.hu'],
              ['Weboldal', 'https://novakblanka.hu'],
            ]} />
            <p className="text-sm text-brand-muted mt-3">Adatvédelmi tisztviselő kinevezése nem kötelező és nem történt meg, az adatvédelmi kérdésekben a fenti elérhetőségen lehet az adatkezelőhöz fordulni.</p>
          </Section>

          <Section title="2. Fogalmak">
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                ['Személyes adat', 'Azonosított vagy azonosítható természetes személyre vonatkozó bármely információ (GDPR 4. cikk (1) bek.)'],
                ['Adatkezelés', 'A személyes adatokon végzett bármely művelet (gyűjtés, tárolás, módosítás, törlés stb.)'],
                ['Érintett', 'Az a természetes személy, akinek személyes adatait kezeljük'],
                ['Adatfeldolgozó', 'Az adatkezelő nevében adatkezelési műveleteket végző harmadik fél'],
              ].map(([term, def]) => (
                <div key={term} className="bg-white rounded-xl border border-brand-border p-4">
                  <p className="font-semibold text-brand-blue text-sm mb-1">{term}</p>
                  <p className="text-brand-muted text-sm">{def}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="3. Adatkezelési tevékenységek">
            <div className="space-y-4">
              <SubSection title="3.1 Weboldal látogatása: technikai naplófájlok">
                <DataRow label="Kezelt adatok" value="IP-cím, böngésző típusa, operációs rendszer, látogatás időpontja, megtekintett oldalak, hivatkozó URL" />
                <DataRow label="Cél" value="A weboldal biztonságos és zavartalan működésének biztosítása, hibák azonosítása" />
                <DataRow label="Jogalap" value="GDPR 6. cikk (1) bek. f) pont: jogos érdek" />
                <DataRow label="Megőrzési idő" value="30 nap" />
                <DataRow label="Adatfeldolgozók" value="Vercel Inc. (USA, EU-US DPF); Cloudflare Inc." />
              </SubSection>

              <SubSection title="3.2 Kapcsolatfelvételi űrlap">
                <DataRow label="Kezelt adatok" value="Teljes név, e-mail cím, üzenet tartalma" />
                <DataRow label="Cél" value="Az érintett megkeresésének megválaszolása" />
                <DataRow label="Jogalap" value="GDPR 6. cikk (1) bek. b) és f) pont" />
                <DataRow label="Megőrzési idő" value="Az ügy lezárásától számított 1 év" />
                <DataRow label="Adatfeldolgozó" value="Resend, Inc. (USA, SCC alapján)" />
              </SubSection>

              <SubSection title="3.3 Hírlevél-feliratkozás">
                <DataRow label="Kezelt adatok" value="E-mail cím, feliratkozás forrása (tag), feliratkozás időpontja, nyitási és kattintási statisztikák" />
                <DataRow label="Cél" value="Rendszeres elektronikus hírlevél küldése" />
                <DataRow label="Jogalap" value="GDPR 6. cikk (1) bek. a) pont: az érintett hozzájárulása (kötelező checkbox bepipálásával adott, előre nem kipipált)" />
                <DataRow label="Megőrzési idő" value="A leiratkozásig" />
                <DataRow label="Leiratkozás" value="Az e-mailek alján elhelyezett leiratkozási linkre kattintással, vagy hello@novakblanka.hu e-mail küldésével bármikor" />
                <DataRow label="Adatfeldolgozók" value="Systeme.io SAS (Franciaország, GDPR hatálya alatt); Resend, Inc. (USA, SCC)" />
              </SubSection>

              <SubSection title="3.4 Ingyenes letöltés (lead magnet)">
                <DataRow label="Kezelt adatok" value="E-mail cím, letöltött tartalom azonosítója, letöltés időpontja" />
                <DataRow label="Cél" value="Az ingyenes digitális tartalom eljuttatása, külön hozzájárulással hírlevél küldése" />
                <DataRow label="Jogalap" value="GDPR 6. cikk (1) bek. b) pont; hírlevélhez: a) pont" />
                <DataRow label="Megőrzési idő" value="2 év, vagy leiratkozásig (hírlevél esetén)" />
                <DataRow label="Adatfeldolgozók" value="Systeme.io SAS; Vercel Inc.; Resend, Inc." />
              </SubSection>

              <SubSection title="3.5 Webinár-regisztráció">
                <DataRow label="Kezelt adatok" value="Teljes név, e-mail cím, regisztráció időpontja, webinár azonosítója" />
                <DataRow label="Cél" value="A webinárhoz való hozzáférés biztosítása, emlékeztető e-mailek küldése" />
                <DataRow label="Jogalap" value="GDPR 6. cikk (1) bek. b) pont: a szerződés teljesítéséhez szükséges" />
                <DataRow label="Megőrzési idő" value="A webinárt követő 1 évig" />
                <DataRow label="Adatfeldolgozók" value="Systeme.io SAS; Resend, Inc.; Airtable, Inc. (USA, SCC)" />
                <p className="text-xs text-brand-muted mt-2">A webinár Zoom platformon kerül megrendezésre. A Zoom saját adatkezelési szabályzata érvényes (zoom.us/privacy).</p>
              </SubSection>

              <SubSection title="3.6 Kurzusvásárlás">
                <DataRow label="Kezelt adatok" value="Teljes név, e-mail cím, vásárlás időpontja, kurzus azonosítója, Stripe tranzakció azonosítója" />
                <DataRow label="Cél" value="Kurzushoz való hozzáférés biztosítása, visszaigazoló e-mail küldése, számlázás" />
                <DataRow label="Jogalap" value="GDPR 6. cikk (1) bek. b) és c) pont" />
                <DataRow label="Megőrzési idő" value="5 év (szerződéses jogviszony); számlázási adatok: 8 év (Számviteli törvény)" />
                <DataRow label="Adatfeldolgozók" value="Stripe, Inc. (USA, EU-US DPF); Systeme.io SAS; Resend, Inc.; Airtable, Inc.; Számlázz.hu (KBOSS.hu Kft., Magyarország)" />
              </SubSection>

              <SubSection title="3.7 Digitális termék vásárlása">
                <DataRow label="Kezelt adatok" value="E-mail cím, vásárlás időpontja, termék azonosítója, Stripe tranzakció azonosítója" />
                <DataRow label="Jogalap" value="GDPR 6. cikk (1) bek. b) és c) pont" />
                <DataRow label="Megőrzési idő" value="5 év (szerz. jogviszony); számlázási adatok: 8 év" />
                <DataRow label="Adatfeldolgozók" value="Stripe, Inc.; Vercel Inc. (fájl tárolás, signed URL); Resend, Inc.; Számlázz.hu" />
              </SubSection>

              <SubSection title="3.8 1-1 Mentorálás foglalása">
                <DataRow label="Kezelt adatok" value="Teljes név, e-mail cím, foglalt időpont, Stripe tranzakció azonosítója, opcionális: egyéb foglaláskor megadott információk" />
                <DataRow label="Jogalap" value="GDPR 6. cikk (1) bek. b) és c) pont" />
                <DataRow label="Megőrzési idő" value="5 év (szerz. jogviszony); számlázási adatok: 8 év" />
                <DataRow label="Adatfeldolgozók" value="Cal.com, Inc. (USA, SCC); Stripe, Inc.; Resend, Inc.; Google LLC (Google Calendar, EU-US DPF); Számlázz.hu" />
              </SubSection>

              <SubSection title="3.9 Süti (cookie) kezelés">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-brand-purple-light">
                        <th className="text-left p-3 font-semibold text-brand-blue rounded-tl-lg">Süti típus</th>
                        <th className="text-left p-3 font-semibold text-brand-blue">Cél</th>
                        <th className="text-left p-3 font-semibold text-brand-blue">Jogalap</th>
                        <th className="text-left p-3 font-semibold text-brand-blue rounded-tr-lg">Megőrzési idő</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Feltétlenül szükséges', 'Weboldal működéséhez elengedhetetlen (munkamenet, CSRF véd.)', 'Jogos érdek / szükséges', 'Munkamenet végéig'],
                        ['Funkcionális', 'Felhasználói beállítások mentése (pl. cookie döntés)', 'Hozzájárulás', '12 hónap'],
                        ['Analitikai', 'Látogatottsági statisztika (Vercel Analytics)', 'Hozzájárulás', '24 hónap'],
                        ['Marketing', 'Nincs jelenleg', '—', '—'],
                      ].map(([type, goal, basis, duration], i) => (
                        <tr key={type} className={i % 2 === 0 ? 'bg-white' : 'bg-brand-bg'}>
                          <td className="p-3 font-medium text-brand-blue">{type}</td>
                          <td className="p-3 text-brand-muted">{goal}</td>
                          <td className="p-3 text-brand-muted">{basis}</td>
                          <td className="p-3 text-brand-muted">{duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </SubSection>
            </div>
          </Section>

          <Section title="4. Adatfeldolgozók összefoglalója">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-brand-purple-light">
                    {['Adatfeldolgozó', 'Tevékenység', 'Székhely', 'Megfelelési alap'].map(h => (
                      <th key={h} className="text-left p-3 font-semibold text-brand-blue">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Vercel Inc.', 'Weboldal hosting, Blob fájltárolás', 'USA', 'EU-US DPF'],
                    ['Stripe, Inc.', 'Online fizetés', 'USA', 'EU-US DPF + SCC'],
                    ['Systeme.io SAS', 'CRM, hírlevél, kurzusplatform', 'Franciaország (EU)', 'GDPR hatálya alatt'],
                    ['Airtable, Inc.', 'Adatbázis (webinár, feliratkozók)', 'USA', 'SCC'],
                    ['Resend, Inc.', 'Tranzakciós e-mail küldés', 'USA', 'SCC'],
                    ['Cal.com, Inc.', 'Időpontfoglalás', 'USA', 'SCC'],
                    ['Google LLC', 'Google Calendar, Google Meet', 'USA', 'EU-US DPF'],
                    ['KBOSS.hu Kft. (Számlázz.hu)', 'Elektronikus számlázás', 'Magyarország (EU)', 'GDPR hatálya alatt'],
                    ['Cloudflare, Inc.', 'CDN, DDoS védelem', 'USA', 'EU-US DPF'],
                  ].map(([name, activity, location, basis], i) => (
                    <tr key={name} className={i % 2 === 0 ? 'bg-white' : 'bg-brand-bg'}>
                      <td className="p-3 font-medium text-brand-blue">{name}</td>
                      <td className="p-3 text-brand-muted">{activity}</td>
                      <td className="p-3 text-brand-muted">{location}</td>
                      <td className="p-3 text-brand-muted">{basis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="5. Adattovábbítás harmadik országba">
            <p>Egyes adatfeldolgozók az Európai Unión kívül (elsősorban az USA-ban) működnek. Az adattovábbítás az alábbi garanciák alapján jogszerű:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-white rounded-xl border border-brand-border p-4">
                <p className="font-semibold text-brand-blue text-sm mb-1">EU-US Data Privacy Framework</p>
                <p className="text-brand-muted text-sm">2023-tól érvényes, az EUB által jóváhagyott megfelelőségi határozat</p>
              </div>
              <div className="bg-white rounded-xl border border-brand-border p-4">
                <p className="font-semibold text-brand-blue text-sm mb-1">Standard Contractual Clauses (SCC)</p>
                <p className="text-brand-muted text-sm">Az Európai Bizottság 2021/914/EU határozata alapján</p>
              </div>
            </div>
          </Section>

          <Section title="6. Az érintett jogai">
            <div className="space-y-3">
              {[
                ['Tájékoztatáshoz és hozzáféréshez való jog (GDPR 15. cikk)', 'Tájékoztatást kérhet arról, hogy adatait kezeljük-e, és ha igen, milyen célból, milyen adatokat, mennyi ideig.'],
                ['Helyesbítéshez való jog (GDPR 16. cikk)', 'Kérheti a pontatlan személyes adatok helyesbítését.'],
                ['Törléshez való jog, az elfeledtetéshez való jog (GDPR 17. cikk)', 'Kérheti adatai törlését, ha az adatokra már nincs szükség az eredeti célhoz, a hozzájárulást visszavonta, vagy az adatkezelés jogellenes volt. Jogszabályi kötelezettség (pl. számlázás) esetén a törlési kérés csak a jogszabályi időszak lejárta után teljesíthető.'],
                ['Az adatkezelés korlátozásához való jog (GDPR 18. cikk)', 'Kérheti az adatkezelés korlátozását pl. az adatok pontosságának vitatása esetén.'],
                ['Adathordozhatósághoz való jog (GDPR 20. cikk)', 'Jogosult az általa megadott adatokat géppel olvasható formátumban megkapni, és más adatkezelőhöz továbbítani.'],
                ['Tiltakozáshoz való jog (GDPR 21. cikk)', 'Tiltakozhat az adatkezelés ellen, ha az jogos érdeken alapul. Hírlevél küldése esetén a tiltakozás azonnali hatályú.'],
                ['Hozzájárulás visszavonásának joga (GDPR 7. cikk (3) bek.)', 'A hozzájáruláson alapuló adatkezelés esetén a hozzájárulás bármikor visszavonható, anélkül, hogy ez érintené a visszavonás előtti kezelés jogszerűségét.'],
              ].map(([right, desc]) => (
                <div key={right} className="bg-white rounded-xl border border-brand-border p-4">
                  <p className="font-semibold text-brand-blue text-sm mb-1">{right}</p>
                  <p className="text-brand-muted text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="7. Joggyakorlás: hogyan kell kérni?">
            <div className="bg-brand-purple-light rounded-xl border border-brand-purple/20 p-5">
              <p className="font-semibold text-brand-blue mb-3">Kapcsolat</p>
              <p className="text-sm text-brand-muted mb-1"><strong>E-mail:</strong> hello@novakblanka.hu</p>
              <p className="text-sm text-brand-muted"><strong>Levél:</strong> 3300 Eger, Mikes Kelemen utca 21.</p>
            </div>
            <p>A kérelem beérkezésétől számított <strong>30 napon belül</strong> válaszolunk. Indokolt esetben ez 60 napra meghosszabbítható.</p>
            <p>A joggyakorlás <strong>ingyenes</strong>. Az azonosítás érdekében kérhetjük az érintett személyazonosságának igazolását.</p>

            <div className="bg-white rounded-xl border border-brand-border p-5">
              <p className="font-semibold text-brand-blue mb-2 text-sm">Panasztétel: NAIH elérhetőségei</p>
              <p className="text-sm text-brand-muted">Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)</p>
              <p className="text-sm text-brand-muted">Cím: 1055 Budapest, Falk Miksa utca 9-11. · Tel: +36 1 391 1400</p>
              <p className="text-sm text-brand-muted">E-mail: ugyfelszolgalat@naih.hu · Web: naih.hu</p>
            </div>
          </Section>

          <Section title="8. Adatbiztonság">
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                ['HTTPS / TLS titkosítás', 'A weboldal és az API kommunikáció titkosított'],
                ['Signed URL-ek', 'A letölthető fájlok időkorlátosan és egyedi linkeken érhetők el (72 óra)'],
                ['Hozzáférés-korlátozás', 'Az adatokhoz kizárólag az arra feljogosított személyek férnek hozzá'],
                ['Stripe PCI DSS', 'Fizetési adatokat kizárólag a Stripe kezeli, bankkártyaadathoz a Szolgáltató nem fér hozzá'],
                ['Rendszeres frissítések', 'A Weboldal szoftvereinek naprakészen tartása'],
                ['72 órás NAIH értesítés', 'Adatvédelmi incidens esetén a Szolgáltató 72 órán belül értesíti a NAIH-t'],
              ].map(([title, desc]) => (
                <div key={title} className="bg-white rounded-xl border border-brand-border p-4">
                  <p className="font-semibold text-brand-blue text-sm mb-1">{title}</p>
                  <p className="text-brand-muted text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="9. Gyermekek adatai">
            <p>A Weboldal szolgáltatásai <strong>16 éven aluli személyek részére nem szólnak</strong>. A Szolgáltató tudatosan nem gyűjt 16 év alatti személyek adatait. Ha tudomásunkra jut, hogy 16 év alatti személy adatait kezeljük, azokat haladéktalanul töröljük.</p>
          </Section>

          <Section title="10. Módosítások">
            <p>A Szolgáltató fenntartja a jogot jelen Tájékoztató módosítására. A lényeges módosításokról az érintetteket a Weboldal főoldalán és/vagy hírlevélben értesítjük. A módosítás hatálybalépésének dátuma mindig feltüntetésre kerül a dokumentum tetején.</p>
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
