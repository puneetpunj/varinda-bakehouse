import React, { Component } from "react";
import { Link } from "react-router-dom";
import './cart.css'
import { IoIosTrash } from "react-icons/io";


export default class CartItem extends Component {

  render() {
    const { id, name, images, price, total, count, slug } = this.props.item;
    const { increment, decrement, removeItem } = this.props.value;

    return (
      <div>
        <hr />
        < div class="container" >
          <div class="product-infor">
            <div className="product-image">
              <img
                src={images[0]}
                className="img-product"
                alt=""
              />
            </div>
            <div className="product-name">
              <Link to={`/products/${slug}`}>{name}</Link>
            </div>
          </div>

          <div className="product-qty-price-container">
            <div className="qty">
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
            <div className="unit-price">
              ${price}
            </div>
            <div className="total">
              <strong>${total} </strong>
            </div>
            <div className="delete-button" onClick={() => removeItem(id)}>
              <IoIosTrash />
            </div>
          </div>
        </div >
      </div>

    )
  }
}
