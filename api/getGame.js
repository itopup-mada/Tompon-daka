import { db } from "./firebase.js";

export default async function handler(req, res) {
  const { gameId } = req.query;

  if (!gameId)
    return res.status(400).json({ error: "GameId required" });

  try {
    const snapshot = await db.ref("games/" + gameId).once("value");
    res.status(200).json(snapshot.val());
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
