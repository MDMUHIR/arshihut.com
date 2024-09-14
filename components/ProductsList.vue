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
</script>

<template>
  <div class="main relative overflow-y-auto">
    <button
      v-if="productStore.toggleFilteredProducts()"
      @click="filteredProducts.length = 0"
      class="top-56 sm:top-20 -left-2 sm:left-4 fixed bg-red-500 hover:text-red-500 sm:ml-1 px-1 sm:px-2 sm:rounded-tl-lg hover:bg-white text-white rotate-90 sm:rotate-0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="4"
        stroke="currentColor"
        class="h-9 w-10 cursor-pointer duration-150"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-4"
    >
      <div
        class="mx-auto p-5"
        v-for="(product, index) in filteredProducts"
        :key="index"
      >
        <!-- <pre>{{ product }}</pre> -->
        <div
          class="max-w-xs min-w-48 rounded-lg bg-white dark:bg-[#302f2f] p-2 pt-3 duration-125 shadow-sm shadow-black hover:shadow-md dark:hover:dark:bg-[#0a0a0a]/75 hover:bg-neutral-200"
          :class="'customer' == auth.user.type ? 'h-80' : 'h-40'"
        >
          <nuxt-link :to="`/products/${product.id}`">
            <img
              class="rounded-lg h-4/6 object-center cursor-pointer mx-auto"
              :src="apiBase + product.image"
              alt="product"
            />
          </nuxt-link>
          <div
            class="middle flex items-center"
            :class="
              'customer' == auth.user.type
                ? 'justify-between'
                : 'justify-center'
            "
          >
            <nuxt-link :to="`/product/${product.id}`" class="">
              <p
                class="my-4 font-bold text-gray-500 dark:text-[#e5e5e5] text-center truncate"
              >
                {{ truncatedHeadingText(product.name) }}
              </p>
            </nuxt-link>
            <button
              v-if="'customer' == auth.user.type"
              @click="toggleWishlist(product)"
              class="w-6"
            >
              <IconsBookmarkDash
                v-if="wishStore.isInWishlist(product.id)"
                class="w-full"
              />
              <IconsBookmark v-else class="w-full" />
            </button>
          </div>

          <div
            v-if="'customer' == auth.user.type"
            class="bottom flex justify-between items-center"
          >
            <p class="ml-3 text-sm font-bold text-gray-800 dark:text-white">
              ${{ product.price }}
            </p>
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
              v-else
              @click="cart.addItem(product)"
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
