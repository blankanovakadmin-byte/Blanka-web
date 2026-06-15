'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const navLinks = [
  { href: '/',         label: 'Kezdőlap' },
  { href: '/programok', label: 'Programok' },
  { href: '/forrasok',  label: 'Források' },
  { href: '/rolam',     label: 'Rólam' },
  { href: '/kapcsolat', label: 'Kapcsolat' },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent',
        ].join(' ')}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 group">
              <span className="font-display text-2xl font-bold text-brand-blue group-hover:text-brand-purple transition-colors">
                blanka
              </span>
              <span className="font-script text-4xl text-brand-purple leading-none" style={{ fontFamily: 'var(--font-script)' }}>
                novak
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    'px-4 py-2 rounded-lg text-sm font-medium font-sans transition-colors duration-200',
                    pathname === link.href
                      ? 'text-brand-purple bg-brand-purple-light'
                      : 'text-brand-blue hover:text-brand-purple hover:bg-brand-purple-light',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Button href="https://cal.com/novakblanka" external size="sm">
                Foglalj időpontot
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-brand-blue hover:bg-brand-purple-light transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menü"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />
          <div className="absolute top-16 left-0 right-0 bg-white shadow-xl rounded-b-2xl p-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  'px-4 py-3 rounded-xl text-base font-medium font-sans transition-colors',
                  pathname === link.href
                    ? 'text-brand-purple bg-brand-purple-light'
                    : 'text-brand-blue hover:bg-brand-purple-light',
                ].join(' ')}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-brand-border">
              <Button href="https://cal.com/novakblanka" external className="w-full justify-center">
                Foglalj időpontot
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
