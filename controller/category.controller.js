const categoryModel = require("../models/category.model");
module.exports = {

    create:function(req,res,next){
        console.log(req.body)
        const category = new categoryModel(req.body);

        category.create(req.body, function (err, result) {
            if (err) 
             next(err);
            else

             result.populate("Subcategories").execPopulate(function(err,item){
             res.json({status: "success", message: "category added successfully!!!", data: item});
            
          });
         });
     },
     update:function(req,res,next){
        console.log(req.body)
        categoryModel.findOneAndUpdate({_id:req.body.id},req.body, function (err, result) {
            if (err) 
             next(err);
            else
             res.json({status: "success", message: "category updated successfully!!!", data: result});
            
          });
     },
     delete:function(req,res,next){
        console.log(req.body)
        categoryModel.findOneAndDelete({_id:req.body.id}, function (err, result) {
            if (err) 
             next(err);
            else
             res.json({status: "success", message: "category deleted successfully!!!", data: result});
            
          });
     },
     find:function(req,res,next){
        console.log(req.body)
        categoryModel.find({}).populate("subcategory").exec( function (err, result) {

            if (err) 
             next(err);
            else
             res.json({status: "success", message: "category found successfully!!!", data: result});
            
          });
     },
     findById:function(req,res,next){
        console.log(req.body)
        categoryModel.find({_id:req.params.id}).populate("subcategory").exec(function (err, result) {
            if (err) 
             next(err);
            else
             res.json({status: "success", message: "category found successfully!!!", data: result});
            
          });
     }
}