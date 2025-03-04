export const useCartStore = defineStore(
  "cart",
  () => {
    // state----->
    const loadingCart = ref(false);

    // Actions---->
    const auth = useAuthStore();

    const totalCartItems = computed(() => {
      let total = 0;
      for (let id in data.cart) {
        total += data.cart[id].quantity;
      }
      return total;
    });

    const totalPrice = computed(() => {
      let total = 0;
      for (let id in data.cart) {
        total += data.cart[id].product.price * data.cart[id].quantity;
      }
      return parseFloat(total.toFixed(2));
    });

    // #/ Check the item is the cart________________

    const isInCart = (productId) => {
      return data.cart.some((item) => item.product_id === productId);
    };

    // add item to cart
    const addItem = async (product) => {
      if (auth.user === null) {
        notify(
          "Please login or create a user account to add items to cart",
          "error"
        );
        return;
      }

      loadingCart.value = true;
      try {
        const index = data.cart.findIndex(
          (item) => item.product_id == product.id
        );

        const response = await fetchAuthorizedApi(
          "api/cart/add",
          { product_id: product.id, quantity: 1, price: product.price },
          "POST"
        );

        let cartItem = response.data;
        cartItem.product = product;
        if (index == -1) {
          data.cart.push(cartItem);
        } else {
          data.cart[index] = cartItem;
        }

        notify("Added to cart", "success");
      } catch (error) {
        console.error("Error adding item to cart:", error);
        notify("Failed to add item to cart", "error");
      } finally {
        loadingCart.value = false;
      }
    };

    const deleteItem = async (item, index) => {
      loadingCart.value = true;
      try {
        const response = await fetchAuthorizedApi(
          `api/cart/delete/${item.id}`,
          {},
          "delete"
        );

        if (response.status) {
          data.cart.splice(index, 1);
          notify("Deleted from cart", "error");
        }
      } catch (error) {
        console.error("Error deleting item from cart:", error);
        notify("Failed to delete item from cart", "error");
      } finally {
        loadingCart.value = false;
      }
    };

    const updateCart = async (status, item, index) => {
      loadingCart.value = true;
      try {
        const params = { cart_id: item.id };

        if (status === "plus") {
          data.cart[index].quantity = data.cart[index].quantity + 1;
          params.quantity = data.cart[index].quantity;
        } else {
          if (data.cart[index].quantity == 1) {
            alert("You can't decrease anymore");
            return;
          } else {
            data.cart[index].quantity = data.cart[index].quantity - 1;
            params.quantity = data.cart[index].quantity;
          }
        }

        const response = await fetchAuthorizedApi(
          `api/cart/update`,
          params,
          "POST"
        );
        if (response.status) {
          data.cart[index].quantity = response.data.quantity;
          data.cart[index].total = response.data.total;
        }
      } catch (error) {
        console.error("Error updating cart:", error);
        notify("Failed to update cart", "error");
      } finally {
        loadingCart.value = false;
      }
    };

    const fetchCartData = () => {
      loadingCart.value = true;
      const res = fetchAuthorizedApi("api/cart");
      res
        .then((response) => {
          if (response) {
            data.cart = response.data;
          }
        })
        .catch((error) => {
          console.error("Error fetching cart data:", error);
        })
        .finally(() => {
          loadingCart.value = false;
        });
    };

    // #/ Fetch cart data when the store is created
    fetchCartData();

    const emptyCart = () => {
      data.cart = [];
    };
    return {
      loadingCart,
      totalCartItems,
      totalPrice,
      isInCart,
      addItem,
      deleteItem,
      updateCart,
      fetchCartData,
      emptyCart,
    };
  },
  {
    persist: true,
  }
);
