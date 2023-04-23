import nc from "next-connect";
import auth from "../../../../middleware/auth";
import Order from "../../../../models/Order";
import db from "../../../../utils/db";

const handler = nc().use(auth);

handler.put(async (req, res) => {
  try {
    await db.connectDb();
    const order = await Order.findById(req.qurey.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        email_address: req.body.email_address,
      };
      const newOrder = await order.save();
      res.json({ message: "Order is paid.", order: newOrder });
    } else {
      res.status(404).json({ message: "Order is not found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await db.disconnectDb();
  }
});

export default handler;
