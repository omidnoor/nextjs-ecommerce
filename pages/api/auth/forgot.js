import nc from "next-connect";

import { validateEmail } from "@/utils/validation";
import db from "@/utils/db";
import User from "@/models/User";
import { createResetToken } from "@/utils/tokens";
import { sendEmail } from "@/utils/sendEmails";
import { resetEmailTemplate } from "@/emails/resetEmailTemplate";

const handler = nc();

handler.post(async (req, res) => {
  if (req.method !== "POST") return res.status(405).send("not allowed");
  try {
    await db.connectDb();
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User does not exist" });

    const user_id = createResetToken({
      id: user._id.toString(),
    });

    const url = `${process.env.BASE_URL}/auth/reset/${user_id}`;

    sendEmail(email, url, "", "Reset you password", resetEmailTemplate);

    await db.disconnectDb();

    res.status(201).json({ message: "An email has been sent to you." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
