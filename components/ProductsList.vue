<script setup>
  const cart = useCartStore();
  const productStore = useProductStore();
  // Define props
  const props = defineProps({
    filteredProducts: {
      type: Array,
      required: true,
    },
  });

  const auth = useAuthStore();

  const wishStore = useWishlistStore();

  const toggleWishlist = (product) => {
    if (wishStore.isInWishlist(product.id)) {
      wishStore.getProductToRemove(product.id);
    } else {
      wishStore.addToWishlist(product);
    }
  };
  // Utility function to format the price
  const formatPrice = (price) => {
    // Handle null, undefined, or non-numeric values
    if (!price || isNaN(price)) return "0";

    // Handle negative values
    const absolutePrice = Math.abs(price);

    // Format the price without decimal places
    return absolutePrice.toFixed(0);
  };
</script>

<template>
  <div class="relative">
    <!-- for searching component -->
    <button
      v-if="productStore.toggleFilteredProducts()"
      @click="filteredProducts.length = 0"
      class="fixed sm:top-[73px] right-[-23px] sm:right-0 bg-red-500 hover:text-red-500 px-5 border hover:bg-white text-white rotate-90 sm:rotate-0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="4"
        stroke="currentColor"
        class="h-8 w-10 cursor-pointer duration-150"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    <div class="main">
      <!-- component -->

      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-4 md:gap-6"
      >
        <template v-for="(product, index) in filteredProducts" :key="index">
          <div
            class="relative flex flex-col text-gray-700 bg-white border shadow-md bg-clip-border rounded-xl w-full sm:min-w-[10rem] sm:max-w-[20rem]"
          >
            <div
              class="relative overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl"
            >
              <nuxt-link
                :to="`/products/${product.id}`"
                @click="filteredProducts.length = 0"
              >
                <img
                  :src="apiBase + product.image"
                  alt="product"
                  class="object-cover w-full h-full"
                />
              </nuxt-link>
            </div>

            <!-- Cart Center -->
            <div class="px-5 md:mb-2">
              <div class="flex items-center justify-between overflow-hidden">
                <p
                  class="text-base antialiased font-medium text-blue-gray-900 truncate mr-2"
                >
                  {{ product.name }}
                </p>
                <button @click="toggleWishlist(product)" class="w-6">
                  <IconsBookmarkDash
                    v-if="wishStore.isInWishlist(product.id)"
                    class="w-full"
                  />
                  <IconsBookmark v-else class="w-full" />
                </button>
              </div>
            </div>

            <!-- Cart Bottom -->
            <div
              class="pb-2 sm:pb-5 sm:px-5 pt-0 flex flex-col sm:flex-row justify-between items-center"
            >
              <p
                class="block antialiased font-medium leading-relaxed text-blue-gray-900 mr-1"
              >
                ৳{{ formatPrice(product.price) }}
              </p>

              <!-- Add cart buttons -->
              <div class="add-cart-buttons hidden sm:block">
                <nuxt-link
                  v-if="cart.isInCart(product.id)"
                  @click="filteredProducts.length = 0"
                  to="/cart"
                >
                  <button
                    class="add-cart py-1 px-2 text-sm font-semibold bg-gray-400 hover:bg-gray-500 text-white border border-black rounded"
                  >
                    <span>Go to Cart</span>
                  </button>
                </nuxt-link>
                <button
                  v-else-if="product.stock == 0"
                  class="add-cart py-1 px-2 text-sm font-semibold duration-150 border border-black rounded bg-red-400 text-white italic cursor-not-allowed"
                >
                  Out of stock
                </button>
                <button
                  v-else
                  @click="cart.addItem(product)"
                  class="add-cart py-1 px-2 text-sm duration-150 text-white rounded bg-blue-500 hover:bg-[#640e8b]"
                >
                  Add to Cart <img src="" alt="" />
                </button>
                <!-- <button @click="cart.addItem(product)" class="group">
                <svg
                  class="group-hover:text-purple-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fill="currentColor"
                    d="M2.237 2.288a.75.75 0 1 0-.474 1.423l.265.089c.676.225 1.124.376 1.453.529c.312.145.447.262.533.382s.155.284.194.626c.041.361.042.833.042 1.546v2.672c0 1.367 0 2.47.117 3.337c.12.9.38 1.658.982 2.26c.601.602 1.36.86 2.26.981c.866.117 1.969.117 3.336.117H18a.75.75 0 0 0 0-1.5h-7c-1.435 0-2.436-.002-3.192-.103c-.733-.099-1.122-.28-1.399-.556c-.235-.235-.4-.551-.506-1.091h10.12c.959 0 1.438 0 1.814-.248s.565-.688.943-1.57l.428-1c.81-1.89 1.215-2.834.77-3.508S18.506 6 16.45 6H5.745a9 9 0 0 0-.047-.833c-.055-.485-.176-.93-.467-1.333c-.291-.404-.675-.66-1.117-.865c-.417-.194-.946-.37-1.572-.58zM7.5 18a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m9 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3"
                  />
                </svg>
              </button> -->
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
