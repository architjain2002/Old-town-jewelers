import React, { useState } from "react";

// styling
import "./Authentication.css";

// components
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";

const Authentication = () => {
  const [welcome, setWelcome] = useState(false);

  const utility=()=>{
    setWelcome(!welcome);
  }
  const setBannerClass = () => {
    const classArr = ["banner-side cfb"];
    if (welcome) classArr.push("send-right");
    return classArr.join(" ");
  };

  const setFormClass = () => {
    const classArr = ["form-side cfb"];
    if (welcome) classArr.push("send-left");
    return classArr.join(" ");
  };

  return (
    <div className="authentication cfb">
      <div className={setBannerClass()}>
        {welcome ? <h2>Hello, New Friend!</h2> : <h2>Welcome Back</h2>}

        <button onClick={() =>{setWelcome(!welcome)}}>
          {welcome ? "Sign In" : "Create Account"}
        </button>
      </div>

      <div className={setFormClass()}>
        {welcome ? <SignUp utility={()=>utility()}/> : <SignIn />}
      </div>
    </div>
  );
};

export default Authentication;
