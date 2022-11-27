import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  ordertitle: String,
  orderprice: String,
  customer: String,
  productname: String 
});

const Order = mongoose.model("Order", orderSchema);

export default Order;