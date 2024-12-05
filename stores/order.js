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
      // console.log(response.data);
      data.orders = response.data;
    });
  };

  const orders = ref([]);

  // fetch orders data for admin
  const fetchAdminOrders = async () => {
    try {
      const response = await fetchAuthorizedApi("api/admin/orders", {}, "GET");
      orders.value = response.data;
    } catch (error) {
      console.error("Failed to fetch admin orders:", error);
    }
  };

  const calculateTotal = (products) => {
    if (products) {
      return products.reduce(
        (acc, product) => acc + product.price * product.pivot.quantity,
        0
      );
    }
  };

  // fetchAdminOrders();

  // Function to get the sum of totals for the current month
  const getCurrentMonthTotalSum = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed

    // Filter orders by the current month
    const filteredOrders = orders.value.filter((order) => {
      const orderDate = new Date(order.created_at);
      return (
        orderDate.getFullYear() === currentYear &&
        orderDate.getMonth() + 1 === currentMonth
      );
    });

    // Calculate the sum of totals for the filtered orders
    const totalSum = filteredOrders.reduce((sum, order) => {
      return sum + parseFloat(order.total);
    }, 0);
    // Get the total number of orders for the current month
    const totalOrders = filteredOrders.length;

    return {
      totalSum: totalSum.toFixed(2), // Sum as a string with two decimal places
      totalOrders: totalOrders, // Total number of orders
    };
  };

  return {
    orders,
    placeOrder,
    fetchOrders,
    fetchAdminOrders,
    calculateTotal,
    getCurrentMonthTotalSum,
  };
});
