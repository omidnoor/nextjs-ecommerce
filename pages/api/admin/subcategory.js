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
      subcategory: await SubCategory.find({}).sort({ updateAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await db.disconnectDb();
  }
});

handler.delete(async (req, res) => {
  try {
    const { id, name, parent } = req.body;
    await db.connectDb();
    await SubCategory.findByIdAndRemove(id, { name, parent });
    res.status(200).json({
      message: "SubCategory deleted",
      subcategory: await SubCategory.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await db.disconnectDb();
  }
});

handler.put(async (req, res) => {
  try {
    const { id, name, parent } = req.body;
    await db.connectDb();
    await SubCategory.findByIdAndUpdate(id, {
      name,
      parent,
      slug: slugify(name),
    });
    res.status(200).json({
      message: "SubCategory has been updated",
      subcategory: await SubCategory.find({}).sort({ createdAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await db.disconnectDb();
  }
});

handler.get(async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) {
      res.json([]);
    }
    await db.connectDb();
    const results = await SubCategory.find({ parent: category })
      .select("name")
      .lean();

    // console.log(results);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await db.disconnectDb();
  }
});

export default handler;
