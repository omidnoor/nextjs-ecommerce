import nc from "next-connect";
import db from "@/utils/db";
import Product from "@/models/product";

const handler = nc();

handler.get(async (req, res) => {
  try {
    db.connectDb();
    const id = req.query.id;
    const style = req.query.style;
    const size = req.query.size;
    const product = await Product.findById(id).lean();
    let discount = product.subProducts[style].discount;
    let priceBefore = product.subProducts[style].sizes[size].price;
    let price = discount ? priceBefore * (1 - discount / 100) : priceBefore;
    db.disconnectDb();

    return res.status(200).json({
      _id: product._id,
      name: product.name,
      description: product.description,
      style: Number(style),
      slug: product.slug,
      //   sku: product.subProducts[style].sku,
      brand: product.brand,
      shipping: product.shipping,
      images: product.subProducts[style].images,
      color: product.subProducts[style].color,
      size: product.subProducts[style].sizes[size],
      price,
      priceBefore,
      discount,
      quantity: product.subProducts[style].sizes[size].qty,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
