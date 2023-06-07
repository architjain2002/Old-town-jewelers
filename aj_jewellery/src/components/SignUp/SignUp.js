import React from 'react';
import '../../pages/AuthenticationPage/Authentication.css';
import makeToast from '../../Toaster/Toaster';

const SignUp = ({utility}) => {

  const signUp=async (e)=>{
    e.preventDefault();
    const name=document.getElementById("name");
    const email=document.getElementById("email");
    const number=document.getElementById("number");
    const password=document.getElementById("password");
    const response = await fetch(process.env.REACT_APP_BACKEND_URL+"user/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userName:name.value,
        userEmail:email.value,
        userMobile:number.value,
        userPassword: password.value
      }),
    });

    const json = await response.json();
    makeToast(json.type,json.message);
    
    if(json.type==="success")
      utility();
      
    name.value="";
    email.value="";
    number.value="";
    password.value="";

   
  }
  return (
    <div className="form-comp cfb">
      <h1>Create an Account!</h1>
      <form className="sign-up-form cfb">
        <label>
          Name:
          <br/>
          <input type='text' placeholder='John Doe' id="name"/>
        </label>
        <label>
          Email:
          <br/>
          <input type='text' placeholder='name@gmail.com' id="email"/>
        </label>
        <label>
          Mobile Number:
          <br/>
          <input type='number' placeholder='123456789' id="number"/>
        </label>
        <label>
          Password:
          <br/>
          <input type='password' placeholder='pass@123' id="password"/>
        </label>
        <br/>
        <button onClick={(event)=>signUp(event)}>
          Sign Up!
        </button>
      </form>
    </div>
  );
}

export default SignUp;
