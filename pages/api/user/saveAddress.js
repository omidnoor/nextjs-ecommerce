import nc from "next-connect";
import db from "@/utils/db";
import User from "@/models/User";
import Cart from "@/models/cart";
import Product from "@/models/product";
import auth from "@/middleware/auth";

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { address } = req.body;
    const user = User.findById(req.user);
    await user.updateOne({
      $push: {
        address: address,
      },
    });

    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    db.disconnectDb();
  }
});

export default handler;
