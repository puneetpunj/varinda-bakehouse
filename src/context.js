import React, { Component } from "react";
import items from "./data";
// import Client from "./Contentful";

const ProductContext = React.createContext();

export default class ProductProvider extends Component {
  state = {
    products: [],
    sortedProducts: [],
    featuredProducts: [],
    loading: true,
    //
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    gift: false,
    maternity: false
  };

  // getData = async () => {
  //   try {
  //     let response = await Client.getEntries({
  //       content_type: "beachResortProduct"
  //     });
  //     let products = this.formatData(response.items);

  //     let featuredProducts = products.filter(product => product.featured === true);
  //     //
  //     let maxPrice = Math.max(...products.map(item => item.price));
  //     let maxSize = Math.max(...products.map(item => item.size));
  //     this.setState({
  //       products,
  //       featuredProducts,
  //       sortedProducts: products,
  //       loading: false,
  //       //
  //       price: maxPrice,
  //       maxPrice,
  //       maxSize
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  componentDidMount() {
    // this.getData();
    let products = this.formatData(items);
    let featuredProducts = products.filter(product => product.featured === true);
    //
    let maxPrice = Math.max(...products.map(item => item.price));
    let maxSize = Math.max(...products.map(item => item.size));
    this.setState({
      products,
      featuredProducts,
      sortedProducts: products,
      loading: false,
      //
      price: maxPrice,
      maxPrice,
      maxSize
    });
  }

  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);

      let product = { ...item.fields, images, id };
      return product;
    });
    return tempItems;
  }
  getProduct = slug => {
    let tempProducts = [...this.state.products];
    const product = tempProducts.find(product => product.slug === slug);
    return product;
  };
  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(name, value);

    this.setState(
      {
        [name]: value
      },
      this.filterProducts
    );
  };
  filterProducts = () => {
    let {
      products,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      gift,
      maternity
    } = this.state;

    let tempProducts = [...products];
    // transform values
    // get capacity
    capacity = parseInt(capacity);
    price = parseInt(price);
    // filter by type
    if (type !== "all") {
      tempProducts = tempProducts.filter(product => product.type === type);
    }
    // filter by capacity
    if (capacity !== 1) {
      tempProducts = tempProducts.filter(product => product.capacity >= capacity);
    }
    // filter by price
    tempProducts = tempProducts.filter(product => product.price <= price);
    //filter by size
    tempProducts = tempProducts.filter(
      product => product.size >= minSize && product.size <= maxSize
    );
    //filter by breakfast
    if (gift) {
      tempProducts = tempProducts.filter(product => product.gift === true);
    }
    //filter by pets
    if (maternity) {
      tempProducts = tempProducts.filter(product => product.maternity === true);
    }
    this.setState({
      sortedProducts: tempProducts
    });
  };
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          getProduct: this.getProduct,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer, ProductContext };

export function withProductConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <ProductConsumer>
        {value => <Component {...props} context={value} />}
      </ProductConsumer>
    );
  };
}
