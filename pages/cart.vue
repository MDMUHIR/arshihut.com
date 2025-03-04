<script setup>
  const cart = useCartStore();
  import { data } from "~/composables/states";

  onBeforeMount(() => {
    cart.fetchCartData();
  });
</script>

<template>
  <div class="main pb-8 min-h-screen">
    <div class="page-hero flex justify-center items-center pb-6">
      <h1
        class="text-lg md:text-2xl text-center font-bold px-6 py-2 bg-orange-400 rounded-b-3xl shadow-lg text-white transform hover:scale-105 transition-transform duration-300"
      >
        My Shopping Cart
      </h1>
    </div>
    <!-- Loading state -->
    <div
      v-if="cart.loadingCart"
      class="loader fixed inset-0 w-full flex justify-center items-center bg-white bg-opacity-50"
    >
      <reusableItemLoader />
    </div>

    <!-- product showcase -->
    <div
      v-else-if="data.cart.length > 0"
      class="mx-auto max-w-5xl justify-center px-4 md:px-6 md:flex md:space-x-6 xl:px-0 mt-4"
    >
      <!-- v-if="data.cart.length > 0" -->
      <div class="rounded-lg md:w-2/3">
        <template v-for="(item, index) in data.cart" :key="index">
          <div
            class="justify-between mb-4 rounded-lg bg-white p-4 shadow-md hover:shadow-lg transition-shadow duration-300 sm:flex sm:justify-start"
          >
            <img
              :src="apiBase + item.product.image"
              alt="product-image"
              class="w-full rounded-lg sm:w-40 object-cover hover:opacity-90 transition-opacity duration-300"
            />

            <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
              <div class="mt-4 sm:mt-0">
                <h2
                  class="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors duration-300"
                >
                  {{ item.product.name }}
                </h2>
                <p class="mt-1 text-sm text-gray-500">
                  Category: {{ item.product.category?.name || "General" }}
                </p>
              </div>
              <div
                class="mt-4 flex flex-col justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-4"
              >
                <div
                  class="flex items-center border border-gray-200 rounded-lg bg-gray-50 p-1"
                >
                  <button
                    @click="cart.updateCart('minus', item, index)"
                    class="cursor-pointer rounded-l bg-white py-1 px-3 duration-200 hover:bg-blue-500 hover:text-white shadow-sm"
                  >
                    -
                  </button>
                  <input
                    class="h-8 w-12 border-x bg-white text-center text-sm outline-none"
                    type="number"
                    min="1"
                    v-model="item.quantity"
                  />
                  <button
                    @click="cart.updateCart('plus', item, index)"
                    class="cursor-pointer rounded-r bg-white py-1 px-3 duration-200 hover:bg-blue-500 hover:text-white shadow-sm"
                  >
                    +
                  </button>
                </div>
                <div class="flex items-center justify-between mt-3 sm:mt-0">
                  <p class="text-lg font-semibold text-blue-600">
                    ৳{{ item.product.price }}
                  </p>
                  <button
                    @click="cart.deleteItem(item, index)"
                    class="ml-3 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-5 w-5 cursor-pointer text-red-500 hover:text-red-600 transition-colors duration-200"
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

      <!-- Sub total -->
      <div
        class="mt-4 h-full rounded-lg border bg-white p-4 shadow-lg md:mt-0 md:w-1/3 sticky top-24 transition-all duration-300 hover:shadow-xl"
      >
        <div class="mb-4">
          <h2 class="text-xl font-bold mb-3 text-gray-800">Cart Summary</h2>

          <div class="border-t pt-3 mt-3">
            <div class="flex justify-between">
              <p class="text-lg font-bold text-gray-800">Total</p>
              <div class="text-right">
                <p class="mb-1 text-lg font-bold text-blue-600">
                  ৳{{ cart.totalPrice }}
                </p>
                <p class="text-xs text-gray-500">Including VAT</p>
              </div>
            </div>
          </div>
        </div>
        <nuxt-link to="/checkout">
          <button
            class="w-full rounded-lg bg-blue-500 py-2 font-semibold text-white shadow-md hover:bg-blue-600 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Proceed to Checkout
          </button>
        </nuxt-link>
      </div>
    </div>

    <!-- Empty cart state  -->
    <div
      v-else
      class="rounded-xl flex flex-col justify-center items-center bg-gray-100 shadow-sm p-6 mt-4 w-full"
    >
      <div class="text-center space-y-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-20 w-20 mx-auto text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <p class="text-lg font-light text-gray-600">Your cart is empty</p>
        <p class="text-sm text-gray-500">Start adding some amazing products!</p>
        <nuxt-link to="/products">
          <button
            class="mt-3 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Browse Products
          </button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
