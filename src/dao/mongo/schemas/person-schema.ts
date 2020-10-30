import { Schema } from "mongoose";
import mongoose from "mongoose";
import { Sex } from "../../../models/sex.enum";

export const person = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId, required: false },
  name: String,
  age: Date,
  sex: Number,
});

const persons = mongoose.model("persons", person);
export default persons;