export default function handler(req, res) {
  if (req.method === "POST") {
    let data = "";

    req.on("data", chunk => data += chunk);
    req.on("end", () => {
      try {
        const body = JSON.parse(data);

        const ip =
          req.headers["x-real-ip"] ||
          req.headers["x-forwarded-for"] ||
          req.socket.remoteAddress;

        console.log(`[FULL] ${ip} -> ${body.method} ${body.url}`);
      } catch (e) {
        console.log("Log parse error");
      }
    });
  }

  res.status(200).json({ ok: true });
}
