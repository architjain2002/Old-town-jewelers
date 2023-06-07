import React from 'react';
import './SearchBar.css';


function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }
}

function SearchBar() {

  const searchProduct =async (event)=>{
    if(event!=null&&(event.key==="Enter"||event.type==="click")){
      const product=document.getElementById("productData");
      const response=await fetch(process.env.REACT_APP_BACKEND_URL+`user/getProductItem/${product.value}`);
      const json=await response.json();
      scrollToElement(json.message);
      product.value="";
    }
  }
  return (
    <div className='searchBar'>
        <input type={"text"} placeholder={"Search Products"} id="productData"  onKeyDown={(event)=>searchProduct(event)} />
        <i className="fa-solid fa-magnifying-glass fa-2x"  onClick={(event)=>searchProduct(event)}/>
    </div>

  )
}

export default SearchBar