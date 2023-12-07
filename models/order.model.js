const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
  reference: String,
  description: String,
  user : {type : Schema.Types.ObjectId ,ref:"Users" },
  product : [{type : Schema.Types.ObjectId ,ref:"Products" }]
  
});
module.exports = mongoose.model("Orders",OrderSchema);