import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faHouse, faFacebook } from '@fortawesome/free-solid-svg-icons'

import Sell from './comps/seller';
import AboutUs from './comps/Aboutus'
import Services from './comps/Services'
import Homepage from './comps/Homepage'
import PageNotFound from './comps/NotFound';
import BuyerData from './comps/buyer';
import PropForm from './comps/propForm';
import SellerProp from './comps/sellerProp.js';
import Property from './comps/property';
import Booking from './comps/booking';
import BuyerBookings from './comps/buyerBookings';



import NewForm from './comps/form';
import NewForm2 from './comps/formBuyer';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>

    <BrowserRouter>
<div id="topOfPage"></div>
      <nav class="navbar navbar-inverse navbar-expand-sm navbar-dark bg-dark" id="topNavBar">
        <div class="container-fluid">
          <div class="navbar-brand"><Link class="nav-link" to="/" ><FontAwesomeIcon icon={faHouse} /></Link></div>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav nav">
              {/* <li class="nav-item"><Link class="nav-link" to="/" >Home</Link></li> */}
              {/* <li class="nav-item"><Link class="nav-link" to="/aboutus" >About Us</Link></li> */}
              <li class="nav-item"><Link class="nav-link" to="/buyer" >Buyer</Link></li>
              <li class="nav-item"><Link class="nav-link" to="/seller" >Seller</Link></li>
              <li class="nav-item"><Link class="nav-link" to="/property" >Property</Link></li>

            </ul>
{/*             
              <button  type="button" class="btn btn-dark" id="searchBut">Login</button> */}
              <ul class="socials">
                {/* <li><FontAwesomeIcon icon={faFacebook} /></li> */}
              </ul>
            
          </div>
        </div>
      </nav>
      <br/>
      <br/><br/><br/><br/>







      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/buyer" element={<BuyerData />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/seller" element={<Sell />} />
        <Route path="/property" element={<Property />} />
        <Route path="/form" element={<NewForm />} />
        <Route path="/formBuyer" element={<NewForm2 />} />
        {/* <Route path="/propForm/:sellerID/:sellerFirstName" element={<PropForm />} />
        <Route path="/sellerProp/:sellerID/:sellerFirstName" element={<SellerProp/>}/> */}
        <Route path="/propForm/:sellerID/:sellerFirstName/:sellerSurname" element={<PropForm />} />
        <Route path="/sellerProp/:sellerID/:sellerFirstName/:sellerSurname" element={<SellerProp/>}/>
        <Route path="/property/:propertyID/:propertyAddress/:propertyPostcode" element={<Booking/>}/>
        {/* <Route path="/seller/:propertyID/:propertyAddress/:propertyPostcode" element={<Booking/>}/> */}
        <Route path="/buyerBookings/:buyerID/:buyerFirstName/:buyerSurname" element={<BuyerBookings/>}/>

        
                 <Route path="/sellerProp" element={<SellerProp/>}/>

      </Routes></BrowserRouter>



  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
