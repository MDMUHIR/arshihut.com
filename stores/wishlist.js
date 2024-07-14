export const useSavedStore = defineStore("wishlist", () => {
  // State

  // Fetch saved items from the API
  const fetchSavedItems = async () => {
    try {
      const response = await fetchAuthorizedApi("api/wishlist", {}, "GET");
      if (response && response.data) {
        data.savedProducts = response.data; // Ensure response has `data`
        // console.log("Fetched saved products:", data.savedProducts);
      }
    } catch (error) {
      console.error("Failed to fetch saved products:", error);
    }
  };

  // Check if a product is included in savedProducts
  const isProductIncluded = (productId) => {
    return data.savedProducts.some((item) => item.product_id === productId);
  };

  // Toggle a product in the saved items
  const toggleSavedItem = async (product) => {
    try {
      if (isProductIncluded(product.id)) {
        // Product is already in saved, remove it
        const response = await fetchAuthorizedApi(
          `api/wishlist/delete/${product.id}`,
          {},
          "DELETE"
        );

        if (response) {
          data.savedProducts = data.savedProducts.filter(
            (item) => item.product_id !== product.id
          );
          console.log("Item removed from saved products.");
        } else {
          console.log("Failed to remove item from saved products.");
        }
      } else {
        // Product is not in saved, add it
        const response = await fetchAuthorizedApi(
          "api/wishlist/add",
          { product_id: product.id },
          "POST"
        );

        if (response.status) {
          data.savedProducts.push({
            id: response.data.id,
            user_id: response.data.user_id,
            product_id: product.id,
            created_at: response.data.created_at,
            updated_at: response.data.updated_at,
            product,
          });
          console.log("Item added to saved products.");
        } else {
          console.log("Failed to add item to saved products.");
        }
      }
    } catch (error) {
      console.error("Error toggling saved item:", error);
    }
  };

  // Initial fetch when store is created
  fetchSavedItems();

  return {
    fetchSavedItems,
    isProductIncluded,
    toggleSavedItem,
  };
});
