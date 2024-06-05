<script setup>
const item = useProductStore();

onBeforeMount(() => {
  item.getProducts();
});

const addedToFev = ref(false);
</script>

<template>
  <div class="main pb-12">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-4"
    >
      <div
        class="mx-auto px-5"
        v-for="(product, index) in data.products"
        :key="index"
      >
        <div
          class="max-w-xs min-w-56 h-80 rounded-lg bg-white p-2 pt-3 shadow duration-125 hover:shadow-md hover:bg-neutral-200"
        >
          <img
            class="rounded-lg h-4/6 object-center cursor-pointer mx-auto"
            :src="apiBase + product.image"
            alt="product"
          />

          <div class="middle flex justify-between">
            
              <p class="my-4 pl-4 font-bold text-gray-500">
                {{ product.name }}
              </p>
           
            <button class="w-6">
              <IconsBookmark class="w-full" />
            </button>
          </div>

          <div class="bottom flex justify-between items-center">
            <p class="ml-3 text-sm font-bold text-gray-800">
              ${{ product.price }}
            </p>
            <button
             
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
