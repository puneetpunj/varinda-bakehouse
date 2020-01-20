import React, { Component } from "react";
import './cart.css'

// import PayPalButton from "./PayPalButton";
// import { Link } from "react-router-dom";
export default class CartTotals extends Component {
  render() {
    const {
      // cartSubTotal,
      // cartTax,
      cartTotal,
      cart,
      // clearCart
    } = this.props.value;
    // const { history } = this.props;
    const emptyCart = cart.length === 0 ? true : false;
    return (
      <React.Fragment>
        {!emptyCart && (

          <div>
            <hr />
            <div className="container"  >
              <div style={{ flex: 3 }}></div>
              <div className="total-container">
                {/* <Link to="/">
                    <button
                      className="btn btn-outline-danger text-uppercase mb-3 px-5"
                      type="button"
                      onClick={() => {
                        clearCart();
                      }}
                    >
                      clear cart
                  </button>
                  </Link> */}
                {/* <h5>
                  <span className="text-title"> subtotal :</span>{" "}
                  <strong>$ {cartSubTotal} </strong>
                </h5>
                <h5>
                  <span className="text-title"> tax :</span>{" "}
                  <strong>$ {cartTax} </strong>
                </h5> */}
                <h5>
                  <strong>Total Amount - $ {cartTotal} </strong>
                </h5>
                {/* <PayPalButton
                  totalAmount={cartTotal}
                  clearCart={clearCart}
                  history={history}
                /> */}
              </div>
            </div>

          </div>
        )}
      </React.Fragment>
    );
  }
}
