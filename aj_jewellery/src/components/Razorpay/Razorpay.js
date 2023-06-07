import makeToast from "../../Toaster/Toaster";
import Logo from "../../images/logo.png";

const afterPaymentUtilities= async(productId,quantity,price,navigate)=>{
    
    //remove from cartItems
    //in buyer cartPage, it should be removed and if product quantity is zero now please remove it
    
    const response = await fetch(process.env.REACT_APP_BACKEND_URL+"user/order", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            userId:localStorage.getItem("userId"),
            productId:productId,
            orderQuantity:quantity,
            price:price
        })
    });
    
    const json = await response.json();
    navigate('/orders');
}
function Razorpay(product,price,quantity,navigate) {

    // afterPaymentUtilities(product._id,quantity,price,navigate);//comment it also
    var options = {
        "key": "rzp_test_3IJsPomtxUdrvT",
        "amount": (1*100), //(price*100)
        "currency":"INR",
        "name": "AJ_jewellers",
        "description": "Thank you for purchasing with AJ_jewellers",
        "image": {Logo},
        
        "handler": function (response){
            
            //remove from cart item, decrease (update number of items)
            //add it in the order page
            //add - razropay payment id also
            afterPaymentUtilities(product._id,quantity,price,navigate);
            makeToast("success","Order Placed Successfully");
        },
        "prefill": {
            "name": localStorage.getItem("user")
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp = new window.Razorpay(options);
    rzp.open();
};
           
export default Razorpay;