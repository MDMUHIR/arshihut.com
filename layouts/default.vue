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

    <!-- Fltered products show -->
    <div class="body mt-[70px] md:container mx-auto">
      <div
        v-if="product.toggleFilteredProducts()"
        class="Filtered-Profducts fixed top-[70px] left-0 right-0 bottom-0 z-40 bg-stone-300/[95%] w-full min-h-vh 2 py-20 shadow-lg shadow-red-500 rounded-xl overflow-y-auto Scrollbar"
      >
        <div
          class="heading-tab flex items-center bg-white mx-3 md:container md:mx-auto rounded-lg mb-10 fixed top-20 left-0 right-0"
        >
          <h2
            class="font-serif text-center w-full text-sm md:text-xl antialiased text-blue-gray-900"
          >
            Filtered Products
          </h2>
          <!-- for searching component -->
          <button
            v-if="product.toggleFilteredProducts()"
            @click="product.filteredProducts.length = 0"
            class="text-red-500 flex justify-center items-center mr-2 border pr-3 my-1 hover:scale-105 duration-200 shadow-inner shadow-black antialiased"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="h-8 w-10 cursor-pointer duration-150"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Close
          </button>
        </div>

        <!-- Body Content -->
        <div class="mx-3 md:container md:mx-auto">
          <ProductsList
            :listProducts="product.filteredProducts"
            class="h-auto"
          />
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>
