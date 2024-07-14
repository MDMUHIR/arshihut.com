<script setup>
const cart = useCartStore();

const saved = useSavedStore();

// Define props
const props = defineProps({
  filteredProducts: {
    type: Array,
    required: true,
  },
});

// console.log(props.filteredProducts.length);
</script>

<template>
  <div class="main relative overflow-y-auto ">
    <button
      @click="filteredProducts.length = 0"
      class="top-24 left-4 fixed bg-white hover:bg-red-500 ml-1 px-2 rounded-tl-lg hover:text-white text-red-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="4"
        stroke="currentColor"
        class="h-9 w-10 cursor-pointer duration-150 "
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
        class="mx-auto px-5"
        v-for="(product, index) in filteredProducts"
        :key="index"
      >
        <div
          class="max-w-xs min-w-48 h-80 rounded-lg bg-white p-2 pt-3 shadow duration-125 hover:shadow-md hover:bg-neutral-200"
        >
          <nuxt-link :to="`/product/${product.id}`">
            <img
              class="rounded-lg h-4/6 object-center cursor-pointer mx-auto"
              :src="apiBase + product.image"
              alt="product"
            />
          </nuxt-link>
          <div class="middle flex justify-between">
            <nuxt-link :to="`/product/${product.id}`">
              <p class="my-4 pl-4 font-bold text-gray-500">
                {{ product.name }}
              </p>
            </nuxt-link>
            <button @click="saved.toggleSavedItem(product)" class="w-6">
              <IconsBookmark class="w-full" />
            </button>
          </div>

          <div class="bottom flex justify-between items-center">
            <p class="ml-3 text-sm font-bold text-gray-800">
              ${{ product.price }}
            </p>
            <button
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
