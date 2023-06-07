const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName:{
        //RassiChain, LotusChain eg in type chain
        type:String,
        required:true,
    },
    productQuantity:{
        type:Number,
        required:true
    },
    productWeight:{
        type:Number,
        required:true
    },
    productType:{
        //Jhumka, Necklace,Chain
        type:String,
        required:true
    },
    productMetal:{
        //gold,silver
        type:String,
        required:true
    },
    productPurety:{
        type:Number,
        required:true
    },
    productPhoto:{
        type:String,
        required:true
    }
});

module.exports= mongoose.model("Product",productSchema);
