export default async function handler(req, res) {
  try {
    const workerModule = await import("../dist/server/server.js");
    const worker = workerModule.default;

    if (!worker || typeof worker.fetch !== "function") {
      res.status(500).send("Worker module not loaded or missing fetch handler");
      return;
    }

    const url = new URL(
      req.url,
      `https://${req.headers.host || "localhost"}`
    );

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

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          for (const v of value) headers.append(key, v);
        } else {
          headers.set(key, value);
        }
      }
    }

    const fetchRequest = new Request(url.toString(), {
      method: req.method,
      headers,
      body: body ?? undefined,
    });

    const response = await worker.fetch(fetchRequest, {}, {});

    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }

    res.status(response.status);
    const respBody = await response.arrayBuffer();
    res.end(Buffer.from(respBody));
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
