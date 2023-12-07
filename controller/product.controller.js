const { populate } = require("../models/product.model");
const productModel = require("../models/product.model");
module.exports = {

    create:function(req,res,next){
        console.log(req.body)
        const product = new productModel(req.body);
        product.save(req.body, function (err, result) {
            if (err) 
             next(err);
            else

            result.populate("orders").populate("Subcategories").execPopulate(function(err,item){
             res.json({status: "success", message: "product added successfully!!!", data: item});
            
          });
         });
     },
     update:function(req,res,next){
        console.log(req.body)
        productModel.findOneAndUpdate({_id:req.body.id},req.body, function (err, result) {
            if (err) 
             next(err);
            else
             res.json({status: "success", message: "product updated successfully!!!", data: result});
            
          });
     },
     delete:function(req,res,next){
        console.log(req.body)
        productModel.findOneAndDelete({_id:req.body.id}, function (err, result) {
            if (err) 
             next(err);
            else
             res.json({status: "success", message: "product deleted successfully!!!", data: result});
            
          });
     },
     find:function(req,res,next){
        console.log(req.body)
        productModel.find({}).populate("order").populate("subcategory").exec( function (err, result) {
            if (err) 
             next(err);
            else
             res.json({status: "success", message: "product found successfully!!!", data: result});
            
          });
     },
     findById:function(req,res,next){
        console.log(req.body)
        productModel.find({_id:req.params.id}).populate("subcategory").populate("order").exec( function (err, result) {
            if (err) 
             next(err);
            else
             res.json({status: "success", message: "product found successfully!!!", data: result});
            
          });
     }
}