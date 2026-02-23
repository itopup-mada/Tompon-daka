import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;
const allowedOrigin = process.env.ALLOWED_ORIGIN;

export default function handler(req, res) {

  if (req.headers.origin !== allowedOrigin) {
    return res.status(403).json({ error: "Forbidden origin" });
  }

  const auth = req.headers.authorization;
  if (!auth) return res.status(401).end();

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    res.json({ username: decoded.username });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
