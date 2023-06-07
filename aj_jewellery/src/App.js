import { useEffect } from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from "./pages/CartPage/CartPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import Authentication from "./pages/AuthenticationPage/Authentication";
import OrderPage from "./pages/OrderPage/OrderPage";
import AdminOrderPage from "./pages/AdminOrderPage/AdminOrderPage";
import ChatBot from "./components/ChatBot/ChatBot";
import { io } from "socket.io-client";

function App() {
  const socket = io(process.env.REACT_APP_BACKEND_URL);
  useEffect(() => {
    // localStorage.setItem("user", "");
    // localStorage.setItem("userId", "");
    localStorage.setItem("Gold", 1000);
    localStorage.setItem("Silver", 100);
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

    return () => {
      localStorage.setItem("user", "");
      localStorage.setItem("userId", "");
      localStorage.setItem("Gold", 1000);
      localStorage.setItem("Silver", 100);
    };
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
