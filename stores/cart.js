export const useCartStore = defineStore(
  "cart",
  () => {
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

    const addItem = (product) => {
      const index = data.cart.findIndex(
        (item) => item.product_id == product.id
      );

      const res = fetchAuthorizedApi(
        "api/cart/add",
        { product_id: product.id, quantity: 1, price: product.price },
        "POST"
      );
      res.then((response) => {
        let cartItem = response.data;
        cartItem.product = product;
        if (index == -1) {
          data.cart.push(cartItem);
        } else {
          data.cart[index] = cartItem;
        }

        notify("Added to cart", "success");
      });
    };

    const deleteItem = (item, index) => {
      const res = fetchAuthorizedApi(
        `api/cart/delete/${item.id}`,
        {},
        "delete"
      );

      res.then((response) => {
        if (response.status) {
          data.cart.splice(index, 1);
          notify("Dleleted from cart", "error");
        }
      });
    };

    const updateCart = (status, item, index) => {
      const params = { cart_id: item.id };

      if (status === "plus") {
        console.log("updateCart +");
        data.cart[index].quantity = data.cart[index].quantity + 1;
        params.quantity = data.cart[index].quantity;
      } else {
        if (data.cart[index].quantity == 1) {
          alert("You can't decrease anymore");
        } else {
          console.log("updateCart -");
          data.cart[index].quantity = data.cart[index].quantity - 1;
          params.quantity = data.cart[index].quantity;
        }
      }

      const res = fetchAuthorizedApi(`api/cart/update`, params, "POST");
      res.then((response) => {
        if (response.status) {
          data.cart[index].quantity = response.data.quantity;
          data.cart[index].total = response.data.total;
        }
      });
    };

    const fetchCartData = () => {
      const res = fetchAuthorizedApi("api/cart");
      res.then((response) => {
        data.cart = response.data;
      });
    };
    fetchCartData();

    const emptyCart = () => {
      data.cart = [];
    };
    return {
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
