import React, { Component } from "react";
import defaultBcg from "../images/product-1.jpeg";
// import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { ProductContext } from "../context";
import { FaShoppingCart } from "react-icons/fa";




import StyledHero from "../components/StyledHero";
export default class SingleProduct extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props);
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg: defaultBcg
    };
  }
  static contextType = ProductContext;

  render() {
    const { getProduct, addToCart, openModal } = this.context;
    const product = getProduct(this.state.slug);

    if (!product) {
      return (
        <div className="error">
          <h3> no such product could be found...</h3>
          <Link to="/products" className="btn-primary">
            back to products
          </Link>
        </div>
      );
    }
    const {
      name,
      description,
      size,
      price,
      ingredients,
      images,
      id
    } = product;
    // const [...defaultImages] = images;
    // console.log(defaultImages);

    return (
      <>
        <StyledHero img={images[0] || this.state.defaultBcg}>
          <Banner title={`${name}`}>
            <Link to="/" className="btn-primary">
              back to home
            </Link>
          </Banner>
        </StyledHero>
        <section className="single-product">

          <div className="single-product-info">

            <article className="desc">
              <h3>details</h3>
              <p>{description}</p>
            </article>

            <article className="info">
              <h3>info</h3>
              <h6>price : ${price}</h6>
              <h6>size : {size} grams</h6>
              {/* <h6>
                max capacity :
                {capacity > 1 ? `${capacity} people` : `${capacity} person`}
              </h6> */}
              {/* <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
              <h6>{breakfast && "free breakfast included"}</h6> */}
            </article>

            <article>
              <button style={{ width: "100px", height: "54px" }} onClick={() => {
                addToCart(id);
                openModal(id);
              }}>
                <FaShoppingCart style={{ width: "80px", height: "34px" }} /> Add to Cart
              </button>
            </article>
          </div>
          <section className="product-ingredients">
            <h6>ingredients</h6>
            <ul className="ingredients">
              {ingredients.map((item, index) => (
                <li key={index}>- {item}</li>
              ))}
            </ul>
          </section>
          {/* <h6 className="text-centre">Photos</h6> */}
          {/* <div className="single-product-images">
            {defaultImages.map((item, index) => (
              <img key={index} src={item} alt={name} />
            ))}
          </div> */}
        </section>

      </>
    );
  }
}
