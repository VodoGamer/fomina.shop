export function addToCart(product_id: number) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(product_id);
  localStorage.setItem("cart", JSON.stringify(cart));
}
