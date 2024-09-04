export const useWishlistStore = defineStore("wishlist", () => {
  // ___________States_-_-_-_-_-_-_-_-_-_
  // ___________ACTIONs_-_-_-_-_-_-_-_-_-_

  //1/ Fetch saved items from the API
  const fetchWishlistItems = async () => {
    try {
      const response = await fetchAuthorizedApi("api/wishlist", {}, "GET");
      if (response && response.data) {
        data.wishlist = response.data;
      }
    } catch (error) {
      console.error("Failed to fetch saved products:", error);
    }
  };

  //2/ Add item to wishlist
  const addToWishlist = async (product) => {
    const existingProduct = data.wishlist.find(
      (item) => item.product_id === product.id
    );
    if (!existingProduct) {
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

        // console.log("Item added to saved products.");
        notify("Item added to wishlist", "success");
      } else {
        console.log("Failed to add item to saved products.");
      }
    }
  };

  //3/ remove item to wishlist
  const removeFromWishlist = (productId) => {
    const response = fetchAuthorizedApi(
      `api/wishlist/delete/${productId}`,
      {},
      "DELETE"
    );
    if (response) {
      data.wishlist = data.wishlist.filter((item) => item.id !== productId);
      notify("Item removed from wishlist", "error");
      // console.log("Item removed from saved products.");
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

  //5/ fhguysagfukhjsadhgfjk

  // Initial fetch when store is created
  fetchWishlistItems();

  return {
    fetchWishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getProductToRemove,
  };
});
