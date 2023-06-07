import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import makeToast from "../../Toaster/Toaster.js";
import { sha256 } from "js-sha256";
import "../../pages/AuthenticationPage/Authentication.css";

const SignIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("user", "");
    localStorage.setItem("userId", "");
  }, []);
  const goHome = () => {
    navigate("/");
  };

  const signIn = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    // console.log(email.value,password.value,sha256(password.value + process.env.REACT_APP_SALT))
    // console.log(process.env.REACT_APP_ADMIN,process.env.REACT_APP_PASSWORD);
    if (
      email.value === process.env.REACT_APP_ADMIN &&
      sha256(password.value + process.env.REACT_APP_SALT) ===
        process.env.REACT_APP_PASSWORD
    ) {
      navigate("/");
      makeToast("success", "Welcome Sir!!");
      localStorage.setItem("user", "Admin_Ar");
      return;
    } else {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "user/signin",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            userCredential: email.value,
            userPassword: password.value,
          }),
        }
      );

      const json = await response.json();
      if (json.message === "User logged in successfully") {
        localStorage.setItem("user", json.userName);
        localStorage.setItem("userId", json.userId);
        navigate("/");
        makeToast("success", `Welcome ${localStorage.getItem("user")}`);
      } else {
        makeToast("warning", json.message);
        email.value = "";
        password.value = "";
      }
    }
  };
  return (
    <div className="form-comp cfb">
      <h1>Sign In!</h1>
      <form className="sign-up-form cfb">
        <label>
          Email:
          <br />
          <input type="text" id="email" placeholder="name@gmail.com" />
        </label>
        <label>
          Password:
          <br />
          <input type="password" id="password" placeholder="pass@123" />
        </label>
        <br />
        <button onClick={signIn}>Sign In!</button>
      </form>
      <div className="goHome" onClick={() => goHome()}>
        <i className="fa-solid fa-xmark fa-2x"></i>
      </div>
    </div>
  );
};

export default SignIn;
