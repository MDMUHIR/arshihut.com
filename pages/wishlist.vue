<script setup>
  import { data } from "~/composables/states";
  import { storeToRefs } from "pinia";

  const wishStore = useWishlistStore();
  const cart = useCartStore();
  const { loadingWishlist } = storeToRefs(wishStore);

  onBeforeMount(() => {
    wishStore.fetchWishlistItems();
  });

  const listProducts = computed(() => {
    return data.wishlist.map((item) => ({
      ...item.product,
      id: item.product_id,
    }));
  });
</script>

<template>
  <div class="main pb-12 min-h-screen">
    <div class="page-hero flex justify-center items-center pb-8">
      <h1
        class="text-lg md:text-2xl text-center font-bold px-8 py-2 bg-orange-400 rounded-b-3xl shadow-lg text-white transform hover:scale-105 transition-transform duration-300"
      >
        My Wishlist
      </h1>
    </div>

    <!-- loadingWishlist state -->
    <div
      v-if="loadingWishlist"
      class="loader fixed inset-0 w-full flex justify-center items-center bg-white bg-opacity-50"
    >
      <reusableItemLoader />
    </div>

    <!-- Wishlist products with container -->
    <div
      v-else-if="data.wishlist.length > 0"
      class="container mx-auto px-4 sm:px-6 lg:px-8 mt-8"
    >
      <ProductsList :list-products="listProducts" />
    </div>

    <!-- Empty wishlist state -->
    <div
      v-else
      class="rounded-xl flex flex-col justify-center items-center bg-gray-100 shadow-sm mx-4 sm:mx-8 p-8 mt-8 text-center space-y-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-24 w-24 mx-auto text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <p class="text-2xl font-medium text-gray-600">Your wishlist is empty</p>
      <p class="text-gray-400">Start adding items you love to your wishlist</p>
      <nuxt-link
        to="/products"
        class="inline-block mt-4 px-6 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-500 transition-colors duration-300"
      >
        Explore Products
      </nuxt-link>
    </div>
  </div>
</template>

<style scoped></style>
