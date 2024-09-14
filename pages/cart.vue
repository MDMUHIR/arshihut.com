<script setup>
const cart = useCartStore();

onBeforeMount(() => {});
</script>

<template>
  <div class="h-full min-h-screen  pb-2">
    <div class=" min-h-svh">
      <div class="page-hero flex justify-center items-center">
        <h1
          class="text-xl text-center font-bold px-5 py-1 pt-5  bg-orange-400 rounded-b-3xl shadow-lg"
        >
          Cart Items
        </h1>
      </div>

      <div
        class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 mt-5"
      >
        <!-- while the cart is empty -->
        <div
          v-if="data.cart.length === 0"
          class="rounded-lg md:w-2/3 flex justify-center items-center"
        >
          <p class="text-center font-light text-2xl italic mt-36 text-red-500">
            !!! The Cart is Empty
          </p>
        </div>
        <!-- product showcase -->
        <div class="rounded-lg md:w-2/3">
          <template v-for="(item, index) in data.cart" :key="index">
            <div
              class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
            >
              <img
                :src="apiBase + item.product.image"
                alt="product-image"
                class="w-full rounded-lg sm:w-40"
              />

              <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div class="mt-5 sm:mt-0">
                  <h2 class="text-lg font-bold text-gray-900">
                    {{ item.product.name }}
                  </h2>
                  <p class="mt-1 text-xs text-gray-700"></p>
                </div>
                <div
                  class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6"
                >
                  <div class="flex items-center border-gray-100">
                    <button
                      @click="cart.updateCart('minus', item, index)"
                      class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                    >
                      <!-- @click="cart.decreaseQuantity(item.product)" -->
                      -
                    </button>
                    <input
                      class="h-8 w-8 border bg-white text-center text-xs outline-none"
                      type="number"
                      min="1"
                      v-model="item.quantity"
                    />

                    <button
                      @click="cart.updateCart('plus', item, index)"
                      class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                    >
                      <!--  @click="cart.increaseQuantity(item.product)" -->
                      +
                    </button>
                  </div>
                  <div class="flex items-center space-x-4">
                    <p class="text-sm">${{ item.product.price }}</p>
                    <button @click="cart.deleteItem(item, index)">
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

        <!-- Sub total -->
        <div
          class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 sticky top-56"
        >
         
          <div class="flex justify-between">
            <p class="text-lg font-bold">Total</p>
            <div class="block">
              <p class="mb-1 text-lg font-bold">${{ cart.totalPrice }} USD</p>
              <p class="text-xs text-gray-700 float-end">including VAT</p>
            </div>
          </div>
          <nuxt-link to="/checkout">
            <button
              class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            >
              Checkout
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
