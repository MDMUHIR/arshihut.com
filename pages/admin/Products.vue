<script setup>
definePageMeta({
  layout: "adminlayout",
});

const productStore = useProductStore();
</script>

<template>
  <div class="main Admin-Products py-7">
    <!--Add product Button and input -->
    <div class="top-bar flex flex-col md:flex-row justify-between px-4 pt-2">
      <!-- AddForm Toggler Button -->
      <button
        v-if="!productStore.showAddForm && !productStore.showUpdateForm"
        @click="productStore.showAddForm = true"
        type="submit"
        class="px-6 py-2 block rounded-md text-lg font-semibold text-indigo-100 bg-purple-600 hover:bg-purple-700 duration-150"
      >
        Add New Product
      </button>
      <form
        @submit.prevent="productStore.getAdminFilteredProducts()"
        class="search-bar bg-white flex items-center rounded-lg overflow-hidden p-1 text-black border-2 border-purple-600"
      >
        <input
          v-model="productStore.searchProduct"
          type="text "
          class="px-2 w-full rounded outline-none text-sm"
          placeholder="Search for user"
        />
        <button class="border-l-2 px-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 50 50"
          >
            <path
              d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"
            ></path>
          </svg>
        </button>
      </form>
    </div>

    <!-- Add product Form -->
    <div
      v-if="productStore.showAddForm || productStore.showUpdateForm"
      class="bg-stone-500/50 p-2 border shadow-2xl m-3 mt-6 flex items-center justify-center h-5/6 fixed top-16 -left-4 -right-4"
    >
      <form
        @submit.prevent="productStore.formSubmition()"
        class="bg-white w-full h-full scroll-m-1 overflow-scroll m-10 rounded-lg border shadow-2xl"
      >
        <div class="md:px-20 p-6">
          <div class="rounded-md w-full mx-auto px-2">
            <h1
              v-if="productStore.showAddForm"
              class="text-center text-2xl font-bold text-gray-500 mb-10"
            >
              Add Product
            </h1>
            <h1
              v-else
              class="text-center text-2xl font-bold text-gray-500 mb-10"
            >
              Edit Product
            </h1>
            <div class="space-y-4">
              <div>
                <label for="title" class="text-lx font-serif">Title:</label>
                <input
                  v-model="productStore.productData.name"
                  type="text"
                  placeholder="Product name"
                  id="title"
                  class="w-full outline-none py-1 px-2 text-md border-2 rounded-md"
                />
              </div>
              <div>
                <label for="description" class="block mb-2 text-lg font-serif"
                  >Description:</label
                >
                <textarea
                  v-model="productStore.productData.description"
                  id="description"
                  cols="36"
                  rows="3"
                  placeholder="whrite here.."
                  class="w-full font-serif p-4 text-gray-600 bg-indigo-50 outline-none rounded-md"
                ></textarea>
              </div>
              <div class="flex items-center">
                <label for="price" class="text-lx font-serif mr-4"
                  >Price:</label
                >
                <input
                  v-model="productStore.productData.price"
                  type="text"
                  placeholder="Enter Price"
                  id="price"
                  class="w-1/2 outline-none py-1 px-2 text-md border-2 rounded-md"
                />
              </div>
              <div class="flex items-center">
                <label for="stock" class="text-lx font-serif mr-4"
                  >Stock:</label
                >
                <input
                  v-model="productStore.productData.stock"
                  type="text"
                  placeholder="Total in Stock"
                  id="stock"
                  class="w-1/2 outline-none py-1 px-2 text-md border-2 rounded-md"
                />
              </div>

              <div>
                <label class="text-lx font-serif">Category:</label>
                <select
                  v-model="productStore.productData.category_id"
                  class="w-1/2 ml-4 outline-none py-1 px-2 text-md border-2 rounded-md text-black"
                >
                  <option
                    v-for="(productStore, index) in data.categories"
                    :key="index"
                    :value="productStore.id"
                  >
                    {{ productStore.name }}
                  </option>
                </select>
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
                  @change="productStore.selectFile($event)"
                  type="file"
                  placeholder="name"
                  id="image"
                  class="m-2 outline-none py-1 px-2 text-md border-2 rounded-md hidden"
                />
                <img
                  v-if="productStore.previewImage"
                  :src="productStore.previewImage"
                  class="w-32 h-32 object-cover m-2 rounded overflow-hidden"
                />
              </div>
              <div class="btn flex justify-between">
                <button
                  @click="productStore.clearSubmition()"
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
    </div>

    <!-- Product showcase -->

    <AdminProductList
      :filteredProducts="productStore.getAdminFilteredProducts()"
    />
  </div>
</template>

<style scoped></style>
