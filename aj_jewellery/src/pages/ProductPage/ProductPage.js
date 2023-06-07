import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import ItemBar from "../../components/ItemBar/ItemBar";
import './ProductPage.css';
import TypeBar from "../../components/TypeBar/TypeBar";
import Footer from "../../components/Footer/Footer";
import Product from "../../components/Product/Product";
import UpdateModal from "../../components/UpdateModal/UpdateModal";

function ProductPage({socket}) {

  const [myProducts,setMyProducts]=useState([]);
  const [onUpdate,setOnUpdate]=useState(false);
  const user=localStorage.getItem("user");
  const [modal,setModal]=useState(null);
  const getUser= async()=>{

    const response=await fetch(process.env.REACT_APP_BACKEND_URL+'user/getProductByTypes');

    const json=await response.json();

    setMyProducts(json.message);
  }

  const openProduct=(product)=>{
    setModal(product);
  }
  const closeProduct=()=>{
    setModal(null);
  }
  useEffect(() => {
    getUser();
  }, [onUpdate]);

  return (
    <div className="productPage">
      {user!=="Admin_Ar"&&modal&&<Product card={modal} closeProduct={closeProduct}/>}
      {user==="Admin_Ar"&&modal&&<UpdateModal card={modal} closeProduct={closeProduct} onUpdateUtility={()=>setOnUpdate(!onUpdate)}/>}
      <Navbar onCreate={()=>setOnUpdate(!onUpdate)}/>
      <SearchBar/>
      <ItemBar title={'Product Types'}/>
      {myProducts&&myProducts.map((products,i)=>
         <TypeBar key={i} type={products.productType._id} products={products.elements} openProduct={openProduct}/>
      )}
      <Footer socket={socket}/>
    </div>
  );
}

export default ProductPage;
