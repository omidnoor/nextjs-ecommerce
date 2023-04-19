import nc from "next-connect";
import db from "@/utils/db";
import Product from "@/models/product";

const handler = nc();

handler.post(async (req, res) => {
  try {
    const promises = req.body.products.map(async (product) => {
      let dbProduct = await Product.findById(product._id).lean();
      let originalPrice = dbProduct.subProducts[product.style].sizes.find(
        (x) => x.size === product.size.size,
      ).price;
      let quantity = dbProduct.subProducts[product.style].sizes.find(
        (x) => x.size === product.size.size,
      ).qty;
      let discount = dbProduct.subProducts[product.style].discount;
      // console.log("before return");
      // console.log(product);
      return {
        ...product,
        priceBefore: originalPrice,
        price:
          discount > 0
            ? originalPrice - (originalPrice * discount) / 100
            : originalPrice,
        quantity: quantity,
        shipping: dbProduct.shipping,
      };
    });
    const data = await Promise.all(promises);
    // console.log(data);
    return res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    db.disconnectDb();
  }
});

export default handler;
