<script setup></script>

<template>
  <!-- Card -->
  <div
    class="relative flex flex-col text-gray-700 bg-white border shadow-md bg-clip-border rounded-xl w-full sm:min-w-[10rem] sm:max-w-[20rem] overflow-hidden hover:shadow-xl hover:shadow-[#c4c3c3] duration-150"
  >
    <div
      class="overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl"
    >
      <div class="img relative">
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
        <button
          @click="toggleWishlist(product)"
          class="absolute top-1 right-1 rounded-full w-[35px] h-[35px] bg-white flex items-center justify-center shadow-md"
        >
          <IconsBookmarkDash
            v-if="wishStore.isInWishlist(product.id)"
            class="w-[24px] h-[25px]"
          />

          <IconsBookmark v-else class="w-[25px] h-[25px]" />
          <span
            class="iconify"
            data-icon="material-symbols-light:favorite-outline"
            data-inline="false"
          ></span>
        </button>
      </div>
    </div>

    <!-- Cart Center -->
    <div class="px-5 sm:my-2 text-center">
      <p
        class="text-sm sm:text-base antialiased font-medium text-blue-gray-900 truncate"
      >
        {{ product.name }}
      </p>
    </div>

    <!-- Cart Bottom -->
    <div
      class="flex flex-col sm:flex-row justify-between items-center text-center m-2 sm:m-1 shadow-inner shadow-[#c4c3c3] sm:shadow-none rounded sm:rounded-none overflow-hidden"
    >
      <p
        class="antialiased text-sm sm:text-base font-medium sm:leading-relaxed text-blue-gray-900 mx-3 sm:mb-1 w-full sm:w-auto"
      >
        <span class="font-bold sm:text-2xl">৳</span
        >{{ formatPrice(product.price) }}
      </p>

      <!-- Add cart buttons -->
      <div
        class="add-cart-buttons w-full h-full sm:p-0 sm:rounded-br-xl sm:rounded-tl-xl overflow-hidden"
      >
        <nuxt-link
          v-if="cart.isInCart(product.id)"
          @click="filteredProducts.length = 0"
          to="/cart"
        >
          <button
            class="add-cart w-full h-full py-1 px-2 text-sm font-semibold bg-gray-400 hover:bg-gray-500 text-white"
          >
            <span>Go to Cart</span>
          </button>
        </nuxt-link>
        <button
          v-else-if="product.stock == 0"
          class="add-cart w-full h-full py-1 px-2 text-sm font-semibold duration-150 bg-red-400 text-white italic cursor-not-allowed"
        >
          Out of stock
        </button>
        <button
          v-else
          @click="cart.addItem(product)"
          class="add-cart w-full h-full py-1 px-2 text-sm duration-150 text-white bg-blue-500 hover:bg-[#640e8b]"
        >
          Add to Cart <img src="" alt="" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
