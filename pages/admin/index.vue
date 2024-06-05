<script setup>
definePageMeta({
  layout: "adminlayout",

  middleware: ["auth"],
  requiresAuth: true,
  type: "admin",
});


</script>

<template>
  <h1 class="text-3xl text-red-400">Admin page</h1>
  <pre>{{ apiBase }}</pre>
  <pre>{{ data.categories }}</pre>
</template>

<style scoped></style>
