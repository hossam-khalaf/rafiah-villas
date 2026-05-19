import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export async function POST(req: NextRequest) {
  try {
    // We use the parseBody utility from next-sanity to automatically verify the signature
    // using the secret we define in Sanity and Vercel.
    const secret = process.env.SANITY_WEBHOOK_SECRET;
    
    if (!secret) {
      return new Response(
        JSON.stringify({ message: 'Missing SANITY_WEBHOOK_SECRET in environment variables' }), 
        { status: 500 }
      );
    }

    const { isValidSignature, body } = await parseBody(req, secret);

    if (!isValidSignature) {
      return new Response(
        JSON.stringify({ message: 'Invalid signature', isValidSignature, body }), 
        { status: 401 }
      );
    }

    if (!body?._type) {
      return new Response(
        JSON.stringify({ message: 'Bad Request, missing document type', body }), 
        { status: 400 }
      );
    }

    // Whenever ANY villa document changes, we revalidate the 'villa' tag cache instantly
    if (body._type === 'villa' || body._type === 'siteSettings') {
      // In Next.js 16, revalidateTag has a breaking API change. 
      // Using revalidatePath('/', 'layout') is safer and purges the entire site cache instantly.
      revalidatePath('/', 'layout');
      return NextResponse.json({ status: 200, revalidated: true, now: Date.now(), body });
    }

    return NextResponse.json({ status: 200, revalidated: false, message: 'No relevant document types changed' });
  } catch (err: any) {
    console.error('Webhook error:', err);
    return new Response(err.message, { status: 500 });
  }
}
