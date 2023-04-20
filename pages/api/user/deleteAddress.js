import nc from "next-connect";
import db from "@/utils/db";
import User from "@/models/User";
import Cart from "@/models/cart";
import Product from "@/models/product";
import auth from "@/middleware/auth";

const handler = nc().use(auth);

handler.delete(async (req, res) => {
  try {
    await db.connectDb();
    const { id } = req.body;
    try {
      const newUserData = await User.findByIdAndUpdate(
        req.user,
        {
          $pull: {
            address: { _id: id },
          },
        },
        { new: true },
      );
      return res.status(200).json({ addresses: newUserData.address });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    db.disconnectDb();
  }
});

export default handler;
