import auth from "@/middleware/auth";
import Category from "@/models/Category";
import Coupon from "@/models/Coupon";
import dateConverter from "@/utils/dateConverter";
import db from "@/utils/db";
import nc from "next-connect";
import slugify from "slugify";

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { coupon, discount, startDate, endDate } = req.body;

    const test = await Coupon.findOne({ coupon });
    if (test) {
      res.status(400).json({ message: "Coupon already exists" });
    }
    const newCoupon = await new Coupon({
      coupon,
      discount,
      startDate: dateConverter(startDate),
      endDate: dateConverter(endDate),
    }).save();

    res.status(200).json({
      message: `Coupon ${coupon} created`,
      coupons: await Coupon.find({}).sort({ updateAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await db.disconnectDb();
  }
});

handler.delete(async (req, res) => {
  try {
    const { id } = req.body;
    await db.connectDb();
    await Coupon.findByIdAndRemove(id);
    res.status(200).json({
      message: "Coupon deleted",
      coupons: await Coupon.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await db.disconnectDb();
  }
});

handler.put(async (req, res) => {
  try {
    const { id, coupon, discount, startDate, endDate } = req.body;
    await db.connectDb();
    await Coupon.findByIdAndUpdate(id, {
      coupon,
      discount,
      startDate: dateConverter(startDate),
      endDate: dateConverter(endDate),
    });
    res.status(200).json({
      message: "Coupon has been updated",
      coupons: await Coupon.find({}).sort({ createdAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await db.disconnectDb();
  }
});

export default handler;
