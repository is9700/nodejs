const subcategoryModel = require("../models/subcategory.model");
module.exports = {

    create:function(req,res,next){
        console.log(req.body)
        const subcategory = new subcategoryModel(req.body);
        subcategory.save(function (err, result) {
            if (err) 
             next(err);
            else{
                result.populate("category").populate("product").execPopulate(function(err,item){
                    res.json({status: "success", message: "Subcategory added successfully!!!", data: item});

                });

            }
            
          });
    },
    update:function(req,res,next){
        console.log(req.body)
        subcategoryModel.findOneAndUpdate({_id:req.params.id},req.body).populate("category").exec(function (err, result) {
            if (err) 
             next(err);
            else
            
             res.json({status: "success", message: "Subcategory updated successfully!!!", data: result});
            
          });
    },
    delete:function(req,res,next){
        console.log(req.body)
        subcategoryModel.findOneAndDelete({_id:req.body.id}, function (err, result) {
            if (err) 
             next(err);
            else
             res.json({status: "success", message: "Subcategory deleted successfully!!!", data: result});
            
          });
    },
    find:function(req,res,next){
        console.log(req.body)
        subcategoryModel.find({}).populate("category").populate("product").exec( function (err, result) {
            if (err) 
             next(err);
            else
             res.json({status: "success", message: "Subcategory found successfully!!!", data: result});
            
          });
    },
    findById:function(req,res,next){
        console.log(req.body)
        subcategoryModel.find({_id:req.params.id}).populate("category").populate("product").exec( function (err, result) {
            if (err) 
             next(err);
            else
             res.json({status: "success", message: "Subcategory found successfully!!!", data: result});
            
          });
    }
}