'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get('redirect') || '/admin';

  const [token, setToken] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    if (res.ok) {
      router.push(redirect);
    } else {
      setError('Érvénytelen token. Próbáld újra.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-brand-purple rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-brand-blue">Admin belépés</h1>
          <p className="font-sans text-brand-muted text-sm mt-1">Novák Blanka admin felület</p>
        </div>

        <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                label="Admin token"
                type={show ? 'text' : 'password'}
                placeholder="••••••••••••••••••••••••••••••••"
                value={token}
                onChange={e => setToken(e.target.value)}
                required
                error={error}
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-9 text-brand-muted hover:text-brand-purple"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <Button type="submit" loading={loading} className="w-full justify-center">
              Belépés
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
