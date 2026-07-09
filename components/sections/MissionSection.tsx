import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export function MissionSection() {
  return (
    <SectionWrapper bg="surface">
      <div className="max-w-3xl mx-auto space-y-6">
        <p className="font-sans text-brand-text leading-relaxed text-lg">
          Biológusként, kutatóként, egyetemi oktatóként és 7 nyelv beszélőjeként megtanultam,
          hogy a siker ritkán a tehetségen múlik. Sokkal inkább azon, hogy valaki megkapja‑e
          a megfelelő módszereket, a hiteles információt és a támogató közeget, amelyben
          fejlődni tud.
        </p>

        <p className="font-sans text-brand-text leading-relaxed text-lg">
          Ezért hoztam létre ezt a platformot.
        </p>

        <p className="font-sans text-brand-text leading-relaxed text-lg">
          Itt a nyelvtanulásról, a tudományról, az ösztöndíjakról és a nemzetközi programokról
          osztok meg olyan stratégiákat, amelyek a gyakorlatban is működnek, és amelyekkel te
          is magabiztosabban építheted a saját utadat.
        </p>

        <blockquote className="border-l-4 border-brand-purple pl-6 py-2">
          <p className="font-display text-xl text-brand-blue italic leading-relaxed">
            Mert néha egy új nyelv, egy ösztöndíj vagy egy jól időzített lehetőség képes
            teljesen új irányt adni egy életnek. A világ nagyobb, mint gondolnád, és sokkal
            közelebb van, mint hinnéd.
          </p>
        </blockquote>

        <div className="pt-2">
          <Button href="/rolam" variant="secondary" size="md">
            Többet rólam <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
