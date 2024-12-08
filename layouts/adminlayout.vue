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
  <div class="DefaultLayout dark:bg-[#212121] ">
    <div class="header dark:bg-[#212121]">
      <AdminNavbar class="z-50" />
    </div>
    <div class="body mt-[60px] dark:bg-[#212121]">
      <slot class="z-10" />
    </div>
  </div>
</template>
