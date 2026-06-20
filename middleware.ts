import { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE = 'blanka_admin_session';

function timingSafeEqual(a: string, b: string): boolean {
  // Run the full loop regardless of length to avoid timing leaks
  const len = Math.max(a.length, b.length);
  let mismatch = a.length ^ b.length;
  for (let i = 0; i < len; i++) {
    mismatch |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return mismatch === 0;
}

function checkSitePassword(req: NextRequest): NextResponse | null {
  const password = process.env.SITE_PASSWORD;
  if (!password) return null;

  const auth = req.headers.get('authorization');
  if (auth) {
    const [scheme, encoded] = auth.split(' ');
    if (scheme === 'Basic' && encoded) {
      const decoded = atob(encoded);
      const [, pwd] = decoded.split(':');
      if (pwd && timingSafeEqual(pwd, password)) return null;
    }
  }

  return new NextResponse('Jelszó szükséges', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Blanka Web"' },
  });
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/api/')) return NextResponse.next();

  const blocked = checkSitePassword(req);
  if (blocked) return blocked;

  if (!pathname.startsWith('/admin')) return NextResponse.next();
  if (pathname === '/admin/login') return NextResponse.next();

  const session = req.cookies.get(SESSION_COOKIE);
  const adminToken = process.env.ADMIN_TOKEN;

  if (!session || !adminToken || !timingSafeEqual(session.value, adminToken)) {
    const loginUrl = new URL('/admin/login', req.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/).*)'],
};
