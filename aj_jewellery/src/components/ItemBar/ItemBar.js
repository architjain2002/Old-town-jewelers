import React from 'react';
import SwiperJs from '../Swiper/SwiperJs';
import './ItemBar.css';
function ItemBar({title}) {
  return (
    <div className='itemBar'>
        <div className='swipers'>
            <h4>{title}</h4>
            <SwiperJs/>
        </div>
    </div>
  )
}

export default ItemBar;
