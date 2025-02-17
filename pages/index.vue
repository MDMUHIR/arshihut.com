<script setup>
  const auth = useAuthStore();

  const item = useProductStore();

  import "vue3-carousel/dist/carousel.css";
  import Slider from "~/components/reusable/Slider.vue";
</script>

<template>
  <div class="main mx-3 pt-2 pb-10 min-h-svh">
    <!-- Banner -->

    <Banner />

    <!-- Category Section-->
    <div class="category container mx-auto py-1">
      <h1 class="text-2xl md:text-3xl font-bold dark:text-white ml-2 sm:ml-0">
        Browse by Categories
      </h1>

      <Slider
        :sliderItems="data.categories"
        type="category"
        customStyles=""
        imgStyle="w-auto max-h-28"
        class="my-5 py-5"
      />
    </div>

    <!-- Carousel -->
    <div class="Product-slider container mx-auto py-1">
      <h1
        class="text-2xl md:text-3xl font-bold dark:text-white ml-2 sm:ml-0 mb-5"
      >
        Hot Items
      </h1>
      <Slider
        :sliderItems="data.products"
        type="product"
        customStyles=" py-7 rounded-2xl shadow-inner shadow-black"
        imgStyle="w-full h-auto bg-[#212121] mb-1"
      />
    </div>

    <MDMUHIR />
  </div>
</template>

<style scoped></style>
