'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, User, FileText, Mail } from 'lucide-react';

const tabs = [
  { href: '/',         label: 'Kezdőlap', icon: Home },
  { href: '/programok', label: 'Programok', icon: BookOpen },
  { href: '/rolam',     label: 'Rólam',    icon: User },
  { href: '/forrasok',  label: 'Források',  icon: FileText },
  { href: '/kapcsolat', label: 'Kapcsolat', icon: Mail },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-brand-border safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 px-3 py-1 min-w-0"
            >
              <Icon
                size={22}
                className={active ? 'text-brand-purple' : 'text-brand-muted'}
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span
                className={[
                  'text-[10px] font-sans font-medium leading-none truncate',
                  active ? 'text-brand-purple' : 'text-brand-muted',
                ].join(' ')}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
