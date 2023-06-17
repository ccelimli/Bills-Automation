import React, { useState } from 'react';
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { IoHome, IoSchool } from 'react-icons/io5';
import { BsCreditCardFill } from 'react-icons/bs';
import { FaHandHoldingHeart } from "react-icons/fa";
import { FaDog } from "react-icons/fa"; 

const Sidenav = ({ color }) => {
  const [current, setCurrent] = useState('1');
  const { pathname } = useLocation()

  const getItem = (label, key) => {
    return {
      label,
      key
    }
  }

  const items = [
    getItem(
      (
        <NavLink 
          to="/"
          style={{
            backgroundColor: pathname === '/' ? '#ffe9a3' : ''
          }}
        >
          <span 
            className="label"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
            <IoHome  
              style={{
                fontSize: 27,
                backgroundColor: pathname === '/' ? '#ffc300' : "",
                padding: 5,
                margin: 5,
                borderRadius: 5
              }}
            /> 
            Anasayfa
          </span>
        </NavLink>  
      ),
      '1'
    ),
    getItem(
      (
        <NavLink 
          to="/bills"
          style={{
            backgroundColor: pathname === '/bills' ? '#9aff9a' : '',
          }}
        >
          <span 
            className="label"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
            <BsCreditCardFill  
              style={{
                fontSize: 27,
                backgroundColor: pathname === '/bills' ? '#548b54' : "",
                padding: 5,
                margin: 5,
                borderRadius: 5
              }}
            /> 
            Fatura Yardımı
          </span>
        </NavLink>  
      ),
      '2'
    ),
    getItem(
      (
        <NavLink 
          to="/donation"
          style={{
            backgroundColor: pathname === '/donation' ? '#a1acba' : '',
          }}
        >
          <span 
            className="label"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
            <FaHandHoldingHeart  
              style={{
                fontSize: 27,
                backgroundColor: pathname === '/donation' ? '#616670' : "",
                padding: 5,
                margin: 5,
                borderRadius: 5
              }}
            /> 
            Bağış
          </span>
        </NavLink>  
      ),
      '3'
    ),
    getItem(
      (
        <NavLink 
          to="/educationSupport"
          style={{
            backgroundColor: pathname === '/educationSupport' ? '#ff7a66' : '',
          }}
        >
          <span 
            className="label"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
            <IoSchool  
              style={{
                fontSize: 27,
                backgroundColor: pathname === '/educationSupport' ? '#c63d25' : "",
                padding: 5,
                margin: 5,
                borderRadius: 5
              }}
            /> 
            Eğitim Destek
          </span>
        </NavLink>
      ),
      '4'
    ),
    getItem(
      (
        <NavLink 
          to="/petFoodSupport"
          style={{
            backgroundColor: pathname === '/petFoodSupport' ? '#a097d5' : '',
          }}
        >
          <span 
            className="label"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
            <FaDog  
              style={{
                fontSize: 27,
                backgroundColor: pathname === '/petFoodSupport' ? '#605f87' : "",
                padding: 5,
                margin: 5,
                borderRadius: 5
              }}
            /> 
            Mama Destek
          </span>
        </NavLink>  
      ),
      '5'
    )
  ]

  const handleOnClick = (item) => {
    setCurrent(item.key)
  }

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>Umuduğun Işığında</span>
      </div>
      <hr />
      <Menu 
        onClick={handleOnClick} 
        selectedKeys={[current]} 
        mode="inline" 
        items={items}   
      />
    </>
  );
}

export default Sidenav;
