<script setup>
const category = useCategoryStore();
const product = useProductStore();
const coupon = useCouponStore();

onBeforeMount(() => {
  category.getCategories();
  product.getProducts();
  coupon.fetchCoupons();
});
</script>
<template>
  <div class="DefaultLayout">
    <div class="header dark:bg-[#212121]">
      <AdminNavbar class="z-50" />
    </div>
    <div class="body mt-22 pt-5 min-h-svh dark:bg-[#212121]">
      <slot class="z-10" />
    </div>
  </div>
</template>
