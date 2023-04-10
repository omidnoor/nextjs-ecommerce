import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const subCategory = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, "must be at least 2 characters"],
      maxlength: [50, "must be less than 50 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true },
);

const SubCategory =
  mongoose.models.SubCategory || mongoose.model("SubCategory", subCategory);

export default SubCategory;
