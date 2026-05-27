import { NextResponse } from 'next/server';

export function GET() {
  const data = {
    $schema: "https://modelcontextprotocol.org/schema/server-card-v1.json",
    serverInfo: {
      name: "rafiah-villas",
      version: "1.0.0",
      description: "Rafiah Villas Agent Interface"
    },
    capabilities: {
      prompts: {},
      resources: {},
      tools: {}
    },
    transport: {
      type: "sse",
      endpoint: "https://rafiah-villas.vercel.app/api/mcp/sse"
    }
  };

  return NextResponse.json(data);
}
