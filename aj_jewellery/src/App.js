import { useEffect } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartPage from "./pages/CartPage/CartPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import Authentication from "./pages/AuthenticationPage/Authentication";
import OrderPage from "./pages/OrderPage/OrderPage";
import AdminOrderPage from "./pages/AdminOrderPage/AdminOrderPage";
import { io } from "socket.io-client";

function App() {
  const socket = io(process.env.REACT_APP_BACKEND_URL);

  const price_utility = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + "prices");
    const json = await response.json();

    localStorage.setItem("Gold", parseFloat(json[0].Gold) / 10);
    localStorage.setItem("Silver", parseFloat(json[1].Silver) / 1000);
  };
  useEffect(() => {
    price_utility();

    if (window.location.pathname !== "/") window.location.pathname = "/";

    socket.on("connect", () => {
      console.log("connected");
      // const user =
      //   localStorage.getItem("user") != ""
      //     ? localStorage.getItem("user")
      //     : "Guest";

      // const newChat = `Hello ${user}, let's start your golden journey!`;
      // const date=new Date();
      // const showTime = date.toLocaleTimeString();
      // // date.getHours()+ ':' + date.getMinutes()

      // setChats([...chats, {"id":1,"time":showTime,"chat":newChat}]);
      // console.log(chats);
    });

    // clean up code to erase local storage
    // return () => {
    //   localStorage.setItem("user", "");
    //   localStorage.setItem("userId", "");
    //   localStorage.setItem("Gold", "");
    //   localStorage.setItem("Silver", "");
    // };
    // eslint-disable-next-line
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage socket={socket} />,
    },
    {
      path: "/signin",
      element: <Authentication />,
    },
    {
      path: "/products",
      element: <ProductPage socket={socket} />,
    },
    {
      path: "/cart",
      element: <CartPage socket={socket} />,
    },
    {
      path: "/orders",
      element: <OrderPage socket={socket} />,
      // element:<OrderPage/>
    },
    {
      path: "/admin/orders",
      element: <AdminOrderPage socket={socket} />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
