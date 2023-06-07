const Admin = require("../models/admin");
const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/order");
const Cart = require("../models/cart");
const { sha256 } = require("js-sha256");

require("../middleware/database");

exports.signUp = async (req, res) => {
  try {
    const { userName, userEmail, userPassword, userMobile } = req.body;
    const emailRegex = /@gmail.com/;

    if (!emailRegex.test(userEmail)) {
      throw "Please use the gmail account";
    }

    if (userPassword.length < 6)
      throw "Password must be atleast 6 characters long.";

    //check if user exists
    const userExists = await User.findOne({
      $or: [{ userName: userName }, { userEmail: userEmail }],
    });

    if (userExists) throw "User with same credentials exists.";

    const user = new User({
      userName,
      userEmail,
      userPassword: sha256(userPassword + process.env.SALT),
      userMobile,
    });

    await user.save();

    res.status(200).send({
      type: "success",
      message: "User " + userName + " registered successfully",
    });
  } catch (err) {
    res.status(400).send({ type: "error", message: "Error occured " + err });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { userCredential, userPassword } = req.body;
    //userCredential can be username or useremail

    const user = await User.findOne({
      $or: [{ userName: userCredential }, { userEmail: userCredential }],
      userPassword: sha256(userPassword + process.env.SALT),
    });

    if (!user) throw "Credentials doesn't match";

    res.json({
      message: "User logged in successfully",
      userId: user._id,
      userName: user.userName,
    });
  } catch (err) {
    res.status(400).send({ message: "Error occured " + err });
  }
};

exports.getProductItems = async (req, res) => {
  try {
    const productItems = await Product.aggregate([
      {
        $group: {
          _id: "$productType",
          productName: { $first: "$productName" },
          productType: { $first: "$productType" },
          productMetal: { $first: "$productMetal" },
          productPhoto: { $first: "$productPhoto" },
        },
      },
    ]);

    res.status(200).json(productItems);
  } catch (err) {
    res.status(400).send({ message: "Error occured " + err });
  }
};

exports.getProductByTypes = async (req, res) => {
  try {
    const productItems = await Product.aggregate([
      {
        $group: {
          _id: "$productType",
        },
      },
    ]);

    //Retrieve an array of all product types
    // const productTypes = await Product.distinct("productType");

    // Create an array of promises to retrieve all elements for each product type
    const promises = productItems.map(async (productType) => {
      const elements = await Product.find({ productType: productType._id });
      return { productType, elements };
    });

    // Wait for all promises to resolve using Promise.all()
    const resolvedPromises = await Promise.all(promises);

    res.send({ message: resolvedPromises });
  } catch (err) {
    res.status(400).send({ message: "Error occured " + err });
  }
};

exports.getProductItem = async (req, res) => {
  try {
    const search = req.params.search;
    const product = await Product.findOne({
      $or: [
        { productType: { $regex: new RegExp(search, "i") } },
        { productName: { $regex: new RegExp(search, "i") } },
      ],
    });
    if (product) res.status(200).send({ message: product.productType });
    else res.status(200).send({ message: "/" });
  } catch (err) {
    res.status(400).send({ message: "Error occured " + err });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOne({ _id: productId });
    res.status(200).send({ message: product });
  } catch (err) {
    res.status(400).send({ message: "Error occured " + err });
  }
};

/**
 * Cart Routes
 * 
 * 
router.get('/cartItems/:cartId',userController.cartItemsByID);
router.get('/cartItems/:cartId/:productId',userController.cartItemsByIdProductId);
router.post('/addToCart',userController.addToCart);
router.delete('/removeFromCart',userController,removeFromCart);
*
*/

exports.cartItemsByUserID = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartItems = await Cart.find({ userId: userId });
    res.status(200).send({ message: cartItems });
  } catch (err) {
    res.status(400).send({ message: "Error occured " + err });
  }
};

exports.cartItemByUserIdProductId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const cartItem = await Cart.find({ userId: userId, productId: productId });

    res.status(200).send({ message: cartItem });
  } catch (err) {
    res.status(400).send({ message: "Error occured " + err });
  }
};

exports.addToCart = async (req, res) => {
  try {
    //need many things to add -> productId, userId
    const userId = req.body.userId;
    const productId = req.body.productId;

    const cartItem = new Cart({
      userId: userId,
      productId: productId,
    });

    await cartItem.save();
    res.status(200).send({ message: "Added!!" });
  } catch (err) {
    res.status(400).send({ message: "Error occured " + err });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const productId = req.body.productId;

    const delCartItem = await Cart.deleteOne({
      userId: userId,
      productId: productId,
    });

    res.status(200).send({ message: "Removed!!" });
  } catch (err) {
    res.status(400).send({ message: "Error occured " + err });
  }
};

exports.order = async (req, res) => {
  try {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const orderQuantity = req.body.orderQuantity;
    const price = req.body.price;

    //remove from cart
    const delCartItem = await Cart.deleteOne({
      userId: userId,
      productId: productId,
    });

    //decrase quantity
    const updateQuantity = await Product.updateOne(
      { _id: productId },
      { $inc: { productQuantity: -orderQuantity } }
    );

    //create new order
    const order = new Order({
      productId: productId,
      userId: userId,
      orderDate: new Date(),
      orderPrice: price,
      orderQuantity: orderQuantity,
      status: false,
    });

    await order.save();

    res.status(200).send({ message: "Successfull!!" });
  } catch (err) {
    res.status(400).send({ message: "Error occured " + err });
  }
};

exports.orderedItemsOfUser = async (req, res) => {
  try {
    const userId=req.params.userId;
    //get Pending order
    const porders=await Order.find({userId:userId,status:false});

    let pendingOrders=[];
    for await(const item of porders){
      const productId=item.productId;  
      const productName=await Product.findOne({_id:productId},'productName');
      pendingOrders.push([item,productName]);
    }
    //get Delivered order

    let deliveredItems=[];
    const dItems=await Order.find({userId:userId,status:true});
    for await(const item of dItems){
      const productId=item.productId;  
      const productName=await Product.findOne({_id:productId},'productName');
      deliveredItems.push([item,productName]);
    }
    
    res.status(200).send({pending:pendingOrders,delivered:deliveredItems});

  } catch (err) {
    res.status(400).send({ message: "Error occured " + err });
  }
};
