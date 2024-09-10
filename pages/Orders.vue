<script setup>
const order = useOrderStore();

onBeforeMount(() => {
  order.fetchOrders();
});

const toggleOrderId = ref(null);
const getStatusClass = (status) => {
  return status === "pending"
    ? "bg-blue-300"
    : status === "processing"
    ? "bg-yellow-300"
    : status === "shipped"
    ? "bg-teal-300"
    : status === "delivered"
    ? "bg-green-400"
    : status === "canceled"
    ? "bg-red-500"
    : "bg-indigo-20"; // Default case
};
</script>

<template>
  <h1 class="text-center text-2xl font-semibold pt-10">My Orders</h1>
  <div class="rounded-lg sm:m-8">
    <!-- <pre>{{ data.orders }}</pre> -->
    <template v-for="(order, index) in data.orders" :key="index">
      <div class="rounded-lg border md:w-full mb-6 bg-white p-6 shadow-md">
        <div class="top-text flex justify-between mb-4">
          <p class="font-bold p-2 rounded-2xl border-2 block">
            {{ index + 1 }}
          </p>
          <p class="font-bold bg-stone-200 py-2 px-4 rounded-2xl border block">
            Order id: {{ order.id }}
          </p>
          <p
            :class="getStatusClass(order.status)"
            class="font-bold  py-2 px-4 rounded-2xl border block"
          >
            Status: {{ order.status }}
          </p>
        </div>
        <div class="flex flex-col md:flex-row justify-around">
          <div class="order-deta">
            <p class="font-semibold">Total Price: ${{ order.total }}</p>
            <p class="font-semibold">
              Payment Method: {{ order.payment_method
              }}<span class="font-thin text-red-600">
                - ({{ order.payment_status }})</span
              >
            </p>
            <p class="font-semibold">
              Note: <span class="text-sm font-normal">{{ order.notes }}</span>
            </p>
          </div>
          <hr />
          <div class="order-deta mb-4">
            <p class="font-semibold">
              Name: <span class="font-normal">{{ order.name }} </span>
            </p>
            <p class="font-semibold">
              Email: <span class="font-normal">{{ order.email }} </span>
            </p>
            <p class="font-semibold">
              Phone: <span class="font-normal">{{ order.phone }} </span>
            </p>
            <p class="font-semibold">
              Address:
              <span class="font-normal"
                >{{ order.line1 }}, {{ order.city }}, {{ order.country }}
              </span>
            </p>
          </div>
        </div>

        
          <button
            v-show="toggleOrderId !== order.id"
            @click="toggleOrderId = order.id"
            class="px-4  rounded-2xl text-white bg-purple-900 border mx-auto"
          >
            Preview Products
          </button>
       
        <template v-for="(product, index) in order.products" :key="index">
          <div
            v-if="toggleOrderId == order.id"
            class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
          >
            <nuxt-link :to="`/product/${product.id}`">
              <img
                :src="apiBase + product.image"
                alt="product-image"
                class="w-full rounded-lg sm:w-24"
              />
            </nuxt-link>
            <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
              <div class="mt-5 sm:mt-0">
                <nuxt-link :to="`/product/${product.id}`">
                  <h2 class="text-lg font-bold text-gray-900">
                    {{ product.name }}
                  </h2>
                </nuxt-link>
                <p class="mt-1 text-xs text-gray-700 h-16 overflow-y-hidden">
                  {{ product.description }}
                </p>
              </div>
              <div
                class="mt-4 flex flex-col justify-between sm:space-y-6 sm:mt-0"
              >
                <div class="flex orders-center space-x-4 text-center">
                  <p class="text-sm font-bold">${{ product.price }}</p>
                </div>
                <div
                  class="flex orders-center text-center bg-orange-200 rounded border border-red-900"
                >
                  <p class="text-xs w-16">
                    Quantity: {{ product.pivot.quantity }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
