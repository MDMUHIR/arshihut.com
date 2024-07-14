export const useOrderStore = defineStore("order", () => {
  const cart = useCartStore();
  const placeOrder = async (checkout) => {
    const res = fetchAuthorizedApi("api/orders/add", checkout, "POST");
    res.then((response) => {
      if (response.status) {
        cart.emptyCart();
        return true;
      } else {
        return false;
      }
    });
  };

  const fetchOrders = () => {
    const res = fetchAuthorizedApi("api/orders", {}, "GET");
    res.then((response) => {
      console.log(response.data);
      data.orders = response.data;
    });
  };

  return { placeOrder, fetchOrders };
});
