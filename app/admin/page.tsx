import type { Metadata } from 'next';
import Link from 'next/link';
import { Package, Radio, FileText, LogOut } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { KurzusokSection } from '@/components/admin/KurzusokSection';

export const metadata: Metadata = { title: 'Admin | Novák Blanka' };

const sections = [
  {
    href: '/admin/termekek',
    icon: Package,
    title: 'Digitális termékek',
    description: 'Termékek hozzáadása, szerkesztése, Blob fájlok kezelése',
  },
  {
    href: '/admin/webinarok',
    icon: Radio,
    title: 'Webinár előnézet',
    description: 'Airtable-ből szinkronizált közelgő webinárokok',
  },
  {
    href: '/admin/letoltesek',
    icon: FileText,
    title: 'Signed URL generálás',
    description: 'Kézi 72 órás letöltési link generálás bármely fájlhoz',
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-brand-bg p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-brand-blue">Admin felület</h1>
            <p className="font-sans text-brand-muted text-sm">Novák Blanka, rendszerkezelés</p>
          </div>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="flex items-center gap-2 font-sans text-sm text-brand-muted hover:text-brand-coral transition-colors"
            >
              <LogOut size={16} /> Kilépés
            </button>
          </form>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {sections.map(({ href, icon: Icon, title, description }) => (
            <Link key={href} href={href}>
              <Card hover className="h-full">
                <div className="w-10 h-10 bg-brand-purple-light rounded-xl flex items-center justify-center mb-4">
                  <Icon size={20} className="text-brand-purple" />
                </div>
                <h2 className="font-display text-base font-bold text-brand-blue mb-1">{title}</h2>
                <p className="font-sans text-xs text-brand-muted leading-relaxed">{description}</p>
              </Card>
            </Link>
          ))}
        </div>

        <KurzusokSection />

        <div className="mt-8">
          <Link href="/" className="font-sans text-sm text-brand-muted hover:text-brand-purple transition-colors">
            ← Vissza a weboldalra
          </Link>
        </div>
      </div>
    </div>
  );
}
