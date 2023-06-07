const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    userName:{
        type:String,
        required:true,
    },
    userEmail:{
        type:String,
        required:true,
    },
    userPassword:{
        type:String,
        required:true,
    },
    userMobile:{
        type:String,
    },
    //in cart not ordered yet
    userCart:[String]
});


module.exports= mongoose.model("User",userSchema);