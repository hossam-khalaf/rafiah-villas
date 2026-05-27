import { NextResponse } from 'next/server';

export function GET() {
  const data = {
    issuer: "https://rafiah-villas.vercel.app",
    authorization_endpoint: "https://rafiah-villas.vercel.app/oauth/authorize",
    token_endpoint: "https://rafiah-villas.vercel.app/oauth/token",
    jwks_uri: "https://rafiah-villas.vercel.app/oauth/jwks",
    scopes_supported: ["openid", "profile", "email", "api:read"],
    response_types_supported: ["code", "token", "id_token"],
    grant_types_supported: ["authorization_code", "client_credentials"],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256"]
  };

  return NextResponse.json(data);
}
