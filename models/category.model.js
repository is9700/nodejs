const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Categoryschema = new Schema({
  reference: String,
  description: String,
  name : String,
  subcategories : [{type:Schema.Types.ObjectId, ref:"Subcategories"}]

});
module.exports = mongoose.model("Categories",Categoryschema);