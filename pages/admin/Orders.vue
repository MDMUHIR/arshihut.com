<script setup>
  definePageMeta({
    layout: "adminlayout",
  });

  const order = useOrderStore();
  onBeforeMount(() => {
    order.fetchAdminOrders();
  });

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      // timeZoneName: "short",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
</script>

<template>
  <div
    class="main Admin-Orders pt-5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 min-h-screen px-4"
  >
    <div
      v-if="data.orders.length === 0"
      class="flex justify-center items-center h-[60vh]"
    >
      <p
        class="text-3xl font-light italic text-red-500 bg-white/80 px-8 py-4 rounded-lg shadow-lg"
      >
        !!! There is no order...
      </p>
    </div>
    
    <div class="orders grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <template v-for="(item, index) in data.orders" :key="index">
        <nuxt-link
          :to="`orders/${item.id}`"
          class="transform hover:scale-[1.02] transition-all duration-300"
        >
          <div
            class="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-rose-400 relative"
          >
            <div class="flex flex-col space-y-4">
              <div class="flex justify-between items-start">
                <span
                  class="absolute top-2 left-2 w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-white font-semibold rounded-full border-2 border-gray-300 dark:border-gray-500"
                >
                  {{ index + 1 }}
                </span>
                <div class="flex-1 ml-10">
                  <p
                    class="text-lg font-semibold text-gray-900 dark:text-white"
                  >
                    Order ID: {{ item.id }}
                  </p>
                  <span
                    class="px-3 py-1 text-sm font-medium rounded-full mt-2 inline-block"
                    :class="getStatusClass(item.status)"
                  >
                    {{ item.status }}
                  </span>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div class="bg-gray-50 dark:bg-gray-600 p-3 rounded-lg">
                  <div class="flex items-center space-x-2">
                    <IconsUserIcon
                      class="w-5 h-5 text-gray-600 dark:text-gray-300"
                    />
                    <p class="font-semibold text-gray-800 dark:text-white">
                      {{ item.name }}
                    </p>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {{ item.phone }}
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-300">
                    {{ item.email }}
                  </p>
                </div>
                <div class="bg-gray-50 dark:bg-gray-600 p-3 rounded-lg">
                  <p
                    class="text-sm font-semibold text-gray-600 dark:text-gray-300"
                  >
                    Total Amount
                  </p>
                  <p
                    class="text-xl font-bold"
                    :class="
                      item.payment_status ? 'text-red-500' : 'text-green-500'
                    "
                  >
                    ${{ item.total }}
                  </p>
                  <span
                    class="px-3 py-1 text-sm font-medium rounded-full mt-2 inline-block"
                    :class="
                      item.payment_method === 'cod'
                        ? 'bg-orange-300 text-orange-800'
                        : 'bg-indigo-300 text-indigo-800'
                    "
                  >
                    {{ item.payment_method }}
                  </span>
                </div>
              </div>
              <div class="border-t dark:border-gray-600 pt-3 mt-2">
                <div
                  class="flex flex-col sm:flex-row justify-between text-xs text-gray-500 dark:text-gray-400"
                >
                  <p>Created: {{ formatDate(item.created_at) }}</p>
                  <p>Updated: {{ formatDate(item.updated_at) }}</p>
                </div>
              </div>
            </div>
          </div>
        </nuxt-link>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
