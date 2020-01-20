import React, { Component } from "react";
import './cart.css'


export default class CartColumns extends Component {
  render() {
    return (

      <div>
        < div class="header-container" >
          {/* <hr /> */}
          <div className="header-product-infor"></div>
          {/* <div className="qty"></div> */}
          <div className="header-qty headers">
            Quantity
        </div>
          <div className="header-unit-price headers" >
            Price
          </div>
          <div className="header-total headers">
            <strong>Total </strong>
          </div>
        </div >
      </div >
    );
  }
}
