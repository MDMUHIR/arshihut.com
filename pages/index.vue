<script setup>
  const auth = useAuthStore();
  const item = useProductStore();
  // import "vue3-carousel/dist/carousel.css";
  import Slider from "~/components/reusable/Slider.vue";
  const cetegoryStore = useCategoryStore();

  onBeforeMount(() => {
    if (auth.user) {
      item.getProducts();
    }
  });
</script>

<template>
  <div class="main mx-3 md:container md:mx-auto min-h-svh mb-5 pt-[20px]">
    <!-- Banner -->
    <div class="Banner mt-2">
      <Banner />
    </div>

    <!-- Category Section-->
    <div class="category py-1 mt-4">
      <h1
        class="text-xl md:text-2xl text-[#0F1111] font-semibold md:font-bold ml-2 sm:ml-0 mb-2"
      >
        Browse by Categories
      </h1>

      <div class="flex flex-wrap pb-4 gap-4">
        <!-- Skeleton loader -->
        <template v-if="cetegoryStore.loadingCategory">
          <div
            v-for="n in 6"
            :key="n"
            class="flex-shrink-0 w-[120px] bg-gray-200 rounded-2xl overflow-hidden shadow-md animate-pulse"
          >
            <div class="w-full rounded-2xl shadow-xs">
              <div class="w-full h-[100px] bg-gray-300"></div>
              <div class="h-8 bg-gray-300 m-2 rounded"></div>
            </div>
          </div>
        </template>

        <!-- Actual category -->
        <div
          v-else
          v-for="(category, index) in data.categories"
          :key="index"
          class="flex-shrink-0 w-[120px] bg-gray-200 rounded-2xl overflow-hidden shadow-md shadow-[#979797] "
        >
          <div
            @click="item.getProducts(category.id)"
            class="w-full rounded-2xl shadow-xs group hover:text-[#ea4b3a] cursor-pointer"
          >
            <img
              class="w-full h-[100px] object-cover block"
              :src="apiBase + category.image"
              alt="category"
            />
            <span
              class="text-sm font-medium capitalize text-center py-2 px-2 overflow-hidden whitespace-nowrap text-ellipsis block group-hover:text-primary"
            >
              {{ category.name }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Hot items -->
    <div class="Hot Items mt-8">
      <h1
        class="text-xl md:text-2xl text-[#0F1111] font-semibold md:font-bold ml-2 mb-2 sm:ml-0"
      >
        Hot Items
      </h1>
      <ProductsList :listProducts="data.products" />
    </div>
  </div>
</template>

<style scoped>
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
