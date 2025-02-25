<script setup>
  const auth = useAuthStore();
  const item = useProductStore();
  import "vue3-carousel/dist/carousel.css";
  import Slider from "~/components/reusable/Slider.vue";
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

      <div class="main flex">
        <div
          v-for="(category, index) in data.categories"
          :key="index"
          class="swiper-slide w-24 swiper-slide-next mx-[16px] bg-gray-200 rounded-2xl overflow-hidden shadow-md shadow-black"
        >
          <div
            @click="item.getProducts(category.id)"
            class="w-full rounded-2xl shadow-xs group hover:text-[#ff8b48] cursor-pointer"
          >
            <img
              class="w-full max-h-[100px] block"
              :src="apiBase + category.image"
              alt="category"
            /><span
              class="text-sm sm:text-md font-medium capitalize text-center py-2 px-2 overflow-hidden whitespace-nowrap text-ellipsis block group-hover:text-primary"
              >{{ category.name }}</span
            >
          </div>
          <!---->
        </div>
      </div>
    </div>

    <!-- Carousel
    <div class="Product-slider">
      <h1
        class="text-xl md:text-2xl text-[#0F1111] font-semibold md:font-bold ml-2 mb-1 sm:ml-0"
      >
        Hot Items
      </h1>
      <Slider
        :sliderItems="data.products"
        type="product"
        customStyles=" py-7 rounded-2xl shadow-inner shadow-black"
        cardProps="flex-col"
        imgStyle="w-full max-h-[150px] bg-[#212121] mb-1"
      />
    </div> -->

    <div class="Hot Items mt-8">
      <h1
        class="text-xl md:text-2xl text-[#0F1111] font-semibold md:font-bold ml-2 mb-2 sm:ml-0"
      >
        Hot Items
      </h1>
      <ProductsList :filteredProducts="data.products" />
    </div>
  </div>
</template>

<style scoped></style>
