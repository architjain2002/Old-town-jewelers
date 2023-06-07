import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import "./Card.css";
import { useNavigate } from "react-router-dom";

function Card({ card, buttonVal,openProduct}) {
  const navigate=useNavigate();
  const link = "#" + card.productType;
  return (
    <div className="cardComponent">
      <div className="card">
        <img src={card.productPhoto} alt="Products" />
        <div className="card__details">
          <span className="tag">{card.productType}</span>
          <span className="tag">{card.productMetal}</span>
          <div className="name">{card.productName}</div>
          {/* navigate to productPage/#productId */}
          {buttonVal==="See More"?
          <AnchorLink href={link} style={{ textDecoration: "none" }}>
            <button id="card_details_button" onClick={()=>navigate('/products')}>{buttonVal}</button>
          </AnchorLink>
          :<button id="card_details_button" onClick={()=>openProduct(card)}>{buttonVal}</button>}
        </div>
      </div>
    </div>
  );
}

export default Card;
