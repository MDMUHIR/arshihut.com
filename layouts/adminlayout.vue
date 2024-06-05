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
      <AdminNavbar />
    </div>
    <div class="body mt-24">
      <slot />
    </div>
  </div>
</template>
