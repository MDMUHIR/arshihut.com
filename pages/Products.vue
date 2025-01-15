<script setup></script>

<template>
  <div class="main py-5 min-h-svh bg-stone-100 dark:bg-[#212121] xl:container xl:mx-auto">
    <!-- <pre>{{ auth.getUserToken() }}</pre> -->
    <ProductsList :filteredProducts="data.products"  />
  </div>
</template>

<style scoped></style>
