<script setup>
  const auth = useAuthStore();
  const item = useProductStore();
  import "vue3-carousel/dist/carousel.css";
  import Slider from "~/components/reusable/Slider.vue";
</script>

<template>
  <div class="main mx-3 pt-2 min-h-svh mb-5">
    <!-- Banner -->

    <Banner />

    <!-- Category Section-->
    <div class="category container mx-auto py-1">
      <h1
        class="text-xl md:text-2xl text-[#0F1111] font-semibold ml-2 mb-1 sm:ml-0"
      >
        Browse by Categories
      </h1>

      <Slider
        :sliderItems="data.categories"
        type="category"
        customStyles=""
        imgStyle="w-auto max-h-28"
        class="py-2"
      />
    </div>

    <!-- Carousel -->
    <div class="Product-slider container mx-auto mt-3">
      <h1
        class="text-xl md:text-2xl text-[#0F1111] font-semibold ml-2 mb-1 sm:ml-0"
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

    <!-- <MDMUHIR class="mt-10" /> -->
  </div>
</template>

<style scoped></style>
