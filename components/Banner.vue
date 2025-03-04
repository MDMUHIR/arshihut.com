<script setup>
  import { Swiper, SwiperSlide } from "swiper/vue";
  import { Pagination, Autoplay } from "swiper/modules";
  import "swiper/css";
  import "swiper/css/pagination";
  import "swiper/css/autoplay";

  const modules = [Pagination, Autoplay];

  const slides = [
    { id: 1, image: "/images/banner/Slider1.png", title: "Slide 1" },
    { id: 2, image: "/images/banner/Slider2.png", title: "Slide 2" },
  ];
</script>

<template>
  <div
    class="w-full max-w-screen-2xl mx-auto px-2 sm:px-4 lg:px-6 my-4 sm:my-6"
  >
    <div class="relative overflow-hidden rounded-lg shadow-lg">
      <swiper
        :modules="modules"
        :pagination="{
          dynamicBullets: true,
          clickable: true,
        }"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
        }"
        :loop="true"
        class="w-full"
      >
        <swiper-slide v-for="slide in slides" :key="slide.id">
          <div class="relative w-full h-full object-contain flex">
            <img
              :src="slide.image"
              :alt="slide.title"
              class="w-full h-full object-conatin object-center"
            />
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
