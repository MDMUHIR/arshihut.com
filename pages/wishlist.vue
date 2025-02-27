<script setup>
const wishStore = useWishlistStore();
const cart = useCartStore();

onBeforeMount(() => {
  wishStore.fetchWishlistItems();
});
const toggleWishlist = (product) => {
  console.log(product.product_id);

  if (wishStore.isInWishlist(product.product_id)) {
    wishStore.removeFromWishlist(product.id);
  } else {
    wishStore.addToWishlist(product);
  }
};
import { data } from "~/composables/states";
</script>

<template>
  <div class="main pb-12 ">
    <div class="page-hero flex justify-center items-center">
      <h1
        class="text-xl text-center font-bold px-5 py-1  bg-orange-400 rounded-b-3xl shadow-lg"
      >
        Wishlist
      </h1>
    </div>
    <!-- while the cart is empty -->
    <div
      v-if="data.wishlist.length === 0"
      class="rounded-lg  flex justify-center items-center"
    >
      <p class="text-center font-light text-2xl italic mt-36 text-red-500">
        !!! The Wishlist is Empty
      </p>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-4 mt-4"
    >
      <div
        class="mx-auto px-5"
        v-for="(product, index) in data.wishlist"
        :key="index"
      >
        <div
          class="max-w-xs min-w-56 h-80 rounded-lg bg-white p-2 pt-3 shadow duration-125 hover:shadow-md hover:bg-neutral-200"
        >
          <nuxt-link :to="`/products/${product.product_id}`">
            <img
              class="rounded-lg h-4/6 object-center cursor-pointer mx-auto"
              :src="apiBase + product.product.image"
              alt="product"
            />
          </nuxt-link>
          <div class="middle flex justify-between">
            <nuxt-link :to="`/product/${product.product_id}`">
              <p class="my-4 pl-4 font-bold text-gray-500">
                 {{ truncatedHeadingText(product.product.name) }}
              </p>
            </nuxt-link>
            <button @click="toggleWishlist(product)" class="w-6">
              <IconsBookmark
                v-if="!wishStore.isInWishlist(product.product_id)"
                class="w-full"
              />
              <IconsBookmarkDash
                v-if="wishStore.isInWishlist(product.product_id)"
                class="w-full"
              />
            </button>
          </div>

          <div class="bottom flex justify-between items-center">
            <p class="ml-3 text-sm font-bold text-gray-800">
              ${{ product.product.price }}
            </p>

            <nuxt-link v-if="cart.isInCart(product.product_id)" to="/cart">
              <button
                class="add-cart bg-gray-400 hover:bg-gray-500 text-white border-black add-cart py-1 px-2 md:px-5 text-sm font-semibold border-2 rounded md:ml-2 mt-2 md:mt-0"
              >
                <span>Go to Cart</span>
              </button>
            </nuxt-link>
            <button
              v-else
              @click="cart.addItem(product.product)"
              class="add-cart py-1 px-2 text-sm font-semibold bg-blue-500 hover:bg-blue-600 text-white border border-black rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
