'use client';

import { useEffect } from 'react';

export function WebMCPProvider() {
  useEffect(() => {
    // Check if the browser supports WebMCP
    if (typeof navigator !== 'undefined' && 'modelContext' in navigator) {
      try {
        (navigator as any).modelContext.provideContext({
          tools: [
            {
              name: "get_villas_info",
              description: "Get general information about Rafiah Villas",
              inputSchema: { type: "object", properties: {} },
              execute: async () => {
                return { content: "Rafiah Villas are premium luxury villas located in Riyadh." };
              }
            }
          ]
        });
      } catch (err) {
        console.error("Failed to initialize WebMCP:", err);
      }
    }
  }, []);

  return null; // This component doesn't render anything
}
