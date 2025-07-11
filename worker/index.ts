interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Health check endpoint
    if (url.pathname === "/health") {
      return new Response(
        JSON.stringify({
          status: "healthy",
          phase: "1",
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

    // API routes (future phases)
    if (url.pathname.startsWith("/api/")) {
      return new Response(
        JSON.stringify({ error: "API not implemented yet" }),
        {
          status: 501,
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
