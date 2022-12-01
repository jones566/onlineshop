import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  purchaseimage: [],
  purchaseprice: [],
  purchasetotalprice: [],
  purchaseslug: [],
  customername: []
  
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase;