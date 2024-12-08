<script setup>
definePageMeta({
  layout: "adminlayout",
});

const category = useCategoryStore();
</script>

<template>
  <div class="pt-10">
    <button
      v-show="!category.showAddForm"
      @click="category.showAddForm = true"
      type="submit"
      class="px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600 hover:bg-indigo-700 duration-150 mb-6"
    >
      Add New Category
    </button>

    <!-- Category adding form -->
    <form v-if="category.showAddForm" @submit.prevent="category.addCategory()">
      <div class="md:px-20 pt-6 mb-6">
        <div class="bg-white rounded-md p-6 max-w-2xl mx-auto">
          <h1 class="text-center text-2xl font-bold text-gray-500 mb-10">
            Add Category
          </h1>
          <div class="space-y-4">
            <div>
              <label for="title" class="text-lx font-serif">Title:</label>
              <input
                v-model="category.categoryData.name"
                type="text"
                placeholder="Category name"
                id="title"
                class="w-full outline-none py-1 px-2 text-md border-2 rounded-md"
              />
            </div>
            <div>
              <label for="description" class="block mb-2 text-lg font-serif"
                >Description:</label
              >
              <textarea
                v-model="category.categoryData.description"
                id="description"
                cols="30"
                rows="5"
                placeholder="whrite here.."
                class="w-full font-serif p-4 text-gray-600 bg-indigo-50 outline-none rounded-md"
              ></textarea>
            </div>
            <div class="flex">
              <label for="image" class="text-lx font-serif">
                <svg
                  class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  /></svg
              ></label>
              <input
                @change="category.selectFile($event)"
                type="file"
                placeholder="name"
                id="image"
                class="m-2 outline-none py-1 px-2 text-md border-2 rounded-md hidden"
              />
              <img
                v-if="category.previewImage"
                :src="category.previewImage"
                class="w-32 h-32 object-cover m-2 rounded overflow-hidden"
              />
            </div>
            <div class="btn flex justify-between">
              <button
                @click="category.showAddForm = false"
                class="mx-auto block rounded-md text-lg text-red-600 font-bold border px-4 hover:bg-neutral-200 duration-150"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 duration-150"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>

    <!-- Data ShoW -->

    <div
      class="rounded-lg grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 px-4"
    >
      <template v-for="(item, index) in data.categories" :key="index">
        <div
          class="justify-between items-center rounded-lg p-6 shadow-md sm:flex sm:justify-start border dark:bg-[#131313] dark:text-white"
        >
          <p class="text-xl font-semibold mr-4">{{ index + 1 }}</p>
          <img
            :src="apiBase + item.image"
            alt="product-image"
            class="w-full rounded-lg sm:w-32"
          />
          <div
            class="sm:ml-4 sm:flex sm:w-full sm:justify-between items-center"
          >
            <div class="mt-5 sm:mt-0">
              <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                {{ item.name }}
              </h2>
              <p class="mt-1 text-xs text-gray-700 dark:text-white">
                {{ item.description }}
              </p>
            </div>
            <div
              class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6"
            >
              <div class="flex items-center space-x-4">
                <!-- <button class="cursor-pointer duration-150 hover:text-red-500">
                  Edit
                </button> -->

                <button @click="category.deleteCategory(index, item)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
