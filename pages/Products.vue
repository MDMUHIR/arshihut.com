<script setup></script>

<template>
  <div class="main py-12 min-h-svh xl:container xl:mx-auto">
    <!-- <pre>{{ auth.getUserToken() }}</pre> -->
    <ProductsList :filteredProducts="data.products" />
  </div>
</template>

<style scoped></style>
