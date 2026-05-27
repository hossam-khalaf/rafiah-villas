import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const acceptHeader = request.headers.get('accept') || '';
  
  // Markdown for Agents support
  if (
    acceptHeader.includes('text/markdown') && 
    !request.headers.has('x-bypass-markdown')
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/api/markdown';
    url.searchParams.set('path', request.nextUrl.pathname + request.nextUrl.search);
    return NextResponse.rewrite(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',
    
    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(ar|en)/:path*',
    
    // Enable redirects that add a locale prefix
    '/((?!_next|_vercel|studio|api|.*\\..*).*)'
  ]
};
