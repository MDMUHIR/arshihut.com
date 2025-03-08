export const useOrderStore = defineStore("order", () => {
  // ___________States_-_-_-_-_-_-_-_-_-_
  const loadingOrders = ref(false);
  // const orders = ref([]);
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
      if (response && response.data) {
        data.orders = response.data;
        console.log("Admin orders loaded:", data.orders);
      }
    } catch (error) {
      console.error("Failed to fetch admin orders:", error);
      data.orders = [];
    } finally {
      loadingOrders.value = false;
    }
  };

  const getMonthlyOrders = () => {
    // if (!data.orders.length) return 0;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Filter orders by the current month
    const filteredOrders = data.orders.filter((order) => {
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

  const getPendingOrders = () => {
    return data.orders.filter((order) => order.status === "pending");
  };

  const calculateTotalPrice = (products) => {
    if (products) {
      return products.reduce(
        (acc, product) => acc + product.price * product.pivot.quantity,
        0
      );
    }
  };

  return {
    loadingOrders,
    placeOrder,
    fetchOrders,
    fetchAdminOrders,
    getMonthlyOrders,
    getPendingOrders,
    calculateTotalPrice,
  };
});
