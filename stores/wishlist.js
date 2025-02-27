export const useWishlistStore = defineStore("wishlist", () => {
  // ___________States_-_-_-_-_-_-_-_-_-_
  const loadingWishlist = ref(false);

  // ___________ACTIONs_-_-_-_-_-_-_-_-_-_

  //1/ Fetch saved items from the API
  const fetchWishlistItems = async () => {
    loadingWishlist.value = true;
    try {
      const response = await fetchAuthorizedApi("api/wishlist", {}, "GET");
      if (response && response.data) {
        data.wishlist = response.data;
      }
    } catch (error) {
      console.error("Failed to fetch saved products:", error);
    } finally {
      loadingWishlist.value = false;
    }
  };

  //2/ Add item to wishlist
  const addToWishlist = async (product) => {
    const existingProduct = data.wishlist.find(
      (item) => item.product_id === product.id
    );
    if (!existingProduct) {
      loadingWishlist.value = true;
      try {
        // Product is not in saved, add it
        const response = await fetchAuthorizedApi(
          "api/wishlist/add",
          { product_id: product.id },
          "POST"
        );

        if (response.status) {
          data.wishlist.push({
            id: response.data.id,
            user_id: response.data.user_id,
            product_id: product.id,
            created_at: response.data.created_at,
            updated_at: response.data.updated_at,
            product,
          });

          notify("Item added to wishlist", "success");
        } else {
          console.log("Failed to add item to saved products.");
        }
      } catch (error) {
        console.error("Error adding to wishlist:", error);
      } finally {
        loadingWishlist.value = false;
      }
    }
  };

  //3/ remove item to wishlist
  const removeFromWishlist = async (productId) => {
    loadingWishlist.value = true;
    try {
      const response = await fetchAuthorizedApi(
        `api/wishlist/delete/${productId}`,
        {},
        "DELETE"
      );
      if (response) {
        data.wishlist = data.wishlist.filter((item) => item.id !== productId);
        notify("Item removed from wishlist", "error");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    } finally {
      loadingWishlist.value = false;
    }
  };

  // due to different data structure we needed to get the actiual product from wishlist using product_id come from product-list.
  const getProductToRemove = (id) => {
    const productData = data.wishlist.find((item) => item.product_id === id);
    removeFromWishlist(productData.id);
  };

  //4/ Check the item is in the wishlist
  const isInWishlist = (productId) => {
    return data.wishlist.some((item) => item.product_id === productId);
  };

  // Initial fetch when store is created
  fetchWishlistItems();

  return {
    loadingWishlist,
    fetchWishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getProductToRemove,
  };
});
