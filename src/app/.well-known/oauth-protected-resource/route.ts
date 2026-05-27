import { NextResponse } from 'next/server';

export function GET() {
  const data = {
    resource: "https://rafiah-villas.vercel.app/api",
    authorization_servers: [
      "https://rafiah-villas.vercel.app"
    ],
    scopes_supported: ["api:read", "api:write"],
    bearer_methods_supported: ["header"]
  };

  return NextResponse.json(data);
}
