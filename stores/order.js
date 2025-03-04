export const useOrderStore = defineStore("order", () => {
  // ___________States_-_-_-_-_-_-_-_-_-_
  const loadingOrders = ref(false);
  const orders = ref([]);
  const cart = useCartStore();

  // ___________Actions_-_-_-_-_-_-_-_-_-_

  const placeOrder = async (checkout) => {
    loadingOrders.value = true;
    try {
      const response = await fetchAuthorizedApi(
        "api/orders/add",
        checkout,
        "POST"
      );
      if (response.status) {
        cart.emptyCart();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Failed to place order:", error);
      return false;
    } finally {
      loadingOrders.value = false;
    }
  };

  const fetchOrders = async () => {
    loadingOrders.value = true;
    try {
      const response = await fetchAuthorizedApi("api/orders", {}, "GET");
      data.orders = response.data;
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      loadingOrders.value = false;
    }
  };

  // fetch orders data for admin
  const fetchAdminOrders = async () => {
    loadingOrders.value = true;
    try {
      const response = await fetchAuthorizedApi("api/admin/orders", {}, "GET");
      orders.value = response.data;
    } catch (error) {
      console.error("Failed to fetch admin orders:", error);
    } finally {
      loadingOrders.value = false;
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
    loadingOrders,
    orders,
    placeOrder,
    fetchOrders,
    fetchAdminOrders,
    calculateTotal,
    getCurrentMonthTotalSum,
  };
});
