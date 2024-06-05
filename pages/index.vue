<script setup>
const auth = useAuthStore();
</script>

<template>
  <h1>App Page</h1>
  {{ auth.user }}
</template>

<style scoped></style>
