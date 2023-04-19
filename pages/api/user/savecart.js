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
    const { cart } = req.body;
    // console.log(cart);
    let products = [];
    let user = await User.findById(req.user);
    let existCart = await Cart.findOne({ user: user_id });
    if (existCart) {
      await existCart.remove();
    }
    for (let i = 0; i < cart.length; i++) {
      const dbProduct = await Product.findById(cart[i]._id).lean();
      const subProduct = dbProduct.subProducts[cart[i].style];
      let tempProduct = {};
      tempProduct.name = dbProduct.name;
      tempProduct.price = dbProduct.price;
      tempProduct.image = subProduct.images[0].url;
      tempProduct.color = {
        color: cart[i].color.color,
        image: cart[i].color.image,
      };
      tempProduct.qty = Number(cart[i].qty);
      tempProduct.size = cart[i].size;
      // console.log(cart[i].size.size);
      let price = Number(
        subProduct.sizes.find((p) => {
          return p.size === cart[i].size.size;
        }).price,
      );
      tempProduct.price =
        subProduct.discount > 0
          ? price - price * Number(subProduct.discount / 100).toFixed(2)
          : price.toFixed(2);

      products.push(tempProduct);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal += products[i].price * products[i].qty;
    }
    await new Cart({
      user: user._id,
      products: products,
      cartTotal: cartTotal.toFixed(2),
    }).save();
    res.status(200).json({ message: "Cart saved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    db.disconnectDb();
  }
});

export default handler;
