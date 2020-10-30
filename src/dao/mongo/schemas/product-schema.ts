import { Schema } from "mongoose";
import mongoose from "mongoose";

export const product = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId, required: false },
  productName: String,
  productCode: String,
  proddescription: String,
  prodRating: Number,
});

const products = mongoose.model("products", product);
export default products;