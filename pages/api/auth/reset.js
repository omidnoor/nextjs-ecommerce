import nc from "next-connect";
import bcrypt from "bcrypt";
import { validateEmail } from "@/utils/validation";
import db from "@/utils/db";
import User from "@/models/User";
import { createResetToken } from "@/utils/tokens";
import { sendEmail } from "@/utils/sendEmails";
import { resetEmailTemplate } from "@/emails/resetEmailTemplate";

const handler = nc();

handler.put(async (req, res) => {
  if (req.method !== "PUT") return res.status(405).send("not allowed");
  try {
    await db.connectDb();
    const { user_id, password } = req.body;

    const user = await User.findById(user_id);

    if (!user) return res.status(400).json({ message: "user not found" });

    const cryptedPassword = await bcrypt.hash(password, 12);
    await user.updateOne({
      password: cryptedPassword,
    });

    res.status(201).json({ message: "password updated", email: user.email });

    await db.disconnectDb();

    res.status(201).json({ message: "An email has been sent to you." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
