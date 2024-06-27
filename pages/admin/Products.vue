<script setup>
definePageMeta({
  layout: "adminlayout",
});

const item = useProductStore();
</script>

<template>
  <div class="main mt-20">
    <!-- AddForm Toggler Button -->
    <button
      v-if="!item.showAddForm && !item.showUpdateForm"
      @click="item.showAddForm = true"
      type="submit"
      class="px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-purple-600 hover:bg-purple-700 duration-150 mb-6 mt-28"
    >
      Add New Product
    </button>
    <!-- ///// -->
    <div
      v-if="item.showAddForm || item.showUpdateForm"
      class="bg-stone-500/75 rounded-lg border shadow-2xl m-3 flex items-center justify-center h-5/6 fixed top-22 left-0 right-0"
    >
      <form
        @submit.prevent="item.formSubmition()"
        class="bg-white w-full h-full scroll-m-1 overflow-scroll m-10 rounded-lg border shadow-2xl"
      >
        <div class="md:px-20 p-6">
          <div class="rounded-md w-full mx-auto px-2">
            <h1 class="text-center text-2xl font-bold text-gray-500 mb-10">
              Add Product
            </h1>
            <div class="space-y-4">
              <div>
                <label for="title" class="text-lx font-serif">Title:</label>
                <input
                  v-model="item.productData.name"
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
                  v-model="item.productData.description"
                  id="description"
                  cols="30"
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
                  v-model="item.productData.price"
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
                  v-model="item.productData.stock"
                  type="text"
                  placeholder="Total in Stock"
                  id="stock"
                  class="w-1/2 outline-none py-1 px-2 text-md border-2 rounded-md"
                />
              </div>

              <div>
                <label class="text-lx font-serif">Category:</label>
                <select
                  v-model="item.productData.category_id"
                  class="w-1/2 ml-4 outline-none py-1 px-2 text-md border-2 rounded-md text-black"
                >
                  <option
                    v-for="(item, index) in data.categories"
                    :key="index"
                    :value="item.id"
                  >
                    {{ item.name }}
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
                  @change="item.selectFile($event)"
                  type="file"
                  placeholder="name"
                  id="image"
                  class="m-2 outline-none py-1 px-2 text-md border-2 rounded-md hidden"
                />
                <img
                  v-if="item.previewImage"
                  :src="item.previewImage"
                  class="w-32 h-32 object-cover m-2 rounded overflow-hidden"
                />
              </div>
              <div class="btn flex justify-between">
                <button
                  @click="item.clearSubmition()"
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
    <!-- Product show -->

    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-4"
    >
      <div
        class="mx-auto px-5"
        v-for="(product, index) in data.products"
        :key="index"
      >
        <div
          class="max-w-xs min-w-56 h-80 rounded-lg bg-white p-2 pt-3 shadow duration-125 hover:shadow-md hover:bg-neutral-200"
        >
          <nuxt-link :to="`/admin/products/${product.id}`">
            <img
              class="rounded-lg h-4/6 object-center cursor-pointer mx-auto"
              :src="apiBase + product.image"
              alt="product"
            />
          </nuxt-link>
          <div class="middle flex justify-between">
            <p class="my-4 pl-4 font-bold text-gray-500">
              {{ product.name }}
            </p>
          </div>

          <div class="bottom flex justify-between items-center">
            <button
              @click="item.editSelection(product)"
              class="add-cart py-1 px-2 text-sm font-semibold bg-stone-500 hover:bg-stone-600 text-white border border-black rounded"
            >
              Edit
            </button>
            <button
              @click="item.deleteProduct(index, product)"
              class="add-cart py-1 px-2 text-sm font-semibold bg-red-500 hover:bg-red-600 text-white border border-black rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
