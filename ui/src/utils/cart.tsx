export function getCart(): number[] {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function addToCart(product_id: number) {
  const cart = getCart();
  cart.push(product_id);
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeFromCart(index: number) {
  const cart = getCart();
  if (index > -1) {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}
