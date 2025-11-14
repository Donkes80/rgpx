export default function handler(req, res) {
  const ip =
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress;

  console.log(`[VISIT] ${ip} → ${req.method} ${req.url}`);

  res.status(200).json({ ok: true });
}
