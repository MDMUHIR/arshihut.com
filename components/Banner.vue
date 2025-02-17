<script setup>
  const auth = useAuthStore();
  const item = useProductStore();
</script>

<template>
  <div
    class="banner flex flex-col text-center sm:px-10 py-4 sm:mx-10 mt-10 mb-1 rounded-2xl shadow-lg shadow-black bg-cover bg-center bg-[url('/images/bannerBG.jpg')] bg-no-repeat relative"
  >
    <h1
      class="md:text-4xl text-2xl font-extrabold absolute top-5 left-0 right-0 px-4"
    >
      <span
        class="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-white bg-opacity-75"
      >
        GREAT DEAL
      </span>
    </h1>

    <div
      v-if="item.lastProduct"
      class="img-details flex flex-col-reverse md:flex-row justify-between items-center mt-10"
    >
      <!-- details-part -->
      <div class="details md:w-1/2 flex flex-col items-center">
        <h1
          class="text-xl md:text-2xl font-bold font-mono text-white leading-normal"
        >
          {{ item.lastProduct.name }}
        </h1>
        <h1
          v-if="item.lastProduct.category"
          class="text-xl italic font-thin text-gray-300 font-serif w-full mt-10"
        >
          {{ item.lastProduct.category.name }}
        </h1>
      </div>
      <!-- image -->
      <div class="image md:w-1/2 rounded-lg overflow-hidden">
        <nuxt-link :to="`/products/${item.lastProduct.id}`">
          <img
            class="w-auto max-h-[13rem] sm:max-h-[15rem] hover:scale-105 duration-150 mx-auto"
            :src="apiBase + item.lastProduct.image"
            alt="Product Image"
          />
        </nuxt-link>
      </div>
    </div>
    <div
      v-else
      class="img-details flex flex-col-reverse md:flex-row justify-between items-center md:my-auto"
    >
      <!-- Skeleton Loader -->
      <div class="details md:w-1/2 flex flex-col items-center space-y-4">
        <div class="h-8 w-3/4 bg-gray-300 animate-pulse"></div>
        <div class="h-6 w-1/2 bg-gray-300 animate-pulse"></div>
      </div>
      <div
        class="image w-full md:w-1/2 inline-block rounded-lg overflow-hidden"
      >
        <div class="h-64 bg-gray-300 animate-pulse"></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
