const express = require("express");
const router = express.Router();
const userController=require("../controller/user");



router.post('/signup',userController.signUp);
router.post('/signin',userController.signIn);
router.get('/getProductItems',userController.getProductItems);
router.get('/getProductByTypes',userController.getProductByTypes);
router.get('/getProductItem/:search',userController.getProductItem);
router.get('/getProductById/:productId',userController.getProductById);

//cart routes
router.get('/cartItems/:userId',userController.cartItemsByUserID);
router.get('/cartItems/:userId/:productId',userController.cartItemByUserIdProductId);
router.post('/addToCart',userController.addToCart);
router.post('/order',userController.order);
router.delete('/removeFromCart',userController.removeFromCart);


//order routes
router.get('/order/:userId',userController.orderedItemsOfUser);


/*
updateProfile
myProfile
 */

module.exports=router;