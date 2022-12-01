import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  ordertitle: String,
  orderprice: Number,
  customer: String,
  productname: String,
  productimage: String
});

const Order = mongoose.model("Order", orderSchema);

export default Order;