import auth from "@/middleware/auth";
import Category from "@/models/Category";
import db from "@/utils/db";
import nc from "next-connect";
import slugify from "slugify";

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { name } = req.body;

    const test = await Category.findOne({ name });
    if (test) {
      res.status(400).json({ message: "Category already exists" });
    }
    const newCategory = await new Category({
      name,
      slug: slugify(name),
    }).save();
    res.status(200).json({
      message: "Category created",
      category: await Category.find({}).sort({ updateAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await db.disconnectDb();
  }
});

export default handler;
