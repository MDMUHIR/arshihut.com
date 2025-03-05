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
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 p-4"
  >
    <div
      v-for="(product, index) in filteredProducts"
      :key="index"
      class="w-full"
    >
      <div
        class="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
      >
        <div class="relative aspect-square overflow-hidden">
          <img
            class="w-full h-full object-cover transition-transform duration-300 hover:scale-105 z-10"
            :src="apiBase + product.image"
            :alt="product.name"
          />
        </div>

        <div class="p-4 space-y-4">
          <h3 class="text-lg font-semibold text-gray-800 truncate">
            {{ truncatedHeadingText(product.name) }}
          </h3>

          <div class="flex flex-col space-y-2">
            <div class="flex justify-between gap-2">
              <button
                @click="productStore.editSelection(product)"
                class="flex-1 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors duration-300"
              >
                Edit
              </button>
              <button
                @click="productStore.deleteProduct(index, product)"
                class="flex-1 py-2 px-4 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors duration-300"
              >
                Delete
              </button>
            </div>
            <nuxt-link
              :to="`/products/${product.id}`"
              class="block w-full text-center py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors duration-300"
            >
              View Details
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .aspect-square {
    aspect-ratio: 1 / 1;
  }
</style>
