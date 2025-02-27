<script setup>
  const orderStore = useOrderStore();

  onBeforeMount(() => {
    orderStore.fetchOrders();
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
  <div class="main pb-8 sm:pb-12 min-h-screen">
    <div class="page-hero flex justify-center items-center pb-4 sm:pb-8">
      <h1
        class="text-lg md:text-2xl text-center font-bold px-4 sm:px-8 py-2 bg-orange-400 rounded-b-3xl shadow-lg text-white transform hover:scale-105 transition-transform duration-300"
      >
        My Orders
      </h1>
    </div>

    <!-- Loading state -->
    <div
      v-if="orderStore.loadingOrders"
      class="loader fixed inset-0 w-full flex justify-center items-center bg-white bg-opacity-50"
    >
      <reusableItemLoader />
    </div>

    <!-- Orders list container -->
    <div
      v-else-if="data.orders.length > 0"
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6"
    >
      <template v-for="(order, index) in data.orders" :key="index">
        <div
          class="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
          <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div
              class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
            >
              <div class="flex items-center gap-3">
                <span
                  class="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-base sm:text-lg font-bold bg-gray-100 rounded-full border-2 border-gray-200"
                >
                  {{ index + 1 }}
                </span>
                <p class="text-gray-600 font-medium text-sm sm:text-base">
                  Order ID:
                  <span class="text-gray-900">{{ order.id }}</span>
                </p>
              </div>
              <span
                :class="[
                  getStatusClass(order.status),
                  'px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm font-semibold transition-colors duration-200',
                ]"
              >
                {{ order.status }}
              </span>
            </div>
            <div class="grid md:grid-cols-2 gap-3 sm:gap-6 mb-3 sm:mb-6">
              <div class="space-y-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <p class="font-medium text-gray-900">
                  Total Price:
                  <span class="text-orange-600 font-bold"
                    >${{ order.total }}</span
                  >
                </p>
                <p class="font-medium text-gray-900">
                  Payment Method:
                  <span class="text-gray-600">{{ order.payment_method }}</span>
                  <span
                    class="text-sm font-medium ml-2 px-2 py-1 rounded"
                    :class="
                      orderStore.payment_status === 'pending'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                    "
                  >
                    {{ order.payment_status }}
                  </span>
                </p>
                <p class="font-medium text-gray-900">
                  Note:
                  <span class="text-gray-600 text-sm">{{
                    order.notes || "No notes"
                  }}</span>
                </p>
              </div>
              <div class="space-y-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <p class="font-medium text-gray-900">
                  Name: <span class="text-gray-600">{{ order.name }}</span>
                </p>
                <p class="font-medium text-gray-900">
                  Email:
                  <span class="text-gray-600">{{ order.email }}</span>
                </p>
                <p class="font-medium text-gray-900">
                  Phone:
                  <span class="text-gray-600">{{ order.phone }}</span>
                </p>
                <p class="font-medium text-gray-900">
                  Address:
                  <span class="text-gray-600"
                    >{{ order.line1 }}, {{ order.city }},
                    {{ order.country }}</span
                  >
                </p>
              </div>
            </div>

            <div class="flex justify-center mt-3 sm:mt-0">
              <button
                v-show="toggleOrderId !== order.id"
                @click="toggleOrderId = order.id"
                class="px-6 py-2 text-sm font-medium text-white bg-purple-600 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
              >
                View Order Details
              </button>
            </div>

            <div
              v-if="toggleOrderId === order.id"
              class="mt-4 sm:mt-6 space-y-3 sm:space-y-4"
            >
              <template v-for="(product, index) in order.products" :key="index">
                <div
                  class="flex flex-col sm:flex-row gap-3 sm:gap-6 p-3 sm:p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:shadow-md"
                >
                  <nuxt-link
                    :to="`/product/${product.id}`"
                    class="sm:w-32 flex-shrink-0"
                  >
                    <img
                      :src="apiBase + product.image"
                      alt="product-image"
                      class="w-full h-32 object-cover rounded-lg"
                    />
                  </nuxt-link>
                  <div class="flex-grow">
                    <nuxt-link :to="`/product/${product.id}`">
                      <h2
                        class="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors duration-200"
                      >
                        {{ product.name }}
                      </h2>
                    </nuxt-link>
                    <p class="mt-2 text-sm text-gray-600 line-clamp-2">
                      {{ product.description }}
                    </p>
                    <div class="mt-4 flex items-center justify-between">
                      <p class="text-lg font-bold text-gray-900">
                        ${{ product.price }}
                      </p>
                      <div
                        class="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                      >
                        Quantity: {{ product.pivot.quantity }}
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Empty orders state -->
    <div
      v-else
      class="rounded-xl flex flex-col justify-center items-center bg-gray-100 shadow-sm mx-4 sm:mx-8 p-4 sm:p-8 mt-4 sm:mt-8"
    >
      <div class="text-center space-y-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-24 w-24 mx-auto text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
        <h3 class="text-xl font-semibold text-gray-700">No Orders Yet</h3>
        <p class="text-gray-500">Start shopping to see your orders here!</p>
        <nuxt-link
          to="/products"
          class="inline-block px-6 py-2 text-sm font-medium text-white bg-orange-400 rounded-full hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 transition-colors duration-200"
        >
          Browse Products
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
