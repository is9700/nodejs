const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const subcategorySchema = new Schema({
  name: String,
  description: String,
  products : [{type:Schema.Types.ObjectId, ref:"Products"}],
  category : {type:Schema.Types.ObjectId, ref:"Categories"}

});

module.exports = mongoose.model("Subcategories",subcategorySchema);