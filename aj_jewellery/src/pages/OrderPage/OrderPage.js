import React, { useEffect, useState } from "react";
import makeToast from "../../Toaster/Toaster";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./OrderPage.css";

function OrderPage({socket}) {
  const userId = localStorage.getItem("userId");
  const [pending, setPending] = useState();
  const [delivered, setDelivered] = useState();
  const navigate = useNavigate();

  const getPrettyDate = (mDate) => {
    const mongooseDate = new Date(mDate);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const formattedDate = mongooseDate.toLocaleString("en-IN", options);
    return formattedDate;
  };

  const getPrettyTime=(mDate)=>{
    const givenTime = new Date(mDate);
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    const formattedTime = givenTime.toLocaleTimeString([], options);
    return formattedTime;

  }

  const getOrders = async () => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + `user/order/${userId}`
    );

    const json = await response.json();
    setPending(json.pending);
    setDelivered(json.delivered);
  };

  
  useEffect(() => {
    if (userId === "") {
      makeToast("warning", "Please SignIn!!");
      navigate("/signin");
      return;
    }

    getOrders();
  }, []);
  return (
    <div>
      <div className="orderPage">
        <Navbar />
          <div className="container">
            <h1>Pending Orders</h1>
            <table>
              <thead>
                <tr>
                  <th>S. No</th>
                  <th>Product</th>
                  <th>Order-Id</th>
                  <th>Ordered Date</th>
                  <th>Ordered Quantity</th>
                  <th>Total Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pending &&
                  pending.map((item, i) => (
                    <tr>
                      <td>{i+1}</td>
                      <td>{item[1].productName}</td>
                      <td>{item[0]._id}</td>
                      <td>{getPrettyTime(item[0].orderDate)+" ,"+getPrettyDate(item[0].orderDate)}</td>
                      <td>{item[0].orderQuantity}</td>
                      <td>{item[0].orderPrice}</td>
                      <td className="red"><i className="fa-solid fa-hourglass"/></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        

        <hr style={{ height: '5px', backgroundColor: 'black' }} />

     
          <div className="container">
            <h1>Delivered Items</h1>
            <table>
              <thead>
                <tr>
                <th>S. No</th>
                  <th>Product</th>
                  <th>Order-Id</th>
                  <th>Ordered Date</th>
                  <th>Ordered Quantity</th>
                  <th>Total Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {delivered &&
                  delivered.map((item, i) => (
                    <tr>
                      <td>{i+1}</td>
                      <td>{item[1].productName}</td>
                      <td>{item[0]._id}</td>
                      <td>{getPrettyTime(item[0].orderDate)+" ,"+getPrettyDate(item[0].orderDate)}</td>
                      <td>{item[0].orderQuantity}</td>
                      <td>{item[0].orderPrice}</td>
                      <td className="green"><i className="fa-solid fa-check-double"/></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
      </div>
      <Footer socket={socket}/>
    </div>
  );
}

export default OrderPage;
