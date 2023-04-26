import auth from "@/middleware/auth";
import Category from "@/models/Category";
import SubCategory from "@/models/subCategory";
import db from "@/utils/db";
import nc from "next-connect";
import slugify from "slugify";

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { name, parent } = req.body;

    const test = await SubCategory.findOne({ name });
    if (test) {
      res.status(400).json({ message: "SubCategory already exists" });
    }
    const newSubCategory = await new SubCategory({
      name,
      parent,
      slug: slugify(name),
    }).save();

    res.status(200).json({
      message: "SubCategory has been created",
      subcategories: await SubCategory.find({}).sort({ updateAt: -1 }),
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
    await SubCategory.findByIdAndRemove(id);
    res.status(200).json({
      message: "SubCategory deleted",
      categories: await Category.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await db.disconnectDb();
  }
});

handler.put(async (req, res) => {
  try {
    const { id, name } = req.body;
    await db.connectDb();
    await Category.findByIdAndUpdate(id, { name });
    res.status(200).json({
      message: "Category has been updated",
      categories: await Category.find({}).sort({ createdAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await db.disconnectDb();
  }
});

export default handler;
