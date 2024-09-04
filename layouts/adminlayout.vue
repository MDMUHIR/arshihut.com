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
    <div class="header ">
      <AdminNavbar class="z-50"/>
    </div>
    <div class="body mt-24 ">
      <slot class="z-10"/>
    </div>
  </div>
</template>
