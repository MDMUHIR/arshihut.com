<script setup>
const category = useCategoryStore();
const product = useProductStore();
onBeforeMount(async () => {
  try {
    // Define an async function to handle the async operations
    const initializeData = async () => {
      // Await the asynchronous calls to ensure they complete
      await category.getCategories();
      await product.getProducts();
    };

    // Call the async function
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
    <div class="body mt-16">
      <div
        v-if="product.toggleFilteredProducts()"
        class="fixed top-0 left-0 right-0 bottom-0 mx-5 mb-5 mt-24 z-40"
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
