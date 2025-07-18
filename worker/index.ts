import { drizzle } from "drizzle-orm/d1";
import { challenges } from "./db/schema";
import { seedChallenges } from "./db/seed";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const db = drizzle(env.DB);

    // Health check endpoint
    if (url.pathname === "/health") {
      return new Response(
        JSON.stringify({
          status: "healthy",
          phase: "2",
          timestamp: new Date().toISOString(),
          version: "1.0.0",
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // API routes
    if (url.pathname.startsWith("/api/")) {
      // Handle CORS preflight
      if (request.method === "OPTIONS") {
        return new Response(null, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        });
      }

      // Get all challenges
      if (url.pathname === "/api/challenges" && request.method === "GET") {
        try {
          const allChallenges = await db.select().from(challenges);
          
          // If no challenges exist, seed the database
          if (allChallenges.length === 0) {
            await db.insert(challenges).values(seedChallenges);
            const newChallenges = await db.select().from(challenges);
            
            return new Response(JSON.stringify(newChallenges), {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            });
          }

          return new Response(JSON.stringify(allChallenges), {
            headers: {
              "Content-Type": "application/json", 
              "Access-Control-Allow-Origin": "*",
            },
          });
        } catch (error) {
          return new Response(
            JSON.stringify({ 
              error: "Failed to fetch challenges",
              details: error instanceof Error ? error.message : "Unknown error"
            }),
            {
              status: 500,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );
        }
      }

      // Default API response for unimplemented endpoints
      return new Response(
        JSON.stringify({ error: "API endpoint not found" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Serve static assets (SPA)
    return env.ASSETS.fetch(request);
  },
};
