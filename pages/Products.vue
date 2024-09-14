<script setup>
const auth = useAuthStore();
</script>

<template>
  <div class="main py-12 min-h-svh bg-stone-100 dark:bg-[#212121]">
    <!-- <pre>{{ auth.getUserToken() }}</pre> -->
    <ProductsList :filteredProducts="data.products" />
  </div>
</template>

<style scoped></style>
