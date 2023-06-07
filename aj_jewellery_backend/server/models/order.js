const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    productId:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },
    orderDate:{
        //OrderedDate
        type:Date,
        required:true,
    },
    orderPrice:{
        type:Number,
        required:true,
    },
    orderQuantity:{
        type:Number,
        required:true,
    },
    status:{
        //(0,false)->pending, (1,true)-> delivered
        type:Boolean,
        required:true,
    }
});

module.exports= mongoose.model("Order",orderSchema);
