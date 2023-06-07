import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import makeToast from "../../Toaster/Toaster";
import Navbar from "../../components/Navbar/Navbar";
import CartItem from "../../components/CartItem/CartItem";
import Footer from "../../components/Footer/Footer.js";
import "./CartPage.css";

function CartPage({socket}) {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState();
  const [flag, setFlag] = useState(0);

  const cartItemsOfUser = async () => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + `user/cartItems/${userId}`
    );

    const json = await response.json();

    const cartItems = json.message;

    setCart(cartItems);
  };
  useEffect(() => {
    if (userId === "") {
      makeToast("warning", "Please SignIn!!");
      navigate("/signin");
      return;
    }
    cartItemsOfUser();
  }, [flag]);

  return (
    <div className="cartPage">
      <Navbar />
      {console.log(cart)}
      {cart && cart.length? (
        cart.map((cartItem, i) => (
          <CartItem
            key={cartItem._id}
            cartItem={cartItem}
            toggleFlag={() => setFlag(!flag)}
          />
        ))
      ) : (
        <div className="empty">
          <h1>Your Cart is Empty!</h1>
        </div>
      )}
      <Footer  socket={socket}/>
    </div>
  );
}

export default CartPage;
