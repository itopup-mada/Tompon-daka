import { db } from "./firebase.js";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { gameId, board, nextTurn } = req.body;

  if (!gameId)
    return res.status(400).json({ error: "GameId required" });

  try {
    await db.ref("games/" + gameId).update({
      board,
      turn: nextTurn
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
