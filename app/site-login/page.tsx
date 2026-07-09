'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SiteLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    document.cookie = `site_auth=${password}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
    const res = await fetch('/', { method: 'HEAD', credentials: 'include' });
    if (res.redirected || res.url.includes('site-login')) {
      setError(true);
      return;
    }
    router.push('/');
    router.refresh();
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F4EFE6', fontFamily: 'system-ui, sans-serif' }}>
      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '2.5rem', borderRadius: '1rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', maxWidth: '360px', width: '100%', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#173A7A', marginBottom: '0.5rem' }}>Novák Blanka</h1>
        <p style={{ color: '#7A7A8C', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Az oldal jelenleg fejlesztés alatt áll.</p>
        <input
          type="password"
          placeholder="Jelszó"
          value={password}
          onChange={e => { setPassword(e.target.value); setError(false); }}
          style={{ width: '100%', padding: '0.75rem 1rem', border: `2px solid ${error ? '#F26D6D' : '#E9E5DD'}`, borderRadius: '0.75rem', fontSize: '1rem', outline: 'none', boxSizing: 'border-box', marginBottom: '1rem' }}
        />
        {error && <p style={{ color: '#F26D6D', fontSize: '0.875rem', marginBottom: '0.75rem' }}>Hibás jelszó.</p>}
        <button type="submit" style={{ width: '100%', padding: '0.75rem', background: '#B06AD9', color: 'white', border: 'none', borderRadius: '0.75rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>
          Belépés
        </button>
      </form>
    </div>
  );
}
