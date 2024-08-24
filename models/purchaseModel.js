import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  purchaseimage: [],
  purchaseprice: [],
  purchasetotalprice: [],
  purchaseslug: [],
  customername: [],
  size: [],
  quantity: [],
  color: []
  
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase;