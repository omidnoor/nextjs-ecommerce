import nc from "next-connect";

import { validateEmail } from "@/utils/validation";
import db from "@/utils/db";

const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    console.log(req.body);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
