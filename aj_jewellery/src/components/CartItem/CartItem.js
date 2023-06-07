import React, { useEffect, useState } from "react";
import "./CartItem.css";
import { TextField } from "@mui/material";
import Button from "../Button/Button";
import makeToast from "../../Toaster/Toaster";
import AlertDialog from "../AlertDialog/AlertDialog.js";
function CartItem({ cartItem, toggleFlag }) {
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [order, setOrder] = useState(false);

  const getProductDetail = async () => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        `user/getProductById/${cartItem.productId}`
    );

    const json = await response.json();
    console.log(product);
    setProduct(json.message);
  };

  const removeFromCart = async () => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "user/removeFromCart",
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          productId: product._id,
        }),
      }
    );

    const json = await response.json();
    // getProductDetail();
    toggleFlag();
    makeToast("warning", "Removed from Cart");
  };
  const changePrice = () => {
    const quantity = document.getElementById(`quantity` + product.productName);
    setQuantity(quantity.value);
  };

  const placeOrder = () => {
    setOrder(true);
  };
  useEffect(() => {
    getProductDetail();
  }, [cartItem]);

  useEffect(() => {
    return;
  }, [product, quantity]);

  return product ? (
    <div className="cart">
      {order && (
        <AlertDialog
          product={product}
          price={
            product.productWeight *
            localStorage.getItem(product.productMetal) *
            quantity
          }
          close={() => setOrder(false)}
          quantity={quantity}
        />
      )}
      <div className="left">
        <img src={product.productPhoto} alt={"Product"} />
      </div>
      <div className="right">
        <h1>{product.productName}</h1>
        <h2>{product.productType}</h2>

        <div className="features">
          <TextField
            variant="standard"
            size="medium"
            label="Quantity"
            color="primary"
            type="number"
            defaultValue="1"
            inputProps={{ min: 1, max: product.productQuantity }}
            onKeyDown={(e) => e.preventDefault()}
            onChange={() => changePrice()}
            sx={{
              mb: 3,
              textAlign: "center",
              width: 0.4,
              "& .MuiInputLabel-root": {
                fontSize: "2rem",
                fontWeight: "bolder",
              },
              "& .MuiInputBase-root": {
                fontSize: "1.5rem",
                paddingTop: "10px",
                paddingBottom: "10px",
              },
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                {
                  height: "50px",
                  width: "50px",
                },
              caretColor: "transparent",
            }}
            id={`quantity` + product.productName}
          />

          <TextField
            variant="standard"
            size="medium"
            label="Weight(g)"
            color="primary"
            type="text"
            value={product.productWeight}
            onKeyDown={(e) => e.preventDefault()}
            sx={{
              mb: 3,
              textAlign: "center",
              width: 0.4,
              "& .MuiInputLabel-root": {
                fontSize: "2rem",
                fontWeight: "bolder",
              },
              "& .MuiInputBase-root": {
                fontSize: "1.5rem",
                paddingTop: "10px",
                paddingBottom: "10px",
              },
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                {
                  height: "50px",
                  width: "50px",
                },
              caretColor: "transparent",
            }}
            id="weight"
          />
        </div>
        <div className="pricing">
          <TextField
            variant="standard"
            size="medium"
            label={product.productMetal + " Rate"}
            color="primary"
            type="text"
            onKeyDown={(e) => e.preventDefault()}
            value={localStorage.getItem("Gold")}
            sx={{
              mb: 3,
              textAlign: "center",
              width: 0.3,
              "& .MuiInputLabel-root": {
                fontSize: "1.2rem",
                fontWeight: "bolder",
              },
              "& .MuiInputBase-root": {
                fontSize: "1rem",
                paddingTop: "10px",
                paddingBottom: "10px",
              },
              caretColor: "transparent",
            }}
            id="productMeal"
          />
          <TextField
            variant="standard"
            size="medium"
            label="Price"
            color="primary"
            type="text"
            value={
              product.productWeight *
              localStorage.getItem(product.productMetal) *
              quantity
            }
            onKeyDown={(e) => e.preventDefault()}
            sx={{
              mb: 3,
              textAlign: "center",
              width: 0.3,
              "& .MuiInputLabel-root": {
                fontSize: "1.2rem",
                fontWeight: "bolder",
              },
              "& .MuiInputBase-root": {
                fontSize: "1rem",
                paddingTop: "10px",
                paddingBottom: "10px",
              },
              caretColor: "transparent",
            }}
            id="price"
          />
        </div>

        <div className="buttons">
          <Button value={"Remove from Cart"} utility={removeFromCart} />
          {product.productQuantity ? (
            <Button value={"Order"} utility={placeOrder} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default CartItem;
