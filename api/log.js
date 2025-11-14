export default async function handler(req, res) {
  try {
    let body = "";

    await new Promise(resolve => {
      req.on("data", chunk => body += chunk);
      req.on("end", resolve);
    });

    const data = body ? JSON.parse(body) : {};

    const ip =
      req.headers["x-real-ip"] ||
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      "unknown";

    console.log(
      `[FULL LOG]\n` +
      `IP: ${ip}\n` +
      `Method: ${data.method}\n` +
      `URL: ${data.url}\n` +
      `Type: ${data.type}\n`
    );

    res.status(200).json({ ok: true });
  } catch (err) {
    console.log("Logging error", err);
    res.status(500).json({ error: "failed" });
  }
}
