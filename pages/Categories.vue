<script setup>
const category = useCategoryStore();
const product = useProductStore();
</script>

<template>
  <div class="main py-2 min-h-svh bg-stone-100">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-10 rounded-lg border-2"
    >
      <template v-for="(item, index) in data.categories" :key="index">
        <div
          @click="product.getProducts(item.id)"
          class="items-center justify-center rounded-lg p-3 shadow-md flex border relative bg-white hover:bg-amber-100 hover:scale-105 duration-150 cursor-pointer"
        >
          <p
            class="text-xl font-semibold mr-4 absolute top-50 left-4 bg-white px-1 outline-1 text-center border rounded-full border-black shadow-md"
          >
            {{ index + 1 }}
          </p>
          <div class="flex flex-col sm:flex-row">
            <img
              :src="apiBase + item.image"
              alt="product-image"
              class="rounded-lg w-28"
            />
            <div class="ml-2 sm:ml-4 sm:flex sm:justify-between items-center">
              <div class="mt-5 sm:mt-0">
                <h2 class="text-lg font-bold text-gray-900">
                  {{ item.name }}
                </h2>
                <p class="mt-1 text-xs text-gray-700">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
  <!-- <div
    v-if="product.toggleFilteredProducts()"
    class="fixed top-0 left-0 right-0 m-16 mt-28"
  >
    <ProductsList
      :filteredProducts="product.filteredProducts"
      class="bg-stone-800/50 w-full py-12 rounded"
    />
  </div> -->
</template>
