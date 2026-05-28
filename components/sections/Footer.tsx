import Link from 'next/link';
import { InstagramIcon, LinkedinIcon, TiktokIcon } from '@/components/ui/SocialIcons';
import { CookieSettingsButton } from '@/components/CookieBanner';

const navLinks = [
  { href: '/',          label: 'Kezdőlap' },
  { href: '/programok', label: 'Programok' },
  { href: '/forrasok',  label: 'Források' },
  { href: '/rolam',     label: 'Rólam' },
  { href: '/kapcsolat', label: 'Kapcsolat' },
];

const legalLinks = [
  { href: '/aszf',        label: 'ÁSZF' },
  { href: '/adatvedelem', label: 'Adatvédelmi Tájékoztató' },
];

const socialLinks = [
  { href: 'https://instagram.com/novakblanka', icon: InstagramIcon, label: 'Instagram' },
  { href: 'https://linkedin.com/in/novakblanka', icon: LinkedinIcon, label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="bg-brand-blue text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-1 mb-3">
              <span className="font-display text-2xl font-bold text-white">blanka</span>
              <span className="font-display text-2xl text-brand-purple italic">novak</span>
            </div>
            <p className="font-sans text-white/60 text-sm leading-relaxed">
              Biológus, doktorandusz, nyelvtanár — segítek angolul magabiztosan megszólalni.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h3 className="font-sans font-semibold text-white/80 text-xs uppercase tracking-widest mb-4">
              Navigáció
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-sans text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-sans font-semibold text-white/80 text-xs uppercase tracking-widest mb-4">
              Jogi
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-sans text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-sans font-semibold text-white/80 text-xs uppercase tracking-widest mb-4">
              Kövess!
            </h3>
            <div className="flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-brand-purple transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
              <a
                href="https://tiktok.com/@novakblanka"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-brand-purple transition-colors"
              >
                <TiktokIcon size={18} />
              </a>
            </div>
            <p className="font-sans text-xs text-white/40 mt-4">
              13 000+ organikus követő
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-white/40">
            © 2026 Lybskin Kft. (Novák Blanka). Minden jog fenntartva.
          </p>
          <Link href="/admin" className="font-sans text-xs text-white/20 hover:text-white/40 transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
