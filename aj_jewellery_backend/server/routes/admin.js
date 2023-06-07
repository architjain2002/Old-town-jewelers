const express = require("express");
const router = express.Router();
const adminController=require("../controller/admin");

router.get('/getOrders',adminController.getOrders);
router.post('/addProduct',adminController.addProduct);
router.put('/updateProduct',adminController.updateProduct);
router.put('/deliverProduct',adminController.deliverProduct);

module.exports=router;