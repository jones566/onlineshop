import mongoose from "mongoose";

const securitySchema = new mongoose.Schema({
  username: String,
  password: String,
});

const Security = mongoose.model("Security", securitySchema);

export default Security;
