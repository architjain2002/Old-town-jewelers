import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import Navbar from "../../components/Navbar/Navbar";
import Girl from "../../images/girl.jpg";
import About from "../../images/about.jpg";
import Button from "../../components/Button/Button";
import Swiper from "../../components/Swiper/SwiperJs";
import AnchorLink from "react-anchor-link-smooth-scroll";
import Footer from "../../components/Footer/Footer";
import CalculatorModal from "../../components/Calculator/CalculatorModal";
import Indicator from "../../components/Indicator/Indicator";
function LandingPage({socket}) { 
  const [calculator,setCalculator]= useState(false);
  const [indicater,setIndicator]=useState(false);
  const [change,setChange]=useState();

  const changeUtility= async()=>{
    const response=await fetch(process.env.REACT_APP_API_URL+'priceChange');
    const json=await response.json();
    setChange(json);
  }

  useEffect(()=>{
    changeUtility();
  },[])

  useEffect(()=>{
  },[calculator])

  return (
    <div className="landingPage">
      <Navbar />
      {calculator&&<CalculatorModal closeCal={()=>setCalculator(false)}/>}
      {indicater&&<Indicator closeIndicator={()=>setIndicator(false)}/>}
      <div className="mainContent">
        <div className="left">
          <h1>Happiness Comes in the box of jewellery</h1>
          <AnchorLink href="#explore" style={{ textDecoration: "none" }}>
            <Button value={"Explore"} />
          </AnchorLink>
        </div>
        <div className="right">
          <img src={Girl} alt={"Girl"} />
        </div>
      </div>

      <div id="explore">
        <Swiper />
      </div>

      <div className="mainContent">
        <div className="right right1">
          <img src={About} alt={"About"} />
        </div>
        <div className="left left1">
          <p>
            We are a family-owned business that has been serving our community
            for over 20 years. We take pride in providing high-quality jewelry
            and excellent customer service to all of our customers. Our jewelry
            collection includes a wide variety of styles and designs, from
            classic and elegant pieces to trendy and modern styles.
          </p>
        </div>
      </div>

      <div className="priceSection">
        <h1>Exclusive Metal Rates</h1>
        <table className="rateTable">
          <thead>
            <tr>
              <th>Metal</th>
              <th>Rate</th>
              <th>Daily Change</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gold (per 10g)</td>
              <td>Rs. {localStorage.getItem("Gold")*10}</td>
              {change&&<td>Rs. {change[0].Gold}</td>}
            </tr>
            <tr>
              <td>Silver (per Kg)</td>
              <td>Rs. {localStorage.getItem("Silver")*1000}</td>
              {change&&<td>Rs. {change[1].Silver}</td>}
            </tr>
          </tbody>
        </table>

        <div className="buttonsPriceSection">
          <Button value={"Indicator"} utility={()=>setIndicator(true)}/>
          <Button value={"Calculate"} utility={()=>setCalculator(true)}/>
        </div>
      </div>
      <Footer socket={socket}/>
    </div>
  );
}

export default LandingPage;
