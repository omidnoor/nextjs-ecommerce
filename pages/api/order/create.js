import nc from "next-connect";
import db from "@/utils/db";
import User from "@/models/User";
import Cart from "@/models/cart";
import Product from "@/models/product";
import auth from "@/middleware/auth";
import Order from "@/models/Order";

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const {
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    } = req.body;
    const user = await User.findById(req.user);
    const newOrder = await Order({
      user: user._id,
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    }).save();

    res.json({ order_id: newOrder._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    db.disconnectDb();
  }
});

export default handler;
