import React from "react";
import { Link } from "react-router-dom";
import defaultImg from "../images/product-1.jpeg";
import PropTypes from "prop-types";
import { memo } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { ProductConsumer } from "../context";


const Product = memo(({ product }) => {
  const { name, slug, images, price, id } = product;
  return (
    <ProductConsumer>
      {value => {
        return (
          <article className="product">
            <div className="img-container">
              <Link to={`/products/${slug}`}>
                <img src={images[0] || defaultImg} alt="single product" />
              </Link>
              <div className="price-top">
                <h6>${price}</h6>
                <p>per packet</p>
              </div>
              <div className="cart-top" onClick={() => {
                value.addToCart(id);
                value.openModal(id);
              }} >
                <FaShoppingCart />
              </div>
              {/* <Link to={`/products/${slug}`} className="btn-primary product-link">
                Specification
              </Link> */}
            </div>
            <Link to={`/products/${slug}`} style={{ "textDecoration": "none", "color": "black" }}>
              <p className="product-info">{name}</p>
            </Link>
          </article >
        )
      }}

    </ProductConsumer>
  );
});

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired
  })
};
export default Product