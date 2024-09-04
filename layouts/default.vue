<script setup>
const category = useCategoryStore();
const product = useProductStore();
onBeforeMount(async () => {
  try {
    const initializeData = async () => {
      await category.getCategories();
      await product.getProducts();
    };

    await initializeData();
  } catch (error) {
    console.error("Error initializing data:", error);
  }
});
</script>
<template>
  <div class="DefaultLayout">
    <div class="header">
      <Navbar />
    </div>
    <div class="body mt-32 sm:mt-16">
      <div
        v-if="product.toggleFilteredProducts()"
        class="fixed top-0 left-0 right-0 bottom-0 sm:mx-5 mb-1 mt-32 sm:mt-20 sm:10 z-40"
      >
        <ProductsList
          :filteredProducts="product.filteredProducts"
          class="bg-stone-800/60 w-full h-full py-12 rounded-lg"
        />
      </div>
      <slot />
    </div>
  </div>
</template>
