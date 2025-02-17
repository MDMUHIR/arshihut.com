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
    <div class="body mt-24 sm:mt-16">
      <div
        v-if="product.toggleFilteredProducts()"
        class="Filtered-Profducts fixed top-0 left-0 right-0 bottom-0 mt-[7rem] sm:mt-[65px] z-40 bg-stone-800/85 dark:bg-gray-800/95 w-full min-h-svh sm:pt-4 md:pt-2 pb-32  shadow-inner shadow-cyan-500 overflow-y-auto Scrollbar"
      >
        <h2 class="text-cyan-400 bg-black w-36 text-center px-2 border">
          Filtered Products
        </h2>
        <ProductsList :filteredProducts="product.filteredProducts" class=" h-auto" />
      </div>
      <slot />
    </div>
  </div>
</template>
