<script setup>
const category = useCategoryStore();
const product = useProductStore();
onBeforeMount(() => {
  category.getCategories();
  product.getProducts();
});
</script>
<template>
  <div class="DefaultLayout">
    <div class="header">
      <Navbar />
    </div>
    <div class="body mt-16">
      <slot />
    </div>
  </div>
</template>
