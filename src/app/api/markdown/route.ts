import { NextRequest, NextResponse } from 'next/server';
import TurndownService from 'turndown';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get('path');

  if (!path) {
    return new NextResponse('Path parameter is required', { status: 400 });
  }

  const host = request.headers.get('host');
  const protocol = host?.includes('localhost') ? 'http' : 'https';
  
  try {
    const base = `${protocol}://${host}`;
    const url = new URL(path, base);

    // SSRF protection: ensure resolved URL belongs to our origin
    if (url.origin !== base) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // Fetch the original HTML, bypassing markdown middleware
    const htmlResponse = await fetch(url.toString(), {
      headers: {
        'x-bypass-markdown': 'true',
        'accept': 'text/html'
      }
    });

    if (!htmlResponse.ok) {
      return new NextResponse(`Failed to fetch HTML: ${htmlResponse.statusText}`, { status: htmlResponse.status });
    }

    const html = await htmlResponse.text();

    // Convert to markdown
    const turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced'
    });
    
    // Clean up Next.js injected scripts if needed before converting, but turndown generally ignores scripts.
    turndownService.remove(['script', 'noscript', 'style']);
    
    const markdown = turndownService.turndown(html);

    return new NextResponse(markdown, {
      headers: {
        'Content-Type': 'text/markdown',
      }
    });
  } catch (error) {
    console.error('Error rendering markdown:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
