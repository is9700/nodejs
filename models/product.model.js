const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Productschema = new Schema({
  reference: String,
  price: String,
  colour: String,
  description: String,
  orders : [{type:Schema.Types.ObjectId, ref:"Orders"}],
  subcategory : {type:Schema.Types.ObjectId, ref:"Subcategories"}
  
 
});
module.exports = mongoose.model("Products",Productschema);