import { NextResponse } from 'next/server';

export function GET() {
  const data = {
    linkset: [
      {
        anchor: "https://rafiah-villas.vercel.app/api",
        "service-desc": [
          {
            href: "https://rafiah-villas.vercel.app/api/openapi.json",
            type: "application/openapi+json"
          }
        ],
        "service-doc": [
          {
            href: "https://rafiah-villas.vercel.app/api/docs",
            type: "text/html"
          }
        ],
        status: [
          {
            href: "https://rafiah-villas.vercel.app/api/health",
            type: "application/json"
          }
        ]
      }
    ]
  };

  return NextResponse.json(data, {
    headers: {
      'Content-Type': 'application/linkset+json',
    },
  });
}
