import { NextResponse } from 'next/server';

export function GET() {
  const data = {
    $schema: "https://agentskills.io/schema/index-v0.2.0.json",
    skills: [
      {
        name: "get_villas",
        type: "api",
        description: "Retrieve list of luxury villas",
        url: "https://rafiah-villas.vercel.app/api/openapi.json",
        digest: "sha256-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
      }
    ]
  };

  return NextResponse.json(data);
}
