import nc from "next-connect";
import db from "@/utils/db";
import User from "@/models/User";
import Cart from "@/models/cart";
import Product from "@/models/product";
import auth from "@/middleware/auth";
import Coupon from "@/models/Coupon";

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { coupon } = req.body;
    const user = await User.findById(req.user);
    const checkCoupon = await Coupon.findOne({ coupon });
    if (checkCoupon) {
      return res.json({ message: "Invalid Coupon" });
    }
    const { cartTotal } = Cart.findOne({ user: req.user });
    let totalAfterDiscount =
      cartTotal - (cartTotal * checkCoupon.discount) / 100;

    await Cart.findOneAndUpdate(
      { user: req.user },
      { totalAfterDiscount },
      { new: true },
    );
    res.json({
      message: "Discount applied",
      totalAfterDiscount,
      discount: checkCoupon.discount,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occurred while applying the coupon. Please try again later.",
    });
  } finally {
    db.disconnectDb();
  }
});

export default handler;
