<script setup>
const auth = useAuthStore();

const item = useProductStore();

import "vue3-carousel/dist/carousel.css";
</script>

<template>
  <div class="main pt-2 pb-10 min-h-svh">
    <!-- Banner -->
    <div
      class="banner flex flex-col text-center p-10 m-10 rounded-2xl shadow-lg shadow-black bg-cover bg-center bg-[url('~/public/images/bannerBG.jpg')] bg-no-repeat bg-blend-overlay md:bg-transparent bg-gray-800 bg-opacity-50 md:h-screen relative"
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
          <h1
            v-if="item.lastProduct.category"
            class="text-xl italic font-thin text-gray-300 font-serif w-full"
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
    <!-- Carousel -->
    <div
      class="product-carousel mx-10 py-10 rounded-2xl shadow-inner shadow-black px-1"
    >
      <Carousel
        v-if="data.products != []"
        :wrapAround="true"
        :transition="500"
        :breakpoints="{
          2560: { itemsToShow: 4 }, // For screens 2560px and up
          1024: { itemsToShow: 3 }, // For screens 1024px and up
          768: { itemsToShow: 2 }, // For screens between 768px and 1023px
          640: { itemsToShow: 1 }, // For screens below 768px
        }"
      >
        <Slide v-for="product in data.products" :key="product.id">
          <div class="carousel__item">
            <div
              class="max-w-xs min-w-56 h-80 rounded-lg p-2 pt-3 duration-125"
            >
              <nuxt-link :to="`/products/${product.id}`">
                <img
                  class="rounded-lg h-4/6 object-center cursor-pointer mx-auto hover:scale-110 duration-150"
                  :src="apiBase + product.image"
                  alt="product"
                />
              </nuxt-link>
              <div class="middle flex justify-between">
                <h2
                  class="my-4 pl-4 text-xl font-bold text-gray-500 dark:text-[#e5e5e5] text-center"
                >
                  {{ truncatedHeadingText(product.name) }}
                </h2>
              </div>
            </div>
          </div>
        </Slide>

        <template #addons>
          <Pagination />
          <Navigation
            class="bg-red-500/50 rounded-lg hover:bg-purple-500/50 py-2"
          />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<style scoped></style>
