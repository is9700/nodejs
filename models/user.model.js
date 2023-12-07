const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  firstName: {
    type:String,
    required:true
  },
  lastName: String,
  email: {
    type:String,required:true,unique:true
  },
  password: String,
  orders : [{type:Schema.Types.ObjectId, ref:"Orders"}]

});

// hash user password before saving into database
UserSchema.pre('save', function(next){
  this.password = bcrypt.hashSync(this.password, 10);
  next();
  });

  


module.exports = mongoose.model("Users",UserSchema);