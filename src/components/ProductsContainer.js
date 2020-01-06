import React from "react";
import { withProductConsumer } from "../context";
import Loading from "./Loading";
import ProductsFilter from "./ProductsFilter";
import ProductsList from "./ProductsList";

function ProductContainer({ context }) {
  const { loading, sortedProducts, products } = context;
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <ProductsFilter products={products} />
      <ProductsList products={sortedProducts} />
    </>
  );
}

export default withProductConsumer(ProductContainer);