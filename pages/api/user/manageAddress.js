import nc from "next-connect";
import db from "@/utils/db";
import User from "@/models/User";
import Cart from "@/models/cart";
import Product from "@/models/product";
import auth from "@/middleware/auth";

const handler = nc().use(auth);

handler.put(async (req, res) => {
  try {
    await db.connectDb();
    const { id } = req.body;
    const user = await User.findById(req.user).lean();
    // console.log("User:", user);
    // console.log("User Addresses:", user.address);
    const userAddresses = user.address;
    const addresses = user.address.map((address) => {
      if (address._id.toString() === id) {
        return { ...address, active: true };
      } else {
        return { ...address, active: false };
      }
    });

    try {
      const newUserData = await User.updateOne(
        { _id: req.user },
        { address: addresses },
        { new: true },
      );

      res.status(200).json({ addresses });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await db.disconnectDb();
  }
});

export default handler;
