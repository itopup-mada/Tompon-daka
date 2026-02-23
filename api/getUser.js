import { db } from "./firebase.js";

export default async function handler(req, res) {
  const { uid } = req.query;

  if (!uid)
    return res.status(400).json({ error: "UID required" });

  try {
    const snapshot = await db.ref("users/" + uid).once("value");
    res.status(200).json(snapshot.val());
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
