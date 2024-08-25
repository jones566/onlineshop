import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // User identifier
  ordertitle: String,
  orderprice: Number,
  customer: String,
  productname: String,
  productimage: String
});

const Order = mongoose.model("Order", orderSchema);

export default Order;