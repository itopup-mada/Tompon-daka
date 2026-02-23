import { auth, db } from "./firebase.js";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { name, email, password } = req.body;

  try {
    const user = await auth.createUser({
      email,
      password,
      displayName: name
    });

    await db.ref("users/" + user.uid).set({
      uid: user.uid,
      name,
      email,
      createdAt: Date.now()
    });

    res.status(200).json({ success: true, uid: user.uid });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
