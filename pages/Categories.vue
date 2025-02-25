<script setup>
  const category = useCategoryStore();
  const product = useProductStore();
</script>

<template>
  <div class="main mt-20 mx-2">
    <div
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-1"
    >
      <template v-for="(item, index) in data.categories" :key="index">
        <!-- Card -->
        <div
          @click="product.getProducts(item.id)"
          class="relative flex flex-col text-gray-700 bg-white border bg-clip-border rounded-xl w-full sm:min-w-[5rem] sm:max-w-[10rem] overflow-hidden hover:shadow-lg cursor-pointer duration-200"
        >
          <!-- Image Container -->
          <div
            class="overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-[8rem] sm:h-[10rem] flex items-center justify-center relative"
          >
            <img
              :src="apiBase + item.image"
              alt="product"
              class="object-cover w-full h-full"
            />

            <p
              class="bg-white w-5 h-5 rounded-full text-center absolute top-1 left-1 leading-5 shadow-md shadow-black"
            >
              {{ index + 1 }}
            </p>
          </div>

          <!-- Card Content -->
          <div class="px-5 my-2">
            <p
              class="text-sm sm:text-base antialiased font-medium text-blue-gray-900 truncate"
            >
              {{ item.name }}
            </p>
            <p class="mt-1 text-xs text-gray-700">{{ item.description }}</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
