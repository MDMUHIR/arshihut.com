<script setup>
  const cart = useCartStore();
</script>

<template>
  <div class="flex items-center justify-center mb-1 md:mb-0">
    <div
      class="relative scale-75 inline mx-2 font-medium before:bg-orange-600 before:absolute before:-bottom-1 before:left-[2px] before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 p-0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        class="w-8 h-8 text-white"
      >
        <g fill="currentColor">
          <path
            d="m224 64l-12.16 66.86A16 16 0 0 1 196.1 144H70.55L56 64Z"
            opacity=".2"
          />
          <path
            d="M230.14 58.87A8 8 0 0 0 224 56H62.68L56.6 22.57A8 8 0 0 0 48.73 16H24a8 8 0 0 0 0 16h18l25.56 140.29a24 24 0 0 0 5.33 11.27a28 28 0 1 0 44.4 8.44h45.42a27.75 27.75 0 0 0-2.71 12a28 28 0 1 0 28-28H91.17a8 8 0 0 1-7.87-6.57L80.13 152h116a24 24 0 0 0 23.61-19.71l12.16-66.86a8 8 0 0 0-1.76-6.56M104 204a12 12 0 1 1-12-12a12 12 0 0 1 12 12m96 0a12 12 0 1 1-12-12a12 12 0 0 1 12 12m4-74.57a8 8 0 0 1-7.9 6.57H77.22L65.59 72h148.82Z"
          />
        </g>
      </svg>
      <ClientOnly>
        <span
          class="absolute -top-2 left-4 rounded-full bg-red-500 p-0.5 px-2 text-sm text-red-50 animate-bounce"
          >{{ cart.totalCartItems }}</span
        >
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped></style>
