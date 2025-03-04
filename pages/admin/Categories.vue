<script setup>
  definePageMeta({
    layout: "adminlayout",
  });

  const category = useCategoryStore();

  onBeforeMount(() => {
    category.getCategories();
  });
</script>

<template>
  <div
    class="main Admin-Categories pt-5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 min-h-screen px-4"
  >
    <!-- Add Category Button -->
    <div class="flex justify-between items-center mb-8 px-4">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white">
        Categories Management
      </h1>
      <button
        v-show="!category.showAddForm"
        @click="category.showAddForm = true"
        class="px-6 py-3 rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        Add New Category
      </button>
    </div>

    <!-- Category Form -->
    <form
      v-if="category.showAddForm"
      @submit.prevent="category.addCategory()"
      class="mb-12"
    >
      <div class="max-w-2xl mx-auto">
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl"
        >
          <h2
            class="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8"
          >
            Add New Category
          </h2>
          <div class="space-y-6">
            <!-- Title Input -->
            <div class="space-y-2">
              <label
                for="title"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Category Title</label
              >
              <input
                v-model="category.categoryData.name"
                type="text"
                id="title"
                placeholder="Enter category name"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
              />
            </div>

            <!-- Description Input -->
            <div class="space-y-2">
              <label
                for="description"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Description</label
              >
              <textarea
                v-model="category.categoryData.description"
                id="description"
                rows="4"
                placeholder="Enter category description"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
              ></textarea>
            </div>

            <!-- Image Upload -->
            <div class="space-y-3">
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Category Image</label
              >
              <div class="flex items-center space-x-4">
                <button
                  type="button"
                  @click="() => document.getElementById('image').click()"
                  class="px-4 py-3 rounded-lg border-2 border-purple-500 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/20 transition-all duration-300 flex items-center space-x-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Upload Image</span>
                </button>
                <input
                  @change="category.selectFile($event)"
                  type="file"
                  id="image"
                  class="hidden"
                  accept="image/*"
                />
                <div v-if="category.previewImage" class="relative">
                  <img
                    :src="category.previewImage"
                    class="w-24 h-24 object-cover rounded-lg shadow-md"
                    alt="Category preview"
                  />
                </div>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                @click="category.showAddForm = false"
                class="px-6 py-3 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-6 py-3 rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Save Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>

    <!-- Categories Grid -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8 px-4"
    >
      <div
        v-for="item in data.categories"
        :key="item.id"
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
      >
        <div class="aspect-w-16 aspect-h-9 overflow-hidden">
          <img
            :src="apiBase + item.image"
            :alt="item.name"
            class="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div class="px-4 py-3 flex justify-between items-center">
          <div class="left w-full">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white">
              {{ item.name }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
              {{ item.description }}
            </p>
          </div>
          <div class="right flex items-center justify-center">
            <button
              @click="category.deleteCategory(item.id)"
              class="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 transform hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .aspect-w-16 {
    position: relative;
    padding-bottom: 56.25%;
  }

  .aspect-w-16 > * {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
