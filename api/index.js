export default async function handler(req, res) {
  try {
    const workerModule = await import("../dist/server/server.js");
    const worker = workerModule.default;

    if (!worker) {
      return res.status(500).json({ error: "Worker not loaded" });
    }

    const url = new URL(
      req.url,
      `http://${req.headers.host || "localhost"}`
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

    const fetchRequest = new Request(url.toString(), {
      method: req.method,
      headers: req.headers,
      body: body || undefined,
    });

    const response = await worker.fetch(fetchRequest);

    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

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
