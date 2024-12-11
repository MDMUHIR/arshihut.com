<script setup>
import "vue3-carousel/dist/carousel.css";
const props = defineProps({
  sliderItems: {
    type: Array,
    required: true,
  },
  customStyles: {
    type: String,
    default: "",
  },
  imgStyle: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
});

const productStore = useProductStore();

const brPoints = () => {
  if (props.type == "category") {
    return {
      2560: { itemsToShow: 6, snapAlign: "start" }, // For screens 2560px and up
      1024: { itemsToShow: 5, snapAlign: "start" }, // For screens 1024px and up
      768: { itemsToShow: 4, snapAlign: "start" }, // For screens between 768px and 1023px
      640: { itemsToShow: 3, snapAlign: "start" }, // For screens below 768px
    };
  } else {
    return {
      2560: { itemsToShow: 4, snapAlign: "center" }, // For screens 2560px and up
      1024: { itemsToShow: 3, snapAlign: "center" }, // For screens 1024px and up
      768: { itemsToShow: 2, snapAlign: "center" }, // For screens between 768px and 1023px
      640: { itemsToShow: 1, snapAlign: "center" }, // For screens below 768px
    };
  }
};

// Carousel configuration
const config = {
  itemsToShow: 1,
  snapAlign: "center",

  // 'breakpointMode' determines how the carousel breakpoints are calculated
  // Acceptable values: 'viewport' (default) | 'carousel'
  // 'viewport' - breakpoints are based on the viewport width
  // 'carousel' - breakpoints are based on the carousel width
  breakpointMode: "carousel",

  // Breakpoints are mobile-first
  // Any settings not specified will fall back to the carousel's default settings
  breakpoints: {
    // 300px and up
    300: {
      itemsToShow: 2,
      snapAlign: "center",
    },
    // 400px and up
    400: {
      itemsToShow: 3,
      snapAlign: "start",
    },
    // 500px and up
    500: {
      itemsToShow: 4,
      snapAlign: "start",
    },
  },
};
</script>

<template>
  <div :class="customStyles" class="product-carousel px-1">
    <Carousel
      v-if="data.products.length != 0"
      :wrapAround="false"
      :transition="50"
      :breakpointMode="carousel"
      :breakpoints="brPoints()"
      :snapAlign="start"
    >
      <Slide v-for="product in sliderItems" :key="product.id">
        <div class="carousel__item h-full">
          <div
            class="max-w-xs min-w-56 h-full rounded-lg p-2 pt-3 duration-125 flex flex-col justify-center items-center"
          >
            <div
              class="ClickOpertor"
              v-if="type == 'category'"
              @click="productStore.getProducts(product.id)"
            >
              <img
                :class="imgStyle"
                class="rounded-lg cursor-pointer mx-auto hover:scale-105 duration-150"
                :src="apiBase + product.image"
                alt="product"
              />
            </div>

            <div class="ClickOpertor" v-if="type == 'product'">
              <nuxt-link :to="`/products/${product.id}`">
                <img
                  :class="imgStyle"
                  class="rounded-lg cursor-pointer mx-auto hover:scale-105 duration-150"
                  :src="apiBase + product.image"
                  alt="product"
                />
              </nuxt-link>
            </div>
            <div class="flex items-center justify-center">
              <h2
                class="text-xl font-bold text-gray-500 dark:text-[#e5e5e5] text-center"
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
          class="bg-gray-500 dark:bg-gray-100 rounded-lg hover:bg-purple-500 py-2"
        />
      </template>
    </Carousel>
  </div>
</template>
