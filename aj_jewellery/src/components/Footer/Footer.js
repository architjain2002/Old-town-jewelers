import React from 'react'
import { useRef,useState } from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';
import makeToast from '../../Toaster/Toaster';
import ChatBot from '../ChatBot/ChatBot';
function Footer({socket}) {
  const [chatBot,setChatBot]=useState(false);
  const navigate=useNavigate();
  const textRef = useRef(null);

  const copyToClipboard = () => {
    if (textRef.current) {
      const range = document.createRange();
      range.selectNode(textRef.current);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
      makeToast("info","Copied to Clipboard!!")
    }
  };

  return (
    <div className="footer">
        {chatBot&&<ChatBot closeProduct={()=>setChatBot(!chatBot)} socket={socket}/>}
        <table className="footerTable">
          <thead>
            <tr>
              <th>AJ Jewellery</th>
              <th>Products</th>
              <th>Useful Links</th>
              <th>Contacts</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>"Jewelry is a symbol</td>
              <td>Jhumkas</td>
              <td>Profie Page</td>
              <td>
                <i className="fa-solid fa-house" />
                <span className="footerResponsive">
                  {" "}
                  &nbsp;Your Address buddy
                </span>
              </td>
               <td rowSpan="5"><i class="fa-3x fa-solid fa-comment-dots" width="100px" height="100px" onClick={()=>setChatBot(!chatBot)}/></td>
            </tr>
            <tr>
              <td>of love, a timeless</td>
              <td>Rings</td>
              <td onClick={()=>navigate('/cart')}>Cart Page</td>
              <td>
              <a href="mailto:gaurangrastogi209@gmail.com" style={{color:"grey",textDecoration:"none"}}>
                <i className="fa-solid fa-envelope" />
                <span className="footerResponsive">
                  &nbsp;gaurangrastogi209
                </span>
                </a>
              </td>
            </tr>
            <tr>
              <td>gift that can be passed</td>
              <td>Chains</td>
              <td onClick={()=>navigate('/products')}>Product Page</td>
              <td>
                <i className="fa-solid fa-phone" />
                <span className="footerResponsive" onClick={copyToClipboard} ref={textRef} id="number"> &nbsp;+91 6393056856</span>
              </td>
            </tr>
            <tr>
              <td>down through generations."</td>
              <td style={{ textDecoration: "underline" }} onClick={()=>navigate('/products')}>See More</td>
              <td onClick={()=>navigate('/')}>HomePage</td>
              <td>
                <a href="https://github.com/gaurangrastogi" target="_blank" rel="noopener noreferrer" style={{color:"grey",textDecoration:"none"}}>
                <i className="fa-brands fa-github" />
                <span className="footerResponsive">&nbsp;gaurangrastogi</span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  )
}

export default Footer