const Admin = require("../models/admin");
const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/order");
const Cart = require("../models/cart");



exports.getOrders = async(req,res)=>{
  try{
    const porders=await Order.find({status:false});

    let pendingOrders=[];
    for await(const item of porders){
      const productId=item.productId; 
      const userId=item.userId;
      const productName=await Product.findOne({_id:productId},'productName');
      const userName=await User.findOne({_id:userId},'userName');
      pendingOrders.push([item,productName,userName]);
    }

    //get Delivered order
    let deliveredItems=[];
    const dItems=await Order.find({status:true});
    for await(const item of dItems){
      const productId=item.productId;  
      const userId=item.userId;
      const productName=await Product.findOne({_id:productId},'productName');
      const userName=await User.findOne({_id:userId},'userName');
      deliveredItems.push([item,productName,userName]);
    }
    
    res.status(200).send({pending:pendingOrders,delivered:deliveredItems});

  }
  catch (err) {
    res.status(400).send({ message: "Error occured " + err });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const nameIfPresent = await Product.find({
      productName: req.body.productName,
    });
    if (nameIfPresent.length !== 0) {
      return res.status(200).send({
        message: "Product Already Present, if you want to add items Update!",
      });
    } else {
      const newProduct = new Product({
        productName: req.body.productName,
        productQuantity: req.body.productQuantity,
        productWeight: req.body.productWeight,
        productType: req.body.productType,
        productMetal: req.body.productMetal,
        productPurety: req.body.productPurety,
        productPhoto: req.body.productPhoto,
      });

      await newProduct.save();
      res.status(200).send({ message: "Product Added" });
    }
  } catch (err) {
    res.status(400).send({ message: "Error occured " + err });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.body.productId;
    const productName = req.body.productName;
    const productQuantity = req.body.productQuantity;
    const productWeight = req.body.productWeight;
    const productMetal = req.body.productMetal;
    const productType = req.body.productType;
    const productPurety = req.body.productPurety;
    const productPhoto = req.body.productPhoto;
    
    const product = await Product.findOne({ _id: productId });

    const updateProduct = await Product.updateOne(
      { _id: productId },
      {
        $set: {
          productName: productName,
          productQuantity: productQuantity,
          productWeight: productWeight,
          productMetal: productMetal,
          productType: productType,
          productPurety: productPurety,
          productPhoto: productPhoto,
        },
      }
    );
    return res.status(200).send({ message: "Updated Successfully" });
  } catch (err) {
    res.status(400).send({ message: "Error occured " + err });
  }
};

exports.deliverProduct = async (req, res) => {
  try {
    const orderId = req.body.orderId

    const deliverProduct = await Order.findOneAndUpdate(
      { _id:orderId},
      { $set: { status: true } }
    );

    return res.status(200).send({ message: "Delivered Successfully" });
  } catch (err) {
    res.status(400).send({ message: "Error occured " + err });
  }
};
require("../middleware/database");
