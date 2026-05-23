export default async function handler(req, res) {
  try {
    // Import the worker handler from the built server
    const workerModule = await import("../../dist/server/server.js");
    const worker = workerModule.default;

    if (!worker) {
      return res.status(500).json({ error: "Worker not loaded" });
    }

    // Convert Node.js request to Fetch API request
    const url = new URL(
      req.url,
      `http://${req.headers.host || "localhost"}`
    );

    // Prepare request body
    let body = undefined;
    if (req.method !== "GET" && req.method !== "HEAD") {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      if (chunks.length > 0) {
        body = Buffer.concat(chunks);
      }
    }

    // Create fetch-compatible Request
    const fetchRequest = new Request(url.toString(), {
      method: req.method,
      headers: req.headers,
      body: body || undefined,
    });

    // Call the worker handler
    const response = await worker.fetch(fetchRequest);

    // Forward response headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // Send response
    res.status(response.status);
    const respBody = await response.arrayBuffer();
    res.send(Buffer.from(respBody));
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
}
