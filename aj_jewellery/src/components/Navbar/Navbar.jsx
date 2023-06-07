import React, { useEffect } from "react";
import "./Navbar.css";
import Logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MenuListComposition from "../MenuItem/MenuItem";
import makeToast from "../../Toaster/Toaster";
import CreateModal from "../CreateModal/CreateModal";

function Navbar({onCreate}) {
  const [hamburger, setHamburger] = useState(true);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [modal,setModal] = useState(false);
  const navigate = useNavigate();

  const goHomePage = () => {
    navigate("/");
  };
  const goSignIn = () => {
    navigate("/signin");
  };

  const goProductPage = () => {
    navigate("/products");
  };

  const goToCartPage = () => {
    navigate("/cart");
  };

  const goToOrderPage = () => {
    navigate("/orders");
  };

  const logOut = () => {
    // setUserId(localStorage.getItem("userId"));
    setUserId("");
    setUser("");
  };

  const goToAdminOrderPage = () => {
    navigate("/admin/orders");
  };

  const openModalForCreateProduct = () => {
    setModal(true);
  };
  const closeCreateProductModal=()=>{
    setModal(false);
    //update product page, if already in product page
  }
  useEffect(() => {
    // just to update navbar, if logged out
  }, [userId]);

  return (
    <div className="navbar">
      {modal&&<CreateModal closeProduct={closeCreateProductModal} onCreate={onCreate}/>}
      <div className="logo">
        <img src={Logo} alt={"Logo"} />
        <p id="cursive">AJ Jewellers</p>
      </div>
      <div className="links">
        <span onClick={() => goHomePage()}>Home</span>
        <span onClick={() => goProductPage()}>Product</span>
        {userId && <span onClick={() => goToCartPage()}>Cart</span>}
        {userId && <span onClick={() => goToOrderPage()}>Orders</span>}
        {user === "Admin_Ar" && (
          <span
            onClick={() => {
              goToAdminOrderPage();
            }}
          >
            Orders
          </span>
        )}
        {user === "Admin_Ar" && (
          <span
            onClick={() => {
              openModalForCreateProduct();
            }}
          >
            <i className="fa-solid fa-cart-plus" />
          </span>
        )}
        {!user||user === "" ? (
          <span onClick={() => goSignIn()}>SignIn</span>
        ) : (
          //on click open the profile page and there only have the option to log out
          <MenuListComposition
            logOut={() => logOut()}
            goToCartPage={() => goToCartPage()}
            goToOrderPage={() => goToOrderPage()}
          />
        )}
      </div>

      <div id="hamburger">
        {hamburger ? (
          <i
            className="fa-solid fa-bars fa-2xl"
            onClick={() => setHamburger(false)}
          />
        ) : (
          <div className="hamburgerLinks">
            <i
              className="fa-solid fa-xmark fa-2xl"
              onClick={() => setHamburger(true)}
              style={{ marginLeft: "30px" }}
            />
            {console.log(user)}
            <p onClick={() => goHomePage()}>Home</p>
            <p onClick={() => goProductPage()}>Product</p>
            {userId && <p onClick={() => goToCartPage()}>Cart</p>}
            {userId && <p onClick={() => goToOrderPage()}>Orders</p>}
            {user === "Admin_Ar" && (
              <p onClick={() => goToAdminOrderPage()}>Orders</p>
            )}
            {user === "Admin_Ar" && (
              <p
                onClick={() => {
                  openModalForCreateProduct();
                }}
              >
                <i className="fa-solid fa-cart-plus" />
              </p>
            )}

            {!user||user === "" ? (
              <p onClick={() => goSignIn()}>SignIn</p>
            ) : (
              <MenuListComposition logOut={() => logOut()} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
