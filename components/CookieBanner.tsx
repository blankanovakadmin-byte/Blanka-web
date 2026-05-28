'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

interface CookieConsent {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  timestamp: number;
}

const COOKIE_KEY = 'blanka_cookie_consent';

function getConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(COOKIE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveConsent(consent: CookieConsent) {
  localStorage.setItem(COOKIE_KEY, JSON.stringify(consent));
  // Also set a real cookie so server-side code can read it
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${COOKIE_KEY}=${JSON.stringify(consent)}; expires=${expires}; path=/; SameSite=Lax`;
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={[
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2',
        checked ? 'bg-brand-purple' : 'bg-brand-border',
      ].join(' ')}
    >
      <span
        className={[
          'inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200 mt-0.5',
          checked ? 'translate-x-5' : 'translate-x-0.5',
        ].join(' ')}
      />
    </button>
  );
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [functional, setFunctional] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (!consent) {
      // Small delay so page loads first
      setTimeout(() => setVisible(true), 800);
    }
  }, []);

  // Expose openBanner function globally so footer "Sütik kezelése" can trigger it
  useEffect(() => {
    (window as Window & { openCookieBanner?: () => void }).openCookieBanner = () => setVisible(true);
    return () => { delete (window as Window & { openCookieBanner?: () => void }).openCookieBanner; };
  }, []);

  function acceptAll() {
    saveConsent({ necessary: true, functional: true, analytics: true, timestamp: Date.now() });
    setVisible(false);
  }

  function rejectAll() {
    saveConsent({ necessary: true, functional: false, analytics: false, timestamp: Date.now() });
    setVisible(false);
  }

  function saveCustom() {
    saveConsent({ necessary: true, functional, analytics, timestamp: Date.now() });
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <>
      {/* Backdrop on mobile */}
      <div
        className="fixed inset-0 bg-black/20 z-[998] md:hidden"
        onClick={rejectAll}
      />

      <div className="fixed bottom-0 left-0 right-0 z-[999] p-3 md:p-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-brand-border overflow-hidden">
          {/* Main row */}
          <div className="p-5 md:p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-purple-light rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                <Image src="/images/icon_cookie.png" alt="süti" width={20} height={20} className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg font-bold text-brand-blue mb-1">
                  Sütiket használunk
                </h3>
                <p className="font-sans text-sm text-brand-muted leading-relaxed">
                  A weboldal működéséhez szükséges sütik mindig aktívak. Analitikai sütiket csak hozzájárulásod alapján alkalmazzuk.{' '}
                  <Link href="/adatvedelem#sutik" className="text-brand-purple underline hover:no-underline">
                    Bővebben
                  </Link>
                </p>
              </div>
            </div>

            {/* Expandable detail panel */}
            {showDetails && (
              <div className="mb-4 space-y-3 border-t border-brand-border pt-4">
                {[
                  {
                    label: 'Feltétlenül szükséges sütik',
                    desc: 'Munkamenet, biztonság, cookie-döntés tárolása. Ezek nélkül a weboldal nem működik.',
                    checked: true,
                    disabled: true,
                    onChange: () => {},
                  },
                  {
                    label: 'Funkcionális sütik',
                    desc: 'Felhasználói beállítások megjegyzése (pl. sütikezelési döntés mentése).',
                    checked: functional,
                    disabled: false,
                    onChange: setFunctional,
                  },
                  {
                    label: 'Analitikai sütik',
                    desc: 'Névtelen látogatottsági statisztika (Vercel Analytics) — segít a weboldal fejlesztésében.',
                    checked: analytics,
                    disabled: false,
                    onChange: setAnalytics,
                  },
                ].map((cat) => (
                  <div key={cat.label} className="flex items-start justify-between gap-4 bg-brand-bg rounded-xl p-4">
                    <div className="flex-1">
                      <p className="font-sans font-semibold text-brand-blue text-sm">{cat.label}</p>
                      <p className="font-sans text-xs text-brand-muted mt-0.5 leading-relaxed">{cat.desc}</p>
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                      {cat.disabled && (
                        <span className="font-sans text-xs text-brand-muted">Mindig aktív</span>
                      )}
                      <Toggle
                        checked={cat.checked}
                        onChange={cat.disabled ? () => {} : cat.onChange}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={acceptAll} size="sm" className="flex-1 justify-center">
                <Check size={14} /> Elfogadok mindent
              </Button>
              <Button onClick={rejectAll} variant="secondary" size="sm" className="flex-1 justify-center">
                Elutasítok mindent
              </Button>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center justify-center gap-1 px-4 py-2 rounded-xl font-sans text-sm font-medium text-brand-muted hover:text-brand-purple hover:bg-brand-purple-light transition-colors"
              >
                Beállítások
                {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>

            {showDetails && (
              <div className="mt-3 pt-3 border-t border-brand-border flex justify-end">
                <Button onClick={saveCustom} variant="primary" size="sm">
                  Mentés
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// Helper component for the footer "Sütik kezelése" button
export function CookieSettingsButton() {
  function open() {
    if (typeof window !== 'undefined') {
      (window as Window & { openCookieBanner?: () => void }).openCookieBanner?.();
    }
  }
  return (
    <button
      onClick={open}
      className="font-sans text-sm text-white/60 hover:text-white transition-colors"
    >
      Sütik kezelése
    </button>
  );
}
