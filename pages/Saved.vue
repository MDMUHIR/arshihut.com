<script setup>
const saved = useSavedStore();
const cart = useCartStore();

onBeforeMount(() => {
  saved.fetchSavedItems();
});
</script>

<template>
  <pre>{{ data.savedProducts }}</pre>
  <div class="main py-12 min-h-svh bg-stone-100">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-4"
    >
      <div
        class="mx-auto px-5"
        v-for="(product, index) in data.savedProducts"
        :key="index"
      >
        <div
          class="max-w-xs min-w-56 h-80 rounded-lg bg-white p-2 pt-3 shadow duration-125 hover:shadow-md hover:bg-neutral-200"
        >
          <nuxt-link :to="`/product/${product.product_id}`">
            <img
              class="rounded-lg h-4/6 object-center cursor-pointer mx-auto"
              :src="apiBase + product.product.image"
              alt="product"
            />
          </nuxt-link>
          <div class="middle flex justify-between">
            <nuxt-link :to="`/product/${product.producy_id}`">
              <p class="my-4 pl-4 font-bold text-gray-500">
                {{ product.product.name }}
              </p>
            </nuxt-link>
            <button @click="saved.toggleSavedItem(product)" class="w-6">
              <IconsBookmark class="w-full" />
            </button>
          </div>

          <div class="bottom flex justify-between items-center">
            <p class="ml-3 text-sm font-bold text-gray-800">
              ${{ product.product.price }}
            </p>
            <button
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
