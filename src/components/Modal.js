import React, { Component } from "react";
import styled from "styled-components";
import { ProductConsumer } from "../context";
// import "bootstrap/dist/css/bootstrap.min.css";

// import { ButtonContainer } from "./Button";
import { Link } from "react-router-dom";
export default class Modal extends Component {

  render() {
    return (
      <ProductConsumer>
        {value => {
          const { modalOpen, closeModal, decrement, increment } = value;
          if (!modalOpen) {
            return null;
          } else {
            const { images, name, price, id, count } = value.modalProduct
            return (
              <ModalContainer>
                <div id="modal">
                  <h5 style={{ "margin-top": "10px", }}>
                    <span style={{
                      "background-image": "linear-gradient(to right, #eee0b1, #eee0b1)"
                    }}>item added to cart</span>
                  </h5>
                  <img src={images[0]} className="img-fluid" alt="" />
                  <h5> <span style={{ "text-decoration": "underline" }}>{name}</span></h5>
                  <div className="qty-modal">
                    <div className="plus">
                      <span
                        onClick={() => {
                          return decrement(id);
                        }}
                      >
                        -
                    </span>
                    </div >
                    <div className="qty-count">
                      <span className="qty-box">{count}</span>
                    </div>
                    <div className="minus">
                      <span
                        onClick={() => {
                          return increment(id);
                        }}
                      >
                        +
                      </span>
                    </div>
                  </div>
                  <h5 className="text-muted">price : ${price}</h5>
                  <Link to="/">
                    <button
                      className="modal-button"
                      onClick={() => {
                        closeModal();
                      }}
                    >
                      Continue Shopping
                    </button>
                  </Link>
                  <Link to="/cart">
                    <button
                      className="modal-button"
                      onClick={() => {
                        closeModal();
                      }}
                    >
                      Go To Cart
                    </button>
                  </Link>
                </div>
              </ModalContainer>
            );
          }
        }}
      </ProductConsumer>
    );

  }

}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  text-align: center;
  text-transform: capitalize;
  justify-content: center;
  #modal {
    background: var(--mainWhite);
  }
`;
