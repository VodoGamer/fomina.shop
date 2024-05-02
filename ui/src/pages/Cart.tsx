import { MetaProvider, Title } from "@solidjs/meta";

import CartItems from "../components/CartItems";

export default function Cart() {
  return (
    <>
      <MetaProvider>
        <Title>Корзина - Fomina Style</Title>
      </MetaProvider>
      <CartItems />
    </>
  );
}
