import React, { useEffect, useState } from "react";
import makeToast from "../../Toaster/Toaster";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./AdminOrderPage.css";

function AdminOrderPage({socket}) {

  const user=localStorage.getItem("user");
  const [pending, setPending] = useState();
  const [delivered, setDelivered] = useState();
  const [flag,setFlag]=useState(false);
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
      process.env.REACT_APP_BACKEND_URL + 'admin/getOrders'
    );

    const json = await response.json();
    setPending(json.pending);
    setDelivered(json.delivered);
  };

  const deliverOrder=async(orderId)=>{
    const response = await fetch(process.env.REACT_APP_BACKEND_URL+"admin/deliverProduct", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
          orderId:orderId
      }),
    });
    const json=await response.json();
    setFlag(!flag)
    makeToast("success","Selected Item is delivered");
  }
  useEffect(() => {
    if (user!=="Admin_Ar") {
      makeToast("warning", "Please SignIn!!");
      navigate("/signin");
      return;
    }

    getOrders();
  }, [flag]);
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
                  <th>Order-Id</th>
                  <th>Customer Name</th>
                  <th>Product</th>
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
                      <td>{item[0]._id}</td>
                      <td>{item[2].userName}</td>
                      <td>{item[1].productName}</td>
                      <td>{getPrettyTime(item[0].orderDate)+" ,"+getPrettyDate(item[0].orderDate)}</td>
                      <td>{item[0].orderQuantity}</td>
                      <td>{item[0].orderPrice}</td>
                      <td className="red pointer" onClick={()=>deliverOrder(item[0]._id)}><i className="fa-solid fa-hourglass"/></td>
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
                  <th>Order-Id</th>
                  <th>Customer Name</th>
                  <th>Product</th>
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
                      <td>{item[0]._id}</td>
                      <td>{item[2].userName}</td>
                      <td>{item[1].productName}</td>
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


export default AdminOrderPage