import React, { Component } from "react";
import { items } from "./data";
// import Client from "./Contentful";

const ProductContext = React.createContext();

export default class ProductProvider extends Component {
  state = {
    products: [],
    sortedProducts: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    gift: false,
    maternity: false,
    cart: [
      // {
      //   name: "Coconut Cookies",
      //   slug: "coconut-cookies",
      //   type: "cookies",
      //   price: 7,
      //   size: 200,
      //   images: ["/static/media/coconut-main.11ae2e7f.jpeg", "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…jiPJP+7RxHkkkrKKK+Pk7jHZLeI8k42U3iPJJJGiIfaMnc//Z", "/static/media/coconut3.80d8bcdf.jpeg", "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…LALNUrlyBiAqlSuRAQFylcgYquXLljFCqlcuWAyFy5cmFP//Z"],
      //   id: "2",
      //   inCart: true,
      //   count: 1,
      //   total: 7,
      // },
      // {
      //   name: "Coconut Cookies",
      //   slug: "coconut-cookies",
      //   type: "cookies",
      //   price: 7,
      //   size: 200,
      //   images: ["/static/media/coconut-main.11ae2e7f.jpeg", "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…jiPJP+7RxHkkkrKKK+Pk7jHZLeI8k42U3iPJJJGiIfaMnc//Z", "/static/media/coconut3.80d8bcdf.jpeg", "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…LALNUrlyBiAqlSuRAQFylcgYquXLljFCqlcuWAyFy5cmFP//Z"],
      //   id: "2",
      //   inCart: true,
      //   count: 1,
      //   total: 7,
      // }
    ],
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
    modalOpen: false,
    modalProduct: items[0],

  };

  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  componentDidMount() {
    // this.getData();
    this.setProducts();
    let products = this.formatData(items);
    let featuredProducts = products.filter(product => product.featured === true);
    //
    let maxPrice = Math.max(...products.map(item => item.price));
    this.setState({
      products,
      featuredProducts,
      sortedProducts: products,
      loading: false,
      price: maxPrice,
      maxPrice,
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
    // console.log(name, value);

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
      price,
      gift,
      maternity
    } = this.state;
    let tempProducts = [...products];
    // transform values
    price = parseInt(price);
    // filter by type
    if (type !== "all") {
      tempProducts = tempProducts.filter(product => product.type === type);
    }

    // filter by price
    tempProducts = tempProducts.filter(product => {
      // console.log(product.price)
      return product.price <= price
    });
    // console.log(tempProducts)

    //filter by breakfast
    if (gift) {
      tempProducts = tempProducts.filter(product => product.gift === true);
    }
    //filter by maternity
    if (maternity) {
      tempProducts = tempProducts.filter(product => product.maternity === true);
    }
    this.setState({
      sortedProducts: tempProducts
    });
  };

  handleDetail = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };

  setProducts = () => {
    let products = [];
    items.forEach(item => {
      const singleItem = { ...item };
      products = [...products, singleItem];
    });
    this.setState(() => {
      return { products };
    }, this.checkCartItems);
  };

  addToCart = id => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    this.setState(() => {
      return {
        products: [...tempProducts],
        cart: [...this.state.cart, product],
        detailProduct: { ...product }
      };
    }, this.addTotals);
  };

  getTotals = () => {
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    return {
      subTotal,
      tax,
      total
    };
  };

  addTotals = () => {
    const totals = this.getTotals();
    this.setState(
      () => {
        return {
          cartSubTotal: totals.subTotal,
          cartTax: totals.tax,
          cartTotal: totals.total
        };
      },
      () => {
        // console.log(this.state);
      }
    );
  };

  // modal handling 
  openModal = id => {
    document.body.style.overflow = 'hidden';  //prevent scrolling if modal is open
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

  closeModal = () => {
    document.body.style.overflow = 'unset'; //enable scrolling once modal is closed
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  // on cart page
  increment = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => {
      return item.id === id;
    });
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;
    this.setState(() => {
      return {
        cart: [...tempCart]
      };
    }, this.addTotals);
  };
  decrement = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => {
      return item.id === id;
    });
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(() => {
        return { cart: [...tempCart] };
      }, this.addTotals);
    }
  };
  removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    tempCart = tempCart.filter(item => {
      return item.id !== id;
    });

    this.setState(() => {
      return {
        cart: [...tempCart],
        products: [...tempProducts]
      };
    }, this.addTotals);
  };
  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
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
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          getProduct: this.getProduct,
          handleChange: this.handleChange,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
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
