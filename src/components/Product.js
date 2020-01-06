import React from "react";
import { Link } from "react-router-dom";
import defaultImg from "../images/product-1.jpeg";
import PropTypes from "prop-types";
import { memo } from "react";
import { FaShoppingCart } from "react-icons/fa";


const Product = memo(({ product }) => {
  const { name, slug, images, price } = product;
  return (
    <article className="product">
      <div className="img-container">
        <img src={images[0] || defaultImg} alt="single product" />
        <div className="price-top">
          <h6>${price}</h6>
          <p>per packet</p>
        </div>
        <div className="cart-top">
          <FaShoppingCart onClick={handleCartClick} />
        </div>
        <Link to={`/products/${slug}`} className="btn-primary product-link">
          Ingredients
        </Link>
      </div>
      <p className="product-info">{name}</p>
    </article >
  );
});

const handleCartClick = () => {
  console.log('hello')
}
Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired
  })
};
export default Product