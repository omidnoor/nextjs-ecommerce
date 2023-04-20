import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        image: {
          type: String,
        },
        size: {
          type: String,
        },
        // style: {
        //   style: String,
        //   color: String,
        //   image: String,
        // },
        qty: {
          type: Number,
        },
        color: {
          color: String,
          image: String,
        },
        name: String,
        price: Number,
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
