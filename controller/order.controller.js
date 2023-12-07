const orderModel = require("../models/order.model");
module.exports = {

    create:function(req,res,next){
        console.log(req.body)
        const order = new orderModel(req.body);
        order.save(req.body, function (err, result) {
            if (err) 
             next(err);
            else
             result.populate("products").populate("user").execPopulate(function(err,item){
             res.json({status: "success", message: "order added successfully!!!", data: item});
            
          });
         });
     },
     update:function(req,res,next){
        console.log(req.body)
        orderModel.findOneAndUpdate({_id:req.body.id},req.body, function (err, result) {
            if (err) 
             next(err);
            else
             res.json({status: "success", message: "order updated successfully!!!", data: result});
            
          });
     },
     delete:function(req,res,next){
        console.log(req.body)
        orderModel.findOneAndDelete({_id:req.body.id}, function (err, result) {
            if (err) 
             next(err);
            else
             res.json({status: "success", message: "order deleted successfully!!!", data: result});
            
          });
     },
     find:function(req,res,next){
        console.log(req.body)
        orderModel.find({}).populate("user").populate("product").exec( function (err, result) {
            if (err) 
             next(err);
            else
             res.json({status: "success", message: "order found successfully!!!", data: result});
            
          });
     },
     findById:function(req,res,next){
        console.log(req.body)
        orderModel.find({_id:req.params.id}).populate("user").populate("product").exec( function (err, result) {

            if (err) 
             next(err);
            else
             res.json({status: "success", message: "order found successfully!!!", data: result});
            
          });
     }
}