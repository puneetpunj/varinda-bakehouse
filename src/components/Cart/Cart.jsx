import React, { Component } from 'react';
import Title from '../Title';
import CartColumns from './CartColumns.jsx';
import CartList from './CartList.jsx';
import CartTotals from './CartTotals.jsx';
import { ProductConsumer } from '../../context';
import EmptyCart from './EmptyCart.jsx';

export default class Cart extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {value => {
            const { cart } = value;
            if (cart.length > 0) {
              return (
                <React.Fragment>
                  <Title title="my cart" />
                  <CartColumns />
                  <CartList value={value} />
                  <CartTotals value={value} history={this.props.history} />
                </React.Fragment>
              );
            } else {
              return (
                <React.Fragment>
                  <Title title="my cart" />
                  <EmptyCart />
                </React.Fragment>
              );
            }
          }}
        </ProductConsumer>
      </section>
    );
  }
}
