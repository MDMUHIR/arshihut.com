<script setup>
const auth = useAuthStore();

const item = useProductStore();

import "vue3-carousel/dist/carousel.css";
import Slider from "~/components/reusable/Slider.vue";
</script>

<template>
  <div class="main pt-2 pb-10 min-h-svh">
    <!-- Banner -->

    <div
      class="banner container flex flex-col text-center  py-10 m-10 rounded-2xl shadow-lg shadow-black bg-cover bg-center bg-[url('~/public/images/bannerBG.jpg')] bg-no-repeat bg-blend-overlay md:bg-transparent bg-gray-800 bg-opacity-50 md:h-screen relative"
    >
      <h1 class="md:text-5xl font-extrabold mb-4 absolute top-5 left-0 right-0">
        <span
          class="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-white"
        >
          GREAT DEAL
        </span>
      </h1>

      <div
        v-if="item.lastProduct"
        class="img-details flex flex-col-reverse md:flex-row justify-between items-center md:my-auto"
      >
        <!-- details-part -->
        <div class="details md:w-1/2 flex flex-col items-center">
          <h1
            class="text-xl md:text-5xl font-bold font-mono text-white leading-normal"
          >
            {{ item.lastProduct.name }}
          </h1>
          <!-- <h1
            class="text-xl md:text-5xl font-bold font-mono text-white leading-normal"
          >
            {{ item.lastProduct.price }}
          </h1> -->
          <h1
            v-if="item.lastProduct.category"
            class="text-xl italic font-thin text-gray-300 font-serif w-full mt-10"
          >
            {{ item.lastProduct.category.name }}
          </h1>
        </div>
        <!-- image -->
        <div class="image w-full md:w-1/2 md:p-10 inline-block rounded-lg">
          <nuxt-link :to="`/products/${item.lastProduct.id}`">
            <img
              class="w-full hover:scale-105 duration-150"
              :src="apiBase + item.lastProduct.image"
              alt=""
            />
          </nuxt-link>
        </div>
      </div>
    </div>

    <!-- Category Section-->
    <div class="category container sm:mx-10 py-12">
      <h1 class=" text-xl sm:text-3xl font-bold dark:text-white">Browse by Categories</h1>

      <Slider
        :sliderItems="data.categories"
        type="category"
        customStyles=""
        imgStyle="w-auto max-h-28"
        class="my-5 py-5"
      />
    </div>

    <!-- Carousel -->
    <div class="Product-slider container sm:mx-10 py-12">
      <h1 class=" text-xl  sm:text-3xl font-bold dark:text-white mb-5">Hot Items</h1>
      <Slider
        :sliderItems="data.products"
        type="product"
        customStyles=" py-10 rounded-2xl shadow-inner shadow-black"
        imgStyle="w-full h-auto bg-[#344940]"
      />
    </div>

    <MDMUHIR />
  </div>
</template>

<style scoped></style>
