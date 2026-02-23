import { db } from "./firebase.js";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { player1, player2 } = req.body;

  if (!player1 || !player2)
    return res.status(400).json({ error: "Players required" });

  try {
    const gameRef = db.ref("games").push();
    const gameId = gameRef.key;

    await gameRef.set({
      player1,
      player2,
      board: "initial",
      turn: player1,
      createdAt: Date.now()
    });

    res.status(200).json({ gameId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
