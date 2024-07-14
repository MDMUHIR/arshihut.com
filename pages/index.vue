<script setup>
const auth = useAuthStore();

const item = useProductStore();
</script>

<template>
  <!-- {{ auth.user }}

  <pre>{{ item.lastProduct }}</pre> -->
  <div class="welcome-text mt-16 block">
    <h1
      v-if="auth.user"
      class="text-3xl text-center font-bold p-5 bg-orange-400 rounded-b-3xl"
    >
      Welcome {{ auth.user.name }}
    </h1>
  </div>

  <div
    class="banner flex flex-col text-center p-10 m-10 rounded-2xl shadow-2xl bg-cover mt-4 bg-[url('~/public/images/bannerBG.jpg')] bg-no-repeat"
  >
    <h1 class="text-5xl font-extrabold mb-4">
      <span
        class="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-black"
      >
        GREAT DEAL
      </span>
    </h1>
    <div
      v-if="item.lastProduct"
      class="img-details flex justify-between items-center"
    >
      <div class="details w-1/2 flex flex-col items-center">
        <h1 class="text-5xl font-semibold text-white leading-normal">
          {{ item.lastProduct.name }}
        </h1>
        <h1
          v-if="item.lastProduct.category"
          class="text-xl italic font-thin text-gray-300 w-full"
        >
          {{ item.lastProduct.category.name }}
        </h1>
      </div>
      <div class="image w-1/2 md:p-10">
        <nuxt-link :to="`/product/${item.lastProduct.id}`">
          <img
            class="w-full hover:scale-105 duration-150"
            :src="apiBase + item.lastProduct.image"
            alt=""
          />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
