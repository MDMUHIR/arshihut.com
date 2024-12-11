<script setup>
const productStore = useProductStore();
const props = defineProps({
  filteredProducts: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-7 mt-6"
  >
    <div
      class="mx-auto px-5"
      v-for="(product, index) in filteredProducts"
      :key="index"
    >
      <div
        class="max-w-xs min-w-56 h-80 rounded-lg bg-white px-2 pt-3 shadow-sm shadow-black duration-125 hover:shadow-md hover:bg-neutral-200"
      >
        <nuxt-link :to="`/products/${product.id}`">
          <img
            class="rounded-lg h-4/6 object-center cursor-pointer mx-auto"
            :src="apiBase + 'public/' + product.image"
            alt="product"
          />
        </nuxt-link>
        <div class="middle flex justify-between">
          <p class="my-4 pl-4 font-bold text-gray-500">
            {{ truncatedHeadingText(product.name) }}
          </p>
        </div>

        <div class="bottom flex justify-between items-center">
          <!-- edit button -->
          <button
            @click="productStore.editSelection(product)"
            class="add-cart py-1 px-2 text-sm font-semibold bg-stone-500 hover:bg-stone-600 text-white border border-black rounded"
          >
            Edit
          </button>
          <!-- del button -->
          <button
            @click="productStore.deleteProduct(index, product)"
            class="add-cart py-1 px-2 text-sm font-semibold bg-red-500 hover:bg-red-600 text-white border border-black rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
