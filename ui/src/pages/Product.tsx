import { Component } from "solid-js";
import { useParams } from "@solidjs/router";
import { MetaProvider, Title } from "@solidjs/meta";

import ProductDetails from "../components/ProductDetails";

const Product: Component = () => {
  const params: { id: string } = useParams();

  return (
    <>
      <MetaProvider>
        <Title>Карточка товара - Fomina Style</Title>
      </MetaProvider>
      <ProductDetails productId={Number(params.id)} />
    </>
  );
};

export default Product;
